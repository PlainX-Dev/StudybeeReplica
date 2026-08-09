import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'widgets/common.dart';

enum QuizMode { classic, signs, speed, numbers, trueFalse, weak, chapter, exam }

extension QuizModeX on QuizMode {
  bool get isExam => this == QuizMode.exam;
  bool get perQuestionTimer => this == QuizMode.speed;
}

/// Builds the question list for a mode and opens the quiz.
Future<void> openQuiz(
  BuildContext context,
  QuizMode mode, {
  String? chapterId,
  String? sectionId,
  List<Question>? preset,
  T? title,
  Color color = Acc.honey,
}) async {
  final app = AppScope.read(context);
  final rnd = Random();
  List<Question> qs;

  if (preset != null) {
    qs = preset;
  } else {
    switch (mode) {
      case QuizMode.exam:
        qs = Curriculum.examSet();
      case QuizMode.signs:
        qs = Curriculum.byType(QType.sign)..shuffle(rnd);
        qs = qs.take(20).toList();
      case QuizMode.numbers:
        qs = Curriculum.byType(QType.number)..shuffle(rnd);
        qs = qs.take(20).toList();
      case QuizMode.trueFalse:
        qs = Curriculum.byType(QType.trueFalse)..shuffle(rnd);
        qs = qs.take(20).toList();
      case QuizMode.weak:
        final ids = app.weakQuestionIds();
        qs = [
          for (final id in ids)
            if (Curriculum.question(id) != null) Curriculum.question(id)!,
        ].take(20).toList();
      case QuizMode.chapter:
        qs = (sectionId != null
            ? Curriculum.questionsForSection(sectionId)
            : Curriculum.questionsForChapter(chapterId ?? ''))
          ..shuffle(rnd);
        qs = qs.take(20).toList();
      case QuizMode.speed:
      case QuizMode.classic:
        // Favour questions that are new or previously missed.
        final all = [...Curriculum.questions]..shuffle(rnd);
        all.sort((a, b) {
          final sa = app.questions[a.id];
          final sb = app.questions[b.id];
          return _priority(sb).compareTo(_priority(sa));
        });
        qs = all.take(mode == QuizMode.speed ? 15 : 20).toList();
    }
  }

  if (qs.isEmpty) {
    if (!context.mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(S.noQuestions(app.lang))),
    );
    return;
  }

  if (!context.mounted) return;
  // Root navigator: a quiz owns the whole screen, including the space the
  // bottom nav bar would otherwise occupy — the Check button lives there.
  await Navigator.of(context, rootNavigator: true).push(MaterialPageRoute(
    builder: (_) => QuizScreen(
      questions: qs,
      mode: mode,
      title: title ?? _defaultTitle(mode),
      color: color,
    ),
  ));
}

int _priority(QStat? s) {
  if (s == null) return 3; // never seen
  if (s.wrongStreak > 0) return 5;
  if (s.accuracy < 0.6) return 4;
  if (s.seen < 2) return 2;
  return 1;
}

T _defaultTitle(QuizMode mode) => switch (mode) {
      QuizMode.exam => S.modeExam,
      QuizMode.signs => S.modeSigns,
      QuizMode.speed => S.modeSpeed,
      QuizMode.numbers => S.modeNumbers,
      QuizMode.trueFalse => S.modeTrueFalse,
      QuizMode.weak => S.modeWeak,
      QuizMode.chapter => S.testChapter,
      QuizMode.classic => S.modeClassic,
    };

class QuizScreen extends StatefulWidget {
  final List<Question> questions;
  final QuizMode mode;
  final T title;
  final Color color;

  const QuizScreen({
    super.key,
    required this.questions,
    required this.mode,
    required this.title,
    required this.color,
  });

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  int _i = 0;
  final _picked = <int>{};
  bool _checked = false;
  final _wrong = <Question>[];
  int _right = 0;
  late final List<List<int>> _order;
  Timer? _timer;
  int _secondsLeft = 0;
  int _elapsed = 0;

  Question get _q => widget.questions[_i];
  List<int> get _map => _order[_i];

  @override
  void initState() {
    super.initState();
    final rnd = Random();
    _order = [
      for (final q in widget.questions)
        q.type == QType.trueFalse
            ? List<int>.generate(q.options.length, (i) => i)
            : (List<int>.generate(q.options.length, (i) => i)..shuffle(rnd)),
    ];
    if (widget.mode.isExam) {
      _secondsLeft = 50 * 60;
      _startTicker(onZero: _finish);
    } else if (widget.mode.perQuestionTimer) {
      _secondsLeft = 15;
      _startTicker(onZero: () {
        if (!_checked) _check(timedOut: true);
      });
    } else {
      _startTicker();
    }
  }

