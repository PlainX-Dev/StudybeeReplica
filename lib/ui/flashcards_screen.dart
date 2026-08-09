import 'dart:math';

import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'widgets/common.dart';

/// Spaced repetition. Cards you miss come back tomorrow; cards you know drift
/// further and further away.
class FlashcardsScreen extends StatefulWidget {
  final Deck? deck;
  const FlashcardsScreen({super.key, this.deck});

  @override
  State<FlashcardsScreen> createState() => _FlashcardsScreenState();
}

class _FlashcardsScreenState extends State<FlashcardsScreen> {
  late List<Flashcard> _queue;
  bool _flipped = false;
  int _done = 0;
  bool _ahead = false;

  @override
  void initState() {
    super.initState();
    _build();
  }

  void _build() {
    final app = AppScope.read(context);
    final pool = widget.deck == null
        ? Curriculum.flashcards
        : Curriculum.flashcards.where((c) => c.deck == widget.deck).toList();
    final due = pool.where((c) {
      final s = app.cards[c.id];
      return s == null || s.dueDay <= app.today;
    }).toList();
    _ahead = due.isEmpty;
    _queue = (due.isEmpty ? [...pool] : due)..shuffle(Random());
    if (_queue.length > 40) _queue = _queue.sublist(0, 40);
  }

  void _grade(int grade) {
    final app = AppScope.read(context);
    final card = _queue.first;
    app.gradeCard(card.id, grade);
    setState(() {
      _flipped = false;
      _queue.removeAt(0);
      _done++;
      // "Again" puts the card back a few positions later in this session.
      if (grade == 0 && _queue.length > 2) {
        _queue.insert(min(3, _queue.length), card);
      } else if (grade == 0) {
        _queue.add(card);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);

    if (_queue.isEmpty) {
      return Scaffold(
        backgroundColor: p.bg,
        appBar: AppBar(title: Text(S.modeFlashcards(app.lang))),
        body: Celebrate(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(28),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Bee(size: 96),
                  const SizedBox(height: 18),
                  Text(S.deckDone(app.lang),
                      style: display(26, wght: 600, color: p.ink)),
                  const SizedBox(height: 8),
                  Text(
                    '$_done ${app.lang == Lang.sv ? "kort klara" : "cards done"}',
                    style: body(15, wght: 700, color: p.inkSoft),
                  ),
                  const SizedBox(height: 26),
                  BigButton(
                    S.backHome(app.lang),
                    color: Acc.mint,
                    expand: false,
                    onTap: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    final card = _queue.first;
    final sign = card.signId == null ? null : Curriculum.sign(card.signId!);
    final chapter = Curriculum.chapterOfSection(card.sectionId);

    return Scaffold(
      backgroundColor: p.bg,
      appBar: AppBar(
        title: Text(S.modeFlashcards(app.lang)),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Pill('${_queue.length} ${S.cardsLeft(app.lang)}',
                  color: Acc.mint, icon: Icons.style_rounded),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            if (_ahead)
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                child: Row(
                  children: [
                    const Icon(Icons.info_rounded, size: 17, color: Acc.mint),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${S.nothingDue(app.lang)} ${S.studyAhead(app.lang)}.',
                        style: body(12.5, wght: 700, color: p.inkSoft),
                      ),
                    ),
                  ],
                ),
              ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(18, 6, 18, 6),
                child: GestureDetector(
                  onTap: () => setState(() => _flipped = !_flipped),
                  child: AnimatedSwitcher(
                    duration: const Duration(milliseconds: 260),
                    transitionBuilder: (child, anim) => FadeTransition(
                      opacity: anim,
                      child: ScaleTransition(
                        scale: Tween(begin: 0.96, end: 1.0).animate(anim),
                        child: child,
                      ),
                    ),
                    child: Container(
                      key: ValueKey('${card.id}-$_flipped'),
                      width: double.infinity,
                      padding: const EdgeInsets.all(24),
                      decoration: cardDeco(
                        p,
                        color: _flipped ? tint(Acc.mint, p.dark, 0.9) : p.surface,
                        borderColor: _flipped ? Acc.mint.withValues(alpha: 0.5) : p.border,
                      ),
                      child: SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const SizedBox(height: 8),
                            if (sign != null) ...[
                              SignView(sign, size: _flipped ? 110 : 170),
                              const SizedBox(height: 18),
                            ],
                            Bi(
                              _flipped ? card.back : card.front,
                              style: display(_flipped ? 21 : 24,
                                  wght: 600, color: p.ink, height: 1.25),
                              align: TextAlign.center,
                            ),
                            if (!_flipped) ...[
                              const SizedBox(height: 22),
                              Text(S.tapToFlip(app.lang),
                                  style: body(13, wght: 700, color: p.inkSoft)),
                            ],
                            if (_flipped && chapter != null) ...[
                              const SizedBox(height: 20),
                              TextButton.icon(
                                onPressed: () => Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => ChapterReader(
                                        chapter: chapter, focusSection: card.sectionId),
                                  ),
                                ),
                                icon: const Icon(Icons.menu_book_rounded,
                                    size: 18, color: Acc.grape),
                                label: Text(S.readChapter(app.lang),
                                    style: body(13.5, wght: 800, color: Acc.grape)),
                              ),
                            ],
                            const SizedBox(height: 8),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 6, 16, 18),
              child: _flipped
                  ? Row(
                      children: [
                        _GradeButton(S.again, Acc.danger, 0, _grade),
                        _GradeButton(S.hard, Acc.tangerine, 1, _grade),
                        _GradeButton(S.good, Acc.sky, 2, _grade),
                        _GradeButton(S.easy, Acc.success, 3, _grade),
                      ],
                    )
                  : BigButton(
                      S.tapToFlip(app.lang),
                      color: Acc.mint,
                      icon: Icons.flip_rounded,
                      onTap: () => setState(() => _flipped = true),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _GradeButton extends StatelessWidget {
  final T label;
  final Color color;
  final int grade;
  final void Function(int) onTap;

  const _GradeButton(this.label, this.color, this.grade, this.onTap);

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: rMd,
            onTap: () => onTap(grade),
            child: Container(
              height: 56,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: tint(color, p.dark, 1.4),
                borderRadius: rMd,
                border: Border.all(color: color.withValues(alpha: 0.5), width: 1.5),
              ),
              child: Text(
                label(app.lang),
                style: body(14, wght: 800, color: p.dark ? color : Color.lerp(color, p.ink, 0.3)),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
