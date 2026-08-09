import 'dart:convert';
import 'dart:math';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'l10n.dart';

/// What we remember about one question.
class QStat {
  int seen;
  int right;
  int wrongStreak;
  int lastSeenDay;

  QStat({this.seen = 0, this.right = 0, this.wrongStreak = 0, this.lastSeenDay = 0});

  bool get isWeak => wrongStreak > 0 || (seen >= 2 && right / seen < 0.6);
  double get accuracy => seen == 0 ? 0 : right / seen;

  Map<String, dynamic> toJson() =>
      {'s': seen, 'r': right, 'w': wrongStreak, 'd': lastSeenDay};

  static QStat fromJson(Map<String, dynamic> j) => QStat(
        seen: j['s'] ?? 0,
        right: j['r'] ?? 0,
        wrongStreak: j['w'] ?? 0,
        lastSeenDay: j['d'] ?? 0,
      );
}

/// Spaced-repetition state for one flashcard (SM-2, trimmed down).
class CardStat {
  double ease;
  int intervalDays;
  int dueDay;
  int reps;
  int lapses;

  CardStat({
    this.ease = 2.5,
    this.intervalDays = 0,
    this.dueDay = 0,
    this.reps = 0,
    this.lapses = 0,
  });

  bool get isLearned => reps >= 2 && intervalDays >= 4;

  Map<String, dynamic> toJson() =>
      {'e': ease, 'i': intervalDays, 'd': dueDay, 'r': reps, 'l': lapses};

  static CardStat fromJson(Map<String, dynamic> j) => CardStat(
        ease: (j['e'] ?? 2.5).toDouble(),
        intervalDays: j['i'] ?? 0,
        dueDay: j['d'] ?? 0,
        reps: j['r'] ?? 0,
        lapses: j['l'] ?? 0,
      );
}

class ExamResult {
  final int dayNumber;
  final int score;
  final int total;
  final int seconds;

  const ExamResult(this.dayNumber, this.score, this.total, this.seconds);

  bool get passed => score >= 52 || (total != 65 && score / total >= 0.8);

  Map<String, dynamic> toJson() =>
      {'d': dayNumber, 's': score, 't': total, 'e': seconds};

  static ExamResult fromJson(Map<String, dynamic> j) =>
      ExamResult(j['d'] ?? 0, j['s'] ?? 0, j['t'] ?? 65, j['e'] ?? 0);
}

/// Day numbers are "days since epoch" so date maths never trips over time zones.
int dayNumber([DateTime? t]) {
  final d = t ?? DateTime.now();
  return DateTime(d.year, d.month, d.day).millisecondsSinceEpoch ~/ 86400000;
}

DateTime dateOfDay(int day) =>
    DateTime.fromMillisecondsSinceEpoch(day * 86400000).toLocal();

class AppState extends ChangeNotifier {
  AppState._(this._prefs) {
    _load();
  }

  final SharedPreferences _prefs;

  static Future<AppState> load() async =>
      AppState._(await SharedPreferences.getInstance());

  // ── Settings ─────────────────────────────────────────────────────────────
  Lang lang = Lang.en;
  bool showBoth = true;
  bool darkMode = false;
  int dailyGoal = 25;
  int? examDay;

  // ── Progress ─────────────────────────────────────────────────────────────
  final Map<String, QStat> questions = {};
  final Map<String, CardStat> cards = {};
  final Set<String> readSections = {};
  final Set<String> badges = {};
  final List<ExamResult> exams = [];

  /// day number → questions answered that day.
  final Map<int, int> answeredPerDay = {};
  int streak = 0;
  int lastStudyDay = 0;
  int totalAnswered = 0;
  int totalRight = 0;

  // ── Persistence ──────────────────────────────────────────────────────────

