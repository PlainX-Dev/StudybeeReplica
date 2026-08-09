import 'dart:math';

import '../core/l10n.dart';
import '../models/content.dart';
import 'chapters/ch01.dart';
import 'chapters/ch02.dart';
import 'chapters/ch03.dart';
import 'chapters/ch04.dart';
import 'chapters/ch05.dart';
import 'chapters/ch06.dart';
import 'chapters/ch07.dart';
import 'chapters/ch08.dart';
import 'chapters/ch09.dart';
import 'chapters/ch10.dart';
import 'chapters/ch11.dart';
import 'chapters/ch12.dart';
import 'chapters/ch13.dart';
import 'chapters/ch14.dart';
import 'chapters/ch15.dart';
import 'chapters/ch16.dart';
import 'chapters/ch17.dart';
import 'chapters/ch18.dart';
import 'chapters/ch19.dart';
import 'chapters/ch20.dart';
import 'flashcards.dart';
import 'questions/all_questions.dart';
import 'signs/signs_a_b.dart';
import 'signs/signs_c.dart';
import 'signs/signs_d_e.dart';
import 'signs/signs_misc.dart';

/// The five areas Trafikverket draws the 65 scored questions from, with the
/// number of questions each area contributes to a real test.
enum ExamArea { rules, safety, vehicle, environment, personal }

extension ExamAreaX on ExamArea {
  int get count => switch (this) {
        ExamArea.rules => 32,
        ExamArea.safety => 16,
        ExamArea.vehicle => 7,
        ExamArea.environment => 5,
        ExamArea.personal => 5,
      };

  T get label => switch (this) {
        ExamArea.rules => const T('Trafikregler', 'Traffic rules'),
        ExamArea.safety => const T('Trafiksäkerhet', 'Traffic safety'),
        ExamArea.vehicle =>
          const T('Fordonskännedom och manövrering', 'Vehicle knowledge and handling'),
        ExamArea.environment => const T('Miljö', 'Environment'),
        ExamArea.personal =>
          const T('Personliga förutsättningar', 'Personal prerequisites'),
      };
}

const _areaOfChapter = <String, ExamArea>{
  'ch01': ExamArea.personal,
  'ch02': ExamArea.rules,
  'ch03': ExamArea.rules,
  'ch04': ExamArea.rules,
  'ch05': ExamArea.rules,
  'ch06': ExamArea.rules,
  'ch07': ExamArea.rules,
  'ch08': ExamArea.rules,
  'ch09': ExamArea.rules,
  'ch10': ExamArea.rules,
  'ch11': ExamArea.rules,
  'ch12': ExamArea.safety,
  'ch13': ExamArea.vehicle,
  'ch14': ExamArea.vehicle,
  'ch15': ExamArea.environment,
  'ch16': ExamArea.personal,
  'ch17': ExamArea.safety,
  'ch18': ExamArea.rules,
  'ch19': ExamArea.safety,
  'ch20': ExamArea.personal,
};

/// Everything the app knows, wired together once at startup.
class Curriculum {
  static const chapters = <Chapter>[
    ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10,
    ch11, ch12, ch13, ch14, ch15, ch16, ch17, ch18, ch19, ch20,
  ];

  static final signs = <RoadSign>[
    ...signsA,
    ...signsB,
    ...signsC,
    ...signsD,
    ...signsE,
    ...signsMisc,
  ];

  static final _chapterById = {for (final c in chapters) c.id: c};
  static final signById = {for (final s in signs) s.id: s};

  /// Hand-written questions plus one generated recognition question per sign.
  static final questions = <Question>[
    ...handWrittenQuestions,
    ..._signQuestions(),
  ];

  static final _questionById = {for (final q in questions) q.id: q};

  static final flashcards = <Flashcard>[
    ...handWrittenCards,
    ..._signCards(),
  ];

  static final _cardById = {for (final c in flashcards) c.id: c};

  static final sections = <Section>[
    for (final c in chapters) ...c.sections,
  ];

  static final _sectionById = {for (final s in sections) s.id: s};

  static Chapter? chapter(String id) => _chapterById[id];
  static Section? section(String id) => _sectionById[id];
  static Question? question(String id) => _questionById[id];
  static Flashcard? card(String id) => _cardById[id];
  static RoadSign? sign(String id) => signById[id];

  static Chapter? chapterOfSection(String sectionId) =>
      _chapterById[sectionId.split('.').first];

  static ExamArea areaOf(Question q) =>
      _areaOfChapter[q.chapterId] ?? ExamArea.rules;

  static List<Question> questionsForChapter(String chapterId) =>
      questions.where((q) => q.chapterId == chapterId).toList();

  static List<Question> questionsForSection(String sectionId) =>
      questions.where((q) => q.sectionId == sectionId).toList();

  static List<Flashcard> cardsForChapter(String chapterId) =>
      flashcards.where((c) => c.chapterId == chapterId).toList();

  static List<RoadSign> signsForSection(String sectionId) =>
      signs.where((s) => s.sectionId == sectionId).toList();

  static List<Question> byType(QType type) =>
      questions.where((q) => q.type == type).toList();

  /// Builds a mock test with the same mix as the real thing: 32 rules,
  /// 16 safety, 7 vehicle, 5 environment, 5 personal.
  static List<Question> examSet({int? seed}) {
    final rnd = Random(seed ?? DateTime.now().millisecondsSinceEpoch);
    final byArea = <ExamArea, List<Question>>{
      for (final a in ExamArea.values) a: [],
    };
    for (final q in questions) {
      byArea[areaOf(q)]!.add(q);
    }
    final out = <Question>[];
    for (final area in ExamArea.values) {
      final pool = [...byArea[area]!]..shuffle(rnd);
      out.addAll(pool.take(min(area.count, pool.length)));
    }
    out.shuffle(rnd);
    return out;
  }

  // ── Generated content ───────────────────────────────────────────────────

  /// One "what does this sign mean?" question per sign, with distractors taken
  /// from the same family so the answer is never obvious from the shape alone.
  static List<Question> _signQuestions() {
    final rnd = Random(20260809);
    final out = <Question>[];
    for (final s in signs) {
      final siblings = signs
          .where((o) => o.id != s.id && o.cat == s.cat)
          .toList();
      final pool = siblings.length >= 3
          ? siblings
          : signs.where((o) => o.id != s.id).toList();
      pool.shuffle(rnd);
      final distractors = pool.take(3).map((o) => o.meaning).toList();
      out.add(Question(
        id: 'sq-${s.id}',
        sectionId: s.sectionId,
        type: QType.sign,
        signId: s.id,
        prompt: const T('Vad betyder märket?', 'What does this sign mean?'),
        options: [s.meaning, ...distractors],
        answer: const [0],
        why: T('${s.name.sv} — ${s.meaning.sv}', '${s.name.en} — ${s.meaning.en}'),
        difficulty: 2,
        tags: const ['sign'],
      ));
    }
    return out;
  }

  static List<Flashcard> _signCards() => [
        for (final s in signs)
          Flashcard(
            id: 'sc-${s.id}',
            deck: Deck.signs,
            sectionId: s.sectionId,
            signId: s.id,
            front: const T('Vad betyder märket?', 'What does this sign mean?'),
            back: T('${s.name.sv}\n${s.meaning.sv}', '${s.name.en}\n${s.meaning.en}'),
          ),
      ];
}
