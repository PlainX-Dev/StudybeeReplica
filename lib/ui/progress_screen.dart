import 'dart:math';

import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'widgets/common.dart';

class ProgressScreen extends StatelessWidget {
  const ProgressScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final cardIds = Curriculum.flashcards.map((c) => c.id);
    final readiness = app.readiness(
      totalSections: Curriculum.sections.length,
      totalQuestions: Curriculum.questions.length,
      allCardIds: cardIds,
    );
    final learned =
        cardIds.where((id) => app.cards[id]?.isLearned == true).length;

    return Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 120),
          children: [
            Text(S.yourProgress(app.lang),
                style: display(28, wght: 600, color: p.ink)),
            const SizedBox(height: 16),
            _ReadinessCard(readiness: readiness),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _StatTile(
                    label: S.answered,
                    value: '${app.totalAnswered}',
                    icon: Icons.quiz_rounded,
                    color: Acc.honey,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _StatTile(
                    label: S.accuracy,
                    value: '${(app.overallAccuracy * 100).round()}%',
                    icon: Icons.track_changes_rounded,
                    color: Acc.leaf,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: _StatTile(
                    label: S.cardsLearned,
                    value: '$learned',
                    icon: Icons.style_rounded,
                    color: Acc.mint,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _StatTile(
                    label: S.chaptersRead,
                    value:
                        '${Curriculum.chapters.where((c) => c.sections.every((s) => app.hasRead(s.id))).length}'
                        ' / ${Curriculum.chapters.length}',
                    icon: Icons.menu_book_rounded,
                    color: Acc.grape,
                  ),
                ),
              ],
            ),
            Heading(S.last7days),
            _WeekChart(),
            Heading(S.examHistory),
            _ExamHistory(),
            Heading(S.badges),
            _Badges(),
            Heading(S.byChapter),
            for (final c in Curriculum.chapters) _ChapterRow(chapter: c),
          ],
        ),
      ),
    );
  }
}

