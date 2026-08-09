import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'flashcards_screen.dart';
import 'quiz_screen.dart';
import 'widgets/common.dart';

class PracticeScreen extends StatelessWidget {
  const PracticeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final due = app.dueCardCount(Curriculum.flashcards.map((c) => c.id));
    final weak = app.weakQuestionIds().length;

    return Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 120),
          children: [
            Text(S.practiceHub(app.lang),
                style: display(28, wght: 600, color: p.ink)),
            const SizedBox(height: 4),
            Text(
              '${Curriculum.questions.length} ${app.lang == Lang.sv ? "frågor totalt" : "questions in total"}',
              style: body(14, wght: 700, color: p.inkSoft),
            ),
            const SizedBox(height: 18),
            _ExamCard(),
            const SizedBox(height: 12),
            _ModeTile(
              title: S.modeClassic,
              subtitle: S.modeClassicSub,
              icon: Icons.play_arrow_rounded,
              color: Acc.honey,
              onTap: () => openQuiz(context, QuizMode.classic, color: Acc.honey),
            ),
            _ModeTile(
              title: S.modeSigns,
              subtitle: S.modeSignsSub,
              icon: Icons.signpost_rounded,
              color: Acc.sky,
              badge: '${Curriculum.signs.length}',
              onTap: () => openQuiz(context, QuizMode.signs, color: Acc.sky),
            ),
            _ModeTile(
              title: S.modeNumbers,
              subtitle: S.modeNumbersSub,
              icon: Icons.pin_rounded,
              color: Acc.tangerine,
              onTap: () => openQuiz(context, QuizMode.numbers, color: Acc.tangerine),
            ),
            _ModeTile(
              title: S.modeTrueFalse,
              subtitle: S.modeTrueFalseSub,
              icon: Icons.rule_rounded,
              color: Acc.leaf,
              onTap: () => openQuiz(context, QuizMode.trueFalse, color: Acc.leaf),
            ),
            _ModeTile(
              title: S.modeSpeed,
              subtitle: S.modeSpeedSub,
              icon: Icons.bolt_rounded,
              color: Acc.berry,
              onTap: () => openQuiz(context, QuizMode.speed, color: Acc.berry),
            ),
            _ModeTile(
              title: S.modeWeak,
              subtitle: S.modeWeakSub,
              icon: Icons.crisis_alert_rounded,
              color: Acc.coral,
              badge: weak > 0 ? '$weak' : null,
              onTap: () => openQuiz(context, QuizMode.weak, color: Acc.coral),
            ),
            _ModeTile(
              title: S.modeFlashcards,
              subtitle: S.modeFlashcardsSub,
              icon: Icons.style_rounded,
              color: Acc.mint,
              badge: due > 0 ? '$due' : null,
              onTap: () => Navigator.of(context)
                  .push(MaterialPageRoute(builder: (_) => const FlashcardsScreen())),
            ),
            Heading(S.byChapter),
            for (final c in Curriculum.chapters)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: _ChapterQuizRow(chapter: c),
              ),
          ],
        ),
      ),
    );
  }
}

class _ExamCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final best = app.exams.isEmpty
        ? null
        : app.exams.map((e) => e.score).reduce((a, b) => a > b ? a : b);

    return TapCard(
      color: tint(Acc.grape, p.dark, 1.1),
      borderColor: Acc.grape.withValues(alpha: 0.5),
      onTap: () => openQuiz(context, QuizMode.exam, color: Acc.grape),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 50,
                height: 50,
                alignment: Alignment.center,
                decoration: BoxDecoration(color: Acc.grape, borderRadius: rSm),
                child: const Icon(Icons.emoji_events_rounded,
                    color: Colors.white, size: 27),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Bi(S.modeExam, style: display(20, wght: 600, color: p.ink)),
                    const SizedBox(height: 3),
                    Bi(S.modeExamSub,
                        style: body(13, wght: 600, color: p.inkSoft)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final area in ExamArea.values)
                Pill('${area.label(app.lang)} ${area.count}',
                    color: Acc.at(area.index + 3), fontSize: 11),
            ],
          ),
          if (best != null) ...[
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(Icons.military_tech_rounded, size: 18, color: p.inkSoft),
                const SizedBox(width: 6),
                Text(
                  '${app.lang == Lang.sv ? "Bästa resultat" : "Best result"}: $best / 65',
                  style: body(13, wght: 800, color: best >= 52 ? Acc.success : p.inkSoft),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _ModeTile extends StatelessWidget {
  final T title;
  final T subtitle;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;
  final String? badge;

  const _ModeTile({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.onTap,
    this.badge,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: TapCard(
        radius: rMd,
        padding: const EdgeInsets.all(14),
        onTap: onTap,
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              alignment: Alignment.center,
              decoration:
                  BoxDecoration(color: tint(color, p.dark, 1.5), borderRadius: rSm),
              child: Icon(icon, color: color, size: 23),
            ),
            const SizedBox(width: 13),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Bi(title, style: display(16.5, wght: 600, color: p.ink)),
                  const SizedBox(height: 2),
                  Bi(subtitle, style: body(12.5, wght: 600, color: p.inkSoft)),
                ],
              ),
            ),
            if (badge != null) ...[
              Pill(badge!, color: color),
              const SizedBox(width: 6),
            ],
            Icon(Icons.chevron_right_rounded, color: p.inkSoft),
          ],
        ),
      ),
    );
  }
}

class _ChapterQuizRow extends StatelessWidget {
  final Chapter chapter;
  const _ChapterQuizRow({required this.chapter});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final accent = Acc.at(chapter.colorIndex);
    final qs = Curriculum.questionsForChapter(chapter.id);
    final answered = qs.where((q) => app.questions.containsKey(q.id)).length;

    return TapCard(
      radius: rMd,
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      onTap: () => openQuiz(context, QuizMode.chapter,
          chapterId: chapter.id, title: chapter.title, color: accent),
      child: Row(
        children: [
          Container(
            width: 30,
            height: 30,
            alignment: Alignment.center,
            decoration: BoxDecoration(
                color: tint(accent, p.dark, 1.5), borderRadius: BorderRadius.circular(10)),
            child: Text('${chapter.number}',
                style: body(13, wght: 800, color: accent)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(chapter.title(app.lang),
                style: body(14.5, wght: 700, color: p.ink),
                maxLines: 1,
                overflow: TextOverflow.ellipsis),
          ),
          Text('$answered/${qs.length}',
              style: body(12.5, wght: 800, color: p.inkSoft)),
          const SizedBox(width: 6),
          Icon(Icons.chevron_right_rounded, color: p.inkSoft, size: 20),
        ],
      ),
    );
  }
}
