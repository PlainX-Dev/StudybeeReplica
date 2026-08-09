import 'package:flutter/widgets.dart';

import '../core/l10n.dart';

// ── Chapter content blocks ─────────────────────────────────────────────────

sealed class Block {
  const Block();
}

/// A paragraph of running text.
class Para extends Block {
  final T text;
  const Para(this.text);
}

/// A heading inside a section.
class Head extends Block {
  final T text;
  const Head(this.text);
}

/// Bulleted list.
class Bullets extends Block {
  final List<T> items;
  const Bullets(this.items);
}

/// Numbered steps, used for procedures (roundabouts, accident scenes…).
class Steps extends Block {
  final List<T> items;
  const Steps(this.items);
}

/// The box of hard numbers. These are what the test actually asks about.
class Facts extends Block {
  final T? title;
  final List<(T, T)> rows;
  const Facts(this.rows, {this.title});
}

/// A quote from the statute, so you can see where a rule comes from.
class LawBox extends Block {
  final T ref;
  final T text;
  const LawBox(this.ref, this.text);
}

/// A memory technique: mnemonic, image, rhyme, chunking, story.
class Hook extends Block {
  final T text;
  const Hook(this.text);
}

/// A trap the exam likes to set.
class Trap extends Block {
  final T text;
  const Trap(this.text);
}

/// Row of road signs pulled from the sign library by id.
class SignRow extends Block {
  final List<String> ids;
  final T? caption;
  const SignRow(this.ids, {this.caption});
}

/// Small comparison table.
class TableBlock extends Block {
  final List<T> headers;
  final List<List<T>> rows;
  const TableBlock(this.headers, this.rows);
}

// ── Chapter structure ──────────────────────────────────────────────────────

class Section {
  final String id;
  final T title;
  final List<Block> blocks;
  const Section(this.id, this.title, this.blocks);
}

class Chapter {
  final String id;
  final int number;
  final T title;
  final T summary;
  final IconData icon;
  final int colorIndex;
  final int minutes;
  final List<Section> sections;

  const Chapter({
    required this.id,
    required this.number,
    required this.title,
    required this.summary,
    required this.icon,
    required this.colorIndex,
    required this.minutes,
    required this.sections,
  });

  Section? section(String sectionId) {
    for (final s in sections) {
      if (s.id == sectionId) return s;
    }
    return null;
  }
}

// ── Questions ──────────────────────────────────────────────────────────────

enum QType {
  /// One correct option.
  single,

  /// Two or more correct options; all must be picked.
  multi,

  /// Statement to judge.
  trueFalse,

  /// Shows a road sign and asks what it means.
  sign,

  /// A number the exam expects you to know cold.
  number,
}

class Question {
  final String id;

  /// `chXX.Y` — the section this question is taught in, so a wrong answer can
  /// always send you straight back to the paragraph that explains it.
  final String sectionId;
  final QType type;
  final T prompt;
  final List<T> options;
  final List<int> answer;
  final T why;

  /// Sign shown above the prompt (sign questions, and rule questions that
  /// hang off a particular sign).
  final String? signId;

  /// 1 easy · 2 normal · 3 nasty.
  final int difficulty;
  final List<String> tags;

  const Question({
    required this.id,
    required this.sectionId,
    required this.type,
    required this.prompt,
    required this.options,
    required this.answer,
    required this.why,
    this.signId,
    this.difficulty = 2,
    this.tags = const [],
  });

  String get chapterId => sectionId.split('.').first;

  bool isCorrect(Set<int> picked) =>
      picked.length == answer.length && picked.containsAll(answer);
}

// ── Flashcards ─────────────────────────────────────────────────────────────

enum Deck { numbers, signs, terms, rules, priority, vehicle, human }

class Flashcard {
  final String id;
  final Deck deck;
  final String sectionId;
  final T front;
  final T back;
  final String? signId;
  final T? hint;

  const Flashcard({
    required this.id,
    required this.deck,
    required this.sectionId,
    required this.front,
    required this.back,
    this.signId,
    this.hint,
  });

  String get chapterId => sectionId.split('.').first;
}

// ── Road signs ─────────────────────────────────────────────────────────────

enum SignCat {
  warning,
  priority,
  prohibition,
  mandatory,
  instruction,
  guide,
  service,
  notice,
  marking,
  plate,
  signal,
}

extension SignCatX on SignCat {
  T get label => switch (this) {
        SignCat.warning => const T('Varningsmärken', 'Warning signs'),
        SignCat.priority => const T('Väjningspliktsmärken', 'Priority signs'),
        SignCat.prohibition => const T('Förbudsmärken', 'Prohibitory signs'),
        SignCat.mandatory => const T('Påbudsmärken', 'Mandatory signs'),
        SignCat.instruction => const T('Anvisningsmärken', 'Instruction signs'),
        SignCat.guide => const T('Lokaliseringsmärken', 'Guide signs'),
        SignCat.service => const T('Serviceskyltar', 'Service signs'),
        SignCat.notice => const T('Upplysningsmärken', 'Notice signs'),
        SignCat.marking => const T('Vägmarkeringar', 'Road markings'),
        SignCat.plate => const T('Tilläggstavlor', 'Supplementary plates'),
        SignCat.signal => const T('Signaler & tecken', 'Signals & gestures'),
      };

  /// The letter series used by vägmärkesförordningen (2007:90).
  String get series => switch (this) {
        SignCat.warning => 'A',
        SignCat.priority => 'B',
        SignCat.prohibition => 'C',
        SignCat.mandatory => 'D',
        SignCat.instruction => 'E',
        SignCat.guide => 'F',
        SignCat.service => 'G',
        SignCat.notice => 'J',
        SignCat.marking => 'M',
        SignCat.plate => 'T',
        SignCat.signal => 'S',
      };
}

class RoadSign {
  final String id;
  final SignCat cat;
  final T name;
  final T meaning;

  /// Complete SVG document, drawn to the official geometry.
  final String svg;

  /// Where the rule behind the sign is taught.
  final String sectionId;

  /// Numerals and words are painted as Flutter text on top of the artwork —
  /// SVG `<text>` is not rendered reliably, and this keeps digits crisp at
  /// every size.
  final String? overlay;

  /// Overlay height as a fraction of the sign's width.
  final double overlaySize;
  final int overlayColor;

  /// Nudge the overlay off centre, as a fraction of the sign's width.
  final double overlayDy;

  const RoadSign({
    required this.id,
    required this.cat,
    required this.name,
    required this.meaning,
    required this.svg,
    required this.sectionId,
    this.overlay,
    this.overlaySize = 0.42,
    this.overlayColor = 0xFF1A1A1A,
    this.overlayDy = 0,
  });
}
