import 'package:flutter_test/flutter_test.dart';
import 'package:korkortskompis/data/curriculum.dart';
import 'package:korkortskompis/models/content.dart';

/// The content is large and hand-written, so these tests exist to catch the
/// mistakes a human makes at that volume: a sign id that does not exist, an
/// answer index pointing past the end of the options, a duplicated question id.
void main() {
  test('chapter, section, question, card and sign ids are unique', () {
    void unique(String what, Iterable<String> ids) {
      final seen = <String>{};
      final dupes = <String>[];
      for (final id in ids) {
        if (!seen.add(id)) dupes.add(id);
      }
      expect(dupes, isEmpty, reason: 'duplicate $what ids: $dupes');
    }

    unique('chapter', Curriculum.chapters.map((c) => c.id));
    unique('section', Curriculum.sections.map((s) => s.id));
    unique('question', Curriculum.questions.map((q) => q.id));
    unique('flashcard', Curriculum.flashcards.map((c) => c.id));
    unique('sign', Curriculum.signs.map((s) => s.id));
  });

  test('every section id starts with its chapter id', () {
    for (final c in Curriculum.chapters) {
      for (final s in c.sections) {
        expect(s.id.split('.').first, c.id,
            reason: 'section ${s.id} does not belong to ${c.id}');
      }
    }
  });

  test('every question points at a real section and a valid answer', () {
    for (final q in Curriculum.questions) {
      expect(Curriculum.section(q.sectionId), isNotNull,
          reason: 'question ${q.id} references unknown section ${q.sectionId}');
      expect(q.options.length, greaterThanOrEqualTo(2),
          reason: 'question ${q.id} needs at least two options');
      expect(q.answer, isNotEmpty, reason: 'question ${q.id} has no answer');
      for (final a in q.answer) {
        expect(a, inInclusiveRange(0, q.options.length - 1),
            reason: 'question ${q.id} answer index $a is out of range');
      }
      if (q.type == QType.multi) {
        expect(q.answer.length, greaterThanOrEqualTo(2),
            reason: 'multi question ${q.id} should have several answers');
      }
      if (q.type != QType.multi && q.type != QType.sign) {
        expect(q.answer.length, 1,
            reason: 'question ${q.id} should have exactly one answer');
      }
      if (q.signId != null) {
        expect(Curriculum.sign(q.signId!), isNotNull,
            reason: 'question ${q.id} references unknown sign ${q.signId}');
      }
    }
  });

  test('every flashcard points at a real section and sign', () {
    for (final c in Curriculum.flashcards) {
      expect(Curriculum.section(c.sectionId), isNotNull,
          reason: 'card ${c.id} references unknown section ${c.sectionId}');
      if (c.signId != null) {
        expect(Curriculum.sign(c.signId!), isNotNull,
            reason: 'card ${c.id} references unknown sign ${c.signId}');
      }
    }
  });

  test('every sign referenced from a chapter exists', () {
    final missing = <String>[];
    for (final c in Curriculum.chapters) {
      for (final s in c.sections) {
        for (final b in s.blocks) {
          if (b is SignRow) {
            for (final id in b.ids) {
              if (Curriculum.sign(id) == null) missing.add('${s.id} → $id');
            }
          }
        }
      }
    }
    expect(missing, isEmpty, reason: 'unknown signs referenced: $missing');
  });

  test('every sign points at a real section and carries drawable art', () {
    for (final s in Curriculum.signs) {
      expect(Curriculum.section(s.sectionId), isNotNull,
          reason: 'sign ${s.id} references unknown section ${s.sectionId}');
      expect(s.svg.startsWith('<svg'), isTrue, reason: 'sign ${s.id} has no svg root');
      expect(s.svg.contains('viewBox'), isTrue, reason: 'sign ${s.id} has no viewBox');
    }
  });

  test('both languages are filled in everywhere', () {
    for (final q in Curriculum.questions) {
      expect(q.prompt.sv.trim(), isNotEmpty, reason: '${q.id} sv prompt');
      expect(q.prompt.en.trim(), isNotEmpty, reason: '${q.id} en prompt');
      for (final o in q.options) {
        expect(o.sv.trim(), isNotEmpty, reason: '${q.id} sv option');
        expect(o.en.trim(), isNotEmpty, reason: '${q.id} en option');
      }
    }
    for (final s in Curriculum.signs) {
      expect(s.name.sv.trim(), isNotEmpty, reason: '${s.id} sv name');
      expect(s.name.en.trim(), isNotEmpty, reason: '${s.id} en name');
    }
  });

  test('a mock exam has the same shape as the real one', () {
    final exam = Curriculum.examSet(seed: 7);
    expect(exam.length, 65);
    final counts = <ExamArea, int>{};
    for (final q in exam) {
      counts.update(Curriculum.areaOf(q), (v) => v + 1, ifAbsent: () => 1);
    }
    expect(counts[ExamArea.rules], 32);
    expect(counts[ExamArea.safety], 16);
    expect(counts[ExamArea.vehicle], 7);
    expect(counts[ExamArea.environment], 5);
    expect(counts[ExamArea.personal], 5);
    expect(exam.map((q) => q.id).toSet().length, 65, reason: 'no repeats in one test');
  });

  test('the bank is big enough to be worth studying', () {
    expect(Curriculum.questions.length, greaterThan(350));
    expect(Curriculum.signs.length, greaterThan(150));
    expect(Curriculum.flashcards.length, greaterThan(200));
    expect(Curriculum.sections.length, greaterThan(70));
  });
}