class _ReadinessCard extends StatelessWidget {
  final int readiness;
  const _ReadinessCard({required this.readiness});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final color = readiness >= 80
        ? Acc.success
        : readiness >= 50
            ? Acc.honey
            : Acc.coral;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: cardDeco(p, color: tint(color, p.dark, 0.9), borderColor: color.withValues(alpha: 0.5)),
      child: Row(
        children: [
          Ring(
            value: readiness / 100,
            size: 96,
            stroke: 11,
            color: color,
            child: Text('$readiness',
                style: display(28, wght: 600, color: p.ink, height: 1)),
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Bi(S.readiness, style: display(19, wght: 600, color: p.ink)),
                const SizedBox(height: 6),
                Bi(S.readinessHint,
                    style: body(12.5, wght: 600, color: p.inkSoft, height: 1.4)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StatTile extends StatelessWidget {
  final T label;
  final String value;
  final IconData icon;
  final Color color;

  const _StatTile({
    required this.label,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: cardDeco(p, radius: rMd),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(height: 10),
          Text(value, style: display(24, wght: 600, color: p.ink, height: 1)),
          const SizedBox(height: 4),
          Bi(label, style: body(12.5, wght: 700, color: p.inkSoft)),
        ],
      ),
    );
  }
}

class _WeekChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final data = app.last7;
    final peak = max(app.dailyGoal, data.isEmpty ? 1 : data.reduce(max));
    const svDays = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
    const enDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return Container(
      padding: const EdgeInsets.fromLTRB(16, 18, 16, 12),
      decoration: cardDeco(p),
      child: Column(
        children: [
          SizedBox(
            height: 118,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (var i = 0; i < 7; i++)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 5),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            data[i] == 0 ? '' : '${data[i]}',
                            style: body(11, wght: 800, color: p.inkSoft),
                          ),
                          const SizedBox(height: 4),
                          TweenAnimationBuilder<double>(
                            tween: Tween(begin: 0, end: data[i] / peak),
                            duration: Duration(milliseconds: 400 + i * 60),
                            curve: Curves.easeOutCubic,
                            builder: (_, v, __) => Container(
                              height: max(6, 82 * v.clamp(0.0, 1.0)),
                              decoration: BoxDecoration(
                                gradient: accentGradient(
                                    data[i] >= app.dailyGoal ? Acc.success : Acc.honey),
                                borderRadius: BorderRadius.circular(9),
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            (app.lang == Lang.sv ? svDays : enDays)[
                                (dateOfDay(app.today - 6 + i).weekday - 1) % 7],
                            style: body(11, wght: 800, color: p.inkSoft),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ExamHistory extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    if (app.exams.isEmpty) return const EmptyNote(S.noExamsYet);
    final recent = app.exams.reversed.take(5).toList();
    return Column(
      children: [
        for (final e in recent)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: cardDeco(p, radius: rMd),
              child: Row(
                children: [
                  Icon(
                    e.passed ? Icons.check_circle_rounded : Icons.cancel_rounded,
                    color: e.passed ? Acc.success : Acc.coral,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      '${e.score} / ${e.total}',
                      style: display(17, wght: 600, color: p.ink),
                    ),
                  ),
                  Text(
                    '${dateOfDay(e.dayNumber).day}/${dateOfDay(e.dayNumber).month}',
                    style: body(13, wght: 700, color: p.inkSoft),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _Badges extends StatelessWidget {
  static const _all = <(String, T, IconData, Color)>[
    ('q100', T('100 frågor', '100 questions'), Icons.looks_one_rounded, Acc.honey),
    ('q500', T('500 frågor', '500 questions'), Icons.looks_two_rounded, Acc.tangerine),
    ('streak7', T('7 dagar i rad', '7-day streak'), Icons.local_fire_department_rounded, Acc.coral),
    ('perfect', T('Allt rätt', 'Perfect round'), Icons.auto_awesome_rounded, Acc.grape),
    ('examPass', T('Godkänd simulering', 'Passed a mock test'), Icons.emoji_events_rounded, Acc.success),
  ];

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final b in _all)
          Container(
            width: 104,
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
            decoration: cardDeco(
              p,
              radius: rMd,
              color: app.badges.contains(b.$1) ? tint(b.$4, p.dark, 1.2) : null,
              borderColor: app.badges.contains(b.$1) ? b.$4.withValues(alpha: 0.5) : p.border,
            ),
            child: Column(
              children: [
                Icon(b.$3,
                    size: 30,
                    color: app.badges.contains(b.$1) ? b.$4 : p.border),
                const SizedBox(height: 8),
                Text(
                  b.$2(app.lang),
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  style: body(11, wght: 800, color: p.inkSoft, height: 1.2),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _ChapterRow extends StatelessWidget {
  final Chapter chapter;
  const _ChapterRow({required this.chapter});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final accent = Acc.at(chapter.colorIndex);
    final qs = Curriculum.questionsForChapter(chapter.id);
    var seen = 0;
    var right = 0;
    for (final q in qs) {
      final s = app.questions[q.id];
      if (s != null && s.seen > 0) {
        seen++;
        if (s.accuracy >= 0.6) right++;
      }
    }
    final mastery = qs.isEmpty ? 0.0 : right / qs.length;

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: TapCard(
        radius: rMd,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        onTap: () => Navigator.of(context)
            .push(MaterialPageRoute(builder: (_) => ChapterReader(chapter: chapter))),
        child: Row(
          children: [
            Ring(value: mastery, size: 40, stroke: 5, color: accent),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(chapter.title(app.lang),
                      style: body(14.5, wght: 700, color: p.ink),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 3),
                  Text(
                    '$seen/${qs.length} ${app.lang == Lang.sv ? "provade" : "attempted"}',
                    style: body(12, wght: 600, color: p.inkSoft),
                  ),
                ],
              ),
            ),
            Text('${(mastery * 100).round()}%',
                style: body(13.5, wght: 800, color: accent)),
          ],
        ),
      ),
    );
  }
}