  void _startTicker({VoidCallback? onZero}) {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _elapsed++;
        if (onZero != null && _secondsLeft > 0) {
          _secondsLeft--;
          if (_secondsLeft == 0) onZero();
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _check({bool timedOut = false}) {
    final picked = _picked.map((v) => _map[v]).toSet();
    final ok = !timedOut && _q.isCorrect(picked);
    AppScope.read(context).recordAnswer(_q.id, ok);
    setState(() {
      _checked = true;
      if (ok) {
        _right++;
      } else {
        _wrong.add(_q);
      }
    });
  }

  void _next() {
    if (_i + 1 >= widget.questions.length) {
      _finish();
      return;
    }
    setState(() {
      _i++;
      _picked.clear();
      _checked = false;
      if (widget.mode.perQuestionTimer) _secondsLeft = 15;
    });
  }

  void _finish() {
    _timer?.cancel();
    final app = AppScope.read(context);
    if (widget.mode.isExam) {
      app.recordExam(_right, widget.questions.length, _elapsed);
    }
    _awardBadges(app);
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (_) => ResultsScreen(
        right: _right,
        total: widget.questions.length,
        seconds: _elapsed,
        wrong: _wrong,
        mode: widget.mode,
        color: widget.color,
      ),
    ));
  }

  void _awardBadges(AppState app) {
    if (app.totalAnswered >= 100) app.awardBadge('q100');
    if (app.totalAnswered >= 500) app.awardBadge('q500');
    if (app.streak >= 7) app.awardBadge('streak7');
    if (widget.mode.isExam && _right >= 52) app.awardBadge('examPass');
    if (_right == widget.questions.length && widget.questions.length >= 10) {
      app.awardBadge('perfect');
    }
  }