  void _load() {
    lang = LangX.fromCode(_prefs.getString('lang'));
    showBoth = _prefs.getBool('showBoth') ?? true;
    darkMode = _prefs.getBool('darkMode') ?? false;
    dailyGoal = _prefs.getInt('dailyGoal') ?? 25;
    examDay = _prefs.getInt('examDay');
    streak = _prefs.getInt('streak') ?? 0;
    lastStudyDay = _prefs.getInt('lastStudyDay') ?? 0;
    totalAnswered = _prefs.getInt('totalAnswered') ?? 0;
    totalRight = _prefs.getInt('totalRight') ?? 0;
    readSections.addAll(_prefs.getStringList('readSections') ?? const []);
    badges.addAll(_prefs.getStringList('badges') ?? const []);

    final q = _prefs.getString('questions');
    if (q != null) {
      (jsonDecode(q) as Map<String, dynamic>).forEach(
          (k, v) => questions[k] = QStat.fromJson(v as Map<String, dynamic>));
    }
    final c = _prefs.getString('cards');
    if (c != null) {
      (jsonDecode(c) as Map<String, dynamic>).forEach(
          (k, v) => cards[k] = CardStat.fromJson(v as Map<String, dynamic>));
    }
    final d = _prefs.getString('perDay');
    if (d != null) {
      (jsonDecode(d) as Map<String, dynamic>)
          .forEach((k, v) => answeredPerDay[int.parse(k)] = v as int);
    }
    final e = _prefs.getString('exams');
    if (e != null) {
      for (final r in jsonDecode(e) as List) {
        exams.add(ExamResult.fromJson(r as Map<String, dynamic>));
      }
    }
  }

  Future<void> _saveSettings() async {
    await _prefs.setString('lang', lang.code);
    await _prefs.setBool('showBoth', showBoth);
    await _prefs.setBool('darkMode', darkMode);
    await _prefs.setInt('dailyGoal', dailyGoal);
    if (examDay != null) await _prefs.setInt('examDay', examDay!);
  }

  Future<void> _saveProgress() async {
    await _prefs.setString('questions',
        jsonEncode(questions.map((k, v) => MapEntry(k, v.toJson()))));
    await _prefs.setString(
        'cards', jsonEncode(cards.map((k, v) => MapEntry(k, v.toJson()))));
    await _prefs.setString('perDay',
        jsonEncode(answeredPerDay.map((k, v) => MapEntry(k.toString(), v))));
    await _prefs.setString(
        'exams', jsonEncode(exams.map((e) => e.toJson()).toList()));
    await _prefs.setStringList('readSections', readSections.toList());
    await _prefs.setStringList('badges', badges.toList());
    await _prefs.setInt('streak', streak);
    await _prefs.setInt('lastStudyDay', lastStudyDay);
    await _prefs.setInt('totalAnswered', totalAnswered);
    await _prefs.setInt('totalRight', totalRight);
  }

  // ── Setting mutators ─────────────────────────────────────────────────────

  void setLang(Lang l) {
    lang = l;
    _saveSettings();
    notifyListeners();
  }

  void setShowBoth(bool v) {
    showBoth = v;
    _saveSettings();
    notifyListeners();
  }

  void setDark(bool v) {
    darkMode = v;
    _saveSettings();
    notifyListeners();
  }

  void setDailyGoal(int v) {
    dailyGoal = v.clamp(5, 200);
    _saveSettings();
    notifyListeners();
  }

  void setExamDate(DateTime d) {
    examDay = dayNumber(d);
    _saveSettings();
    notifyListeners();
  }

  // ── Derived ──────────────────────────────────────────────────────────────

  int get today => dayNumber();
  int? get daysLeft => examDay == null ? null : examDay! - today;
  int get answeredToday => answeredPerDay[today] ?? 0;
  double get goalProgress => (answeredToday / dailyGoal).clamp(0.0, 1.0);
  double get overallAccuracy => totalAnswered == 0 ? 0 : totalRight / totalAnswered;

  bool hasRead(String sectionId) => readSections.contains(sectionId);

  List<int> get last7 =>
      List.generate(7, (i) => answeredPerDay[today - 6 + i] ?? 0);

  /// Questions the learner keeps getting wrong, worst first.
  List<String> weakQuestionIds() {
    final weak = questions.entries.where((e) => e.value.isWeak).toList()
      ..sort((a, b) {
        final c = b.value.wrongStreak.compareTo(a.value.wrongStreak);
        return c != 0 ? c : a.value.accuracy.compareTo(b.value.accuracy);
      });
    return weak.map((e) => e.key).toList();
  }

