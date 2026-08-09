import '../../core/l10n.dart';
import '../../models/content.dart';

/// Terse builders so the question bank reads as content, not as constructor calls.

Question q(
  String id,
  String sec,
  T prompt,
  List<T> options,
  List<int> answer,
  T why, {
  QType type = QType.single,
  String? sign,
  int d = 2,
  List<String> tags = const [],
}) =>
    Question(
      id: id,
      sectionId: sec,
      type: type,
      prompt: prompt,
      options: options,
      answer: answer,
      why: why,
      signId: sign,
      difficulty: d,
      tags: tags,
    );

/// Multiple correct answers — the learner must tick every one.
Question qm(
  String id,
  String sec,
  T prompt,
  List<T> options,
  List<int> answer,
  T why, {
  int d = 3,
  List<String> tags = const [],
}) =>
    q(id, sec, prompt, options, answer, why,
        type: QType.multi, d: d, tags: tags);

/// A statement to judge.
Question tf(String id, String sec, T statement, bool isTrue, T why, {int d = 2}) =>
    Question(
      id: id,
      sectionId: sec,
      type: QType.trueFalse,
      prompt: statement,
      options: const [T('Sant', 'True'), T('Falskt', 'False')],
      answer: [isTrue ? 0 : 1],
      why: why,
      difficulty: d,
    );

/// A number the test expects you to know cold.
Question qn(
  String id,
  String sec,
  T prompt,
  List<T> options,
  int answer,
  T why, {
  int d = 2,
}) =>
    q(id, sec, prompt, options, [answer], why, type: QType.number, d: d, tags: const ['number']);