  Future<bool> _confirmQuit() async {
    final app = AppScope.read(context);
    final p = paletteOf(context);
    final res = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(S.quitQuiz(app.lang), style: display(20, wght: 600, color: p.ink)),
        content: Text(S.quitQuizBody(app.lang), style: body(15, color: p.inkSoft)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(S.stay(app.lang), style: body(15, wght: 700, color: p.inkSoft)),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(S.quit(app.lang), style: body(15, wght: 800, color: Acc.danger)),
          ),
        ],
      ),
    );
    return res ?? false;
  }

  Future<void> _maybeQuit() async {
    final leave = await _confirmQuit();
    if (!mounted || !leave) return;
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final multi = _q.type == QType.multi;

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (didPop) return;
        _maybeQuit();
      },
      child: Scaffold(
        backgroundColor: p.bg,
        body: SafeArea(
          child: Column(
            children: [
              _header(p, app),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                  child: Appear(
                    index: _i,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        if (_q.signId != null) ...[
                          Center(
                            child: Container(
                              padding: const EdgeInsets.all(18),
                              decoration: cardDeco(p),
                              child: SignView(Curriculum.sign(_q.signId!)!, size: 132),
                            ),
                          ),
                          const SizedBox(height: 18),
                        ],
                        Bi(_q.prompt, style: display(21, wght: 600, color: p.ink, height: 1.25)),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Pill(
                              (multi ? S.selectAll : S.selectOne)(app.lang),
                              color: multi ? Acc.grape : widget.color,
                              icon: multi ? Icons.done_all_rounded : Icons.radio_button_checked,
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        for (var v = 0; v < _q.options.length; v++)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: _option(v, p, app),
                          ),
                        if (_checked) ...[
                          const SizedBox(height: 8),
                          _explanation(p, app),
                        ],
                        const SizedBox(height: 90),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        bottomSheet: _bottomBar(p, app),
      ),
    );
  }

  Widget _header(Palette p, AppState app) {
    final progress = (_i + (_checked ? 1 : 0)) / widget.questions.length;
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 8, 16, 6),
      child: Column(
        children: [
          Row(
            children: [
              IconButton(
                icon: Icon(Icons.close_rounded, color: p.inkSoft),
                onPressed: _maybeQuit,
              ),
              Expanded(
                child: Text(
                  widget.title(app.lang),
                  style: display(17, wght: 600, color: p.ink),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (widget.mode.isExam)
                Pill(_clock(_secondsLeft),
                    color: _secondsLeft < 300 ? Acc.danger : Acc.sky,
                    icon: Icons.timer_rounded,
                    fontSize: 13)
              else if (widget.mode.perQuestionTimer)
                Pill('$_secondsLeft s',
                    color: _secondsLeft <= 5 ? Acc.danger : Acc.coral,
                    icon: Icons.bolt_rounded,
                    fontSize: 13)
              else
                Text('${_i + 1} / ${widget.questions.length}',
                    style: body(14, wght: 800, color: p.inkSoft)),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(99),
            child: TweenAnimationBuilder<double>(
              tween: Tween(begin: 0, end: progress),
              duration: const Duration(milliseconds: 400),
              builder: (_, v, __) => LinearProgressIndicator(
                value: v,
                minHeight: 8,
                backgroundColor: p.border,
                valueColor: AlwaysStoppedAnimation(widget.color),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _option(int v, Palette p, AppState app) {
    final real = _map[v];
    final selected = _picked.contains(v);
    final isAnswer = _q.answer.contains(real);
    Color border = p.border;
    Color? fill;
    IconData? mark;
    Color markColor = widget.color;

    if (_checked) {
      if (isAnswer) {
        border = Acc.success;
        fill = tint(Acc.success, p.dark);
        mark = Icons.check_circle_rounded;
        markColor = Acc.success;
      } else if (selected) {
        border = Acc.danger;
        fill = tint(Acc.danger, p.dark);
        mark = Icons.cancel_rounded;
        markColor = Acc.danger;
      }
    } else if (selected) {
      border = widget.color;
      fill = tint(widget.color, p.dark);
    }

    return TapCard(
      radius: rMd,
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      color: fill,
      borderColor: border,
      onTap: _checked
          ? null
          : () => setState(() {
                if (_q.type == QType.multi) {
                  selected ? _picked.remove(v) : _picked.add(v);
                } else {
                  _picked
                    ..clear()
                    ..add(v);
                }
              }),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 30,
            height: 30,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: selected || (_checked && isAnswer)
                  ? (mark != null ? markColor : widget.color)
                  : p.surfaceAlt,
              borderRadius: BorderRadius.circular(10),
            ),
            child: mark != null
                ? Icon(mark, size: 19, color: Colors.white)
                : Text(
                    String.fromCharCode(65 + v),
                    style: body(14,
                        wght: 800,
                        color: selected ? onAccent(widget.color) : p.inkSoft),
                  ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Bi(_q.options[real],
                style: body(15.5, wght: 600, color: p.ink, height: 1.35)),
          ),
        ],
      ),
    );
  }

  Widget _explanation(Palette p, AppState app) {
    final wasRight = !_wrong.contains(_q);
    final accent = wasRight ? Acc.success : Acc.coral;
    final cheer = wasRight
        ? S.cheers[_i % S.cheers.length]
        : S.nudges[_i % S.nudges.length];
    final section = Curriculum.section(_q.sectionId);
    final chapter = Curriculum.chapterOfSection(_q.sectionId);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: cardDeco(p, color: tint(accent, p.dark), borderColor: accent),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(wasRight ? Icons.celebration_rounded : Icons.lightbulb_rounded,
                  color: accent, size: 22),
              const SizedBox(width: 8),
              Text(
                (wasRight ? S.correct : S.wrong)(app.lang),
                style: display(18, wght: 600, color: p.ink),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(cheer(app.lang),
                    style: body(13, wght: 700, color: p.inkSoft),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Bi(_q.why, style: body(15, wght: 600, color: p.ink, height: 1.45)),
          if (chapter != null && section != null) ...[
            const SizedBox(height: 14),
            InkWell(
              borderRadius: rSm,
              onTap: () => Navigator.of(context).push(MaterialPageRoute(
                builder: (_) => ChapterReader(chapter: chapter, focusSection: section.id),
              )),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
                child: Row(
                  children: [
                    Icon(Icons.menu_book_rounded, size: 18, color: accent),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${S.jumpBack(app.lang)} · ${chapter.number}. ${section.title(app.lang)}',
                        style: body(13.5, wght: 800, color: accent),
                        maxLines: 2,
                      ),
                    ),
                    Icon(Icons.arrow_forward_rounded, size: 17, color: accent),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _bottomBar(Palette p, AppState app) {
    final canCheck = _picked.isNotEmpty;
    return Container(
      color: p.bg,
      padding: EdgeInsets.fromLTRB(
          16, 10, 16, 12 + MediaQuery.of(context).padding.bottom * 0.5),
      child: Row(
        children: [
          if (!_checked && widget.mode.isExam) ...[
            OutlinedButton(
              onPressed: _next,
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(0, 58),
                side: BorderSide(color: p.border, width: 1.5),
                shape: const RoundedRectangleBorder(borderRadius: rMd),
              ),
              child: Text(S.skip(app.lang), style: body(15, wght: 700, color: p.inkSoft)),
            ),
            const SizedBox(width: 10),
          ],
          Expanded(
            child: BigButton(
              _checked
                  ? (_i + 1 >= widget.questions.length
                      ? S.finish(app.lang)
                      : S.next(app.lang))
                  : S.check(app.lang),
              color: widget.color,
              icon: _checked ? Icons.arrow_forward_rounded : Icons.check_rounded,
              onTap: _checked ? _next : (canCheck ? _check : null),
            ),
          ),
        ],
      ),
    );
  }
}

String _clock(int seconds) {
  final m = (seconds ~/ 60).toString().padLeft(2, '0');
  final s = (seconds % 60).toString().padLeft(2, '0');
  return '$m:$s';
}

class ResultsScreen extends StatelessWidget {
  final int right;
  final int total;
  final int seconds;
  final List<Question> wrong;
  final QuizMode mode;
  final Color color;

  const ResultsScreen({
    super.key,
    required this.right,
    required this.total,
    required this.seconds,
    required this.wrong,
    required this.mode,
    required this.color,
  });

  bool get passed => mode.isExam ? right >= 52 : right / total >= 0.8;

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final accent = passed ? Acc.success : Acc.coral;

    final body_ = Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(18, 12, 18, 40),
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(S.results(app.lang),
                      style: display(26, wght: 600, color: p.ink)),
                ),
                IconButton(
                  icon: Icon(Icons.close_rounded, color: p.inkSoft),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 28),
              decoration: cardDeco(p, color: tint(accent, p.dark), borderColor: accent),
              child: Column(
                children: [
                  Ring(
                    value: total == 0 ? 0 : right / total,
                    size: 148,
                    stroke: 14,
                    color: accent,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('$right',
                            style: display(44, wght: 600, color: p.ink, height: 1)),
                        Text('${S.of(app.lang)} $total',
                            style: body(14, wght: 700, color: p.inkSoft)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  if (mode.isExam)
                    Text(
                      (passed ? S.passed : S.failed)(app.lang),
                      style: display(24, wght: 600, color: accent, spacing: 1.5),
                    ),
                  const SizedBox(height: 6),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Bi(
                      passed ? S.passedBody : S.failedBody,
                      style: body(15, wght: 600, color: p.ink),
                      align: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    children: [
                      Pill('${S.timeUsed(app.lang)} ${_clock(seconds)}',
                          color: Acc.sky, icon: Icons.timer_rounded),
                      if (mode.isExam)
                        Pill('52 / 65 ${app.lang == Lang.sv ? "krävs" : "needed"}',
                            color: Acc.grape, icon: Icons.flag_rounded),
                    ],
                  ),
                ],
              ),
            ),
            if (wrong.isNotEmpty) ...[
              Heading(S.reviewMistakes),
              for (final q in wrong) _WrongTile(q: q),
              const SizedBox(height: 12),
              BigButton(
                S.tryAgain(app.lang),
                color: Acc.coral,
                icon: Icons.refresh_rounded,
                onTap: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (_) => QuizScreen(
                      questions: wrong,
                      mode: QuizMode.weak,
                      title: S.reviewMistakes,
                      color: Acc.coral,
                    ),
                  ));
                },
              ),
              const SizedBox(height: 10),
            ] else ...[
              const SizedBox(height: 18),
              const EmptyNote(T('Inga fel alls. Snyggt jobbat!', 'Not a single mistake. Beautiful.')),
            ],
            const SizedBox(height: 6),
            OutlinedButton(
              onPressed: () => Navigator.of(context).pop(),
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(0, 54),
                side: BorderSide(color: p.border, width: 1.5),
                shape: const RoundedRectangleBorder(borderRadius: rMd),
              ),
              child: Text(S.backHome(app.lang),
                  style: body(15, wght: 800, color: p.inkSoft)),
            ),
          ],
        ),
      ),
    );

    return passed ? Celebrate(child: body_) : body_;
  }
}

class _WrongTile extends StatelessWidget {
  final Question q;
  const _WrongTile({required this.q});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final chapter = Curriculum.chapterOfSection(q.sectionId);
    final section = Curriculum.section(q.sectionId);
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: TapCard(
        onTap: chapter == null
            ? null
            : () => Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) =>
                      ChapterReader(chapter: chapter, focusSection: q.sectionId),
                )),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (q.signId != null) ...[
              SignView(Curriculum.sign(q.signId!)!, size: 46),
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Bi(q.prompt,
                      style: body(15, wght: 700, color: p.ink), maxLines: 3),
                  const SizedBox(height: 8),
                  Bi(q.options[q.answer.first],
                      style: body(14, wght: 700, color: Acc.success), maxLines: 2),
                  if (section != null) ...[
                    const SizedBox(height: 8),
                    Pill('${chapter?.number ?? ''}. ${section.title(app.lang)}',
                        color: Acc.grape, icon: Icons.menu_book_rounded, fontSize: 11),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