  int dueCardCount(Iterable<String> allCardIds) {
    var n = 0;
    for (final id in allCardIds) {
      final s = cards[id];
      if (s == null || s.dueDay <= today) n++;
    }
    return n;
  }

  /// 0–100. Deliberately conservative: it should only look good when the
  /// learner has actually covered the material *and* proved it twice.
  int readiness({
    required int totalSections,
    required int totalQuestions,
    required Iterable<String> allCardIds,
  }) {
    final coverage = totalSections == 0 ? 0.0 : readSections.length / totalSections;
    final practised = totalQuestions == 0
        ? 0.0
        : (questions.length / totalQuestions).clamp(0.0, 1.0);
    final acc = totalAnswered < 20 ? 0.0 : overallAccuracy;
    var learned = 0;
    for (final id in allCardIds) {
      if (cards[id]?.isLearned == true) learned++;
    }
    final cardShare =
        allCardIds.isEmpty ? 0.0 : (learned / allCardIds.length).clamp(0.0, 1.0);
    final examBest = exams.isEmpty
        ? 0.0
        : exams.map((e) => e.score / e.total).reduce(max).clamp(0.0, 1.0);

    final score = coverage * 0.25 +
        practised * 0.20 +
        acc * 0.25 +
        cardShare * 0.15 +
        examBest * 0.15;
    return (score * 100).round().clamp(0, 100);
  }

  // ── Recording work ───────────────────────────────────────────────────────

  void markRead(String sectionId) {
    if (readSections.add(sectionId)) {
      _touchDay();
      _saveProgress();
      notifyListeners();
    }
  }

  void recordAnswer(String questionId, bool right) {
    final s = questions.putIfAbsent(questionId, QStat.new);
    s.seen++;
    s.lastSeenDay = today;
    if (right) {
      s.right++;
      s.wrongStreak = 0;
      totalRight++;
    } else {
      s.wrongStreak++;
    }
    totalAnswered++;
    answeredPerDay[today] = answeredToday + 1;
    _touchDay();
    _saveProgress();
    notifyListeners();
  }

  /// grade: 0 again · 1 hard · 2 good · 3 easy
  void gradeCard(String cardId, int grade) {
    final s = cards.putIfAbsent(cardId, CardStat.new);
    if (grade == 0) {
      s.lapses++;
      s.reps = 0;
      s.intervalDays = 0;
      s.ease = max(1.3, s.ease - 0.20);
      s.dueDay = today;
    } else {
      s.ease = (s.ease + switch (grade) { 1 => -0.15, 3 => 0.15, _ => 0.0 })
          .clamp(1.3, 3.0);
      s.intervalDays = switch (s.reps) {
        0 => grade == 3 ? 3 : 1,
        1 => grade == 3 ? 6 : 3,
        _ => max(1, (s.intervalDays * s.ease * (grade == 1 ? 0.6 : 1)).round()),
      };
      s.reps++;
      s.dueDay = today + s.intervalDays;
    }
    _touchDay();
    _saveProgress();
    notifyListeners();
  }

  void recordExam(int score, int total, int seconds) {
    exams.add(ExamResult(today, score, total, seconds));
    _touchDay();
    _saveProgress();
    notifyListeners();
  }

  void awardBadge(String id) {
    if (badges.add(id)) {
      _saveProgress();
      notifyListeners();
    }
  }

  void _touchDay() {
    if (lastStudyDay == today) return;
    streak = lastStudyDay == today - 1 ? streak + 1 : 1;
    lastStudyDay = today;
  }

  Future<void> resetAll() async {
    questions.clear();
    cards.clear();
    readSections.clear();
    badges.clear();
    exams.clear();
    answeredPerDay.clear();
    streak = 0;
    lastStudyDay = 0;
    totalAnswered = 0;
    totalRight = 0;
    await _saveProgress();
    notifyListeners();
  }
}

/// Lets any widget reach the state with `AppScope.of(context)`.
class AppScope extends InheritedNotifier<AppState> {
  const AppScope({super.key, required AppState state, required super.child})
      : super(notifier: state);

  static AppState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;

  /// Read without subscribing — for callbacks.
  static AppState read(BuildContext context) =>
      context.getInheritedWidgetOfExactType<AppScope>()!.notifier!;
}
