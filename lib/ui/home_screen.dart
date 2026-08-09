import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../main.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'flashcards_screen.dart';
import 'quiz_screen.dart';
import 'settings_screen.dart';
import 'widgets/common.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final due = app.dueCardCount(Curriculum.flashcards.map((c) => c.id));
    final nextChapter = _nextChapter(app);

    return Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
          children: [
            _greeting(context, p, app),
            const SizedBox(height: 16),
            _CountdownCard(),
            const SizedBox(height: 12),
            _GoalCard(due: due),
            if (nextChapter != null) ...[
              Heading(S.continueStudying),
              _ContinueCard(chapter: nextChapter),
            ],
            Heading(S.quickStart),
            _quickGrid(context, due),
            Heading(S.todaysPlan),
            _PlanList(),
            _WeakSpots(),
          ],
        ),
      ),
    );
  }

  Widget _greeting(BuildContext context, Palette p, AppState app) {
    final hour = DateTime.now().hour;
    final greet = hour < 11
        ? S.goodMorning
        : hour < 18
            ? S.goodAfternoon
            : S.goodEvening;
    final line = S.homeGreetings[DateTime.now().day % S.homeGreetings.length];
    return Row(
      children: [
        const Bee(size: 54),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(greet(app.lang), style: display(24, wght: 600, color: p.ink)),
              const SizedBox(height: 2),
              Text(line(app.lang), style: body(13.5, wght: 600, color: p.inkSoft)),
            ],
          ),
        ),
        IconButton(
          icon: Icon(Icons.settings_rounded, color: p.inkSoft),
          onPressed: () => Navigator.of(context, rootNavigator: true)
              .push(MaterialPageRoute(builder: (_) => const SettingsScreen())),
        ),
      ],
    );
  }

  Widget _quickGrid(BuildContext context, int due) {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      childAspectRatio: 1.42,
      children: [
        _QuickTile(
          title: S.modeClassic,
          icon: Icons.play_arrow_rounded,
          color: Acc.honey,
          onTap: () => openQuiz(context, QuizMode.classic, color: Acc.honey),
        ),
        _QuickTile(
          title: S.modeFlashcards,
          icon: Icons.style_rounded,
          color: Acc.mint,
          badge: due > 0 ? '$due' : null,
          onTap: () => Navigator.of(context, rootNavigator: true)
              .push(MaterialPageRoute(builder: (_) => const FlashcardsScreen())),
        ),
        _QuickTile(
          title: S.modeSigns,
          icon: Icons.signpost_rounded,
          color: Acc.sky,
          onTap: () => openQuiz(context, QuizMode.signs, color: Acc.sky),
        ),
        _QuickTile(
          title: S.modeExam,
          icon: Icons.emoji_events_rounded,
          color: Acc.grape,
          onTap: () => openQuiz(context, QuizMode.exam, color: Acc.grape),
        ),
      ],
    );
  }
}

Chapter? _nextChapter(AppState app) {
  for (final c in Curriculum.chapters) {
    final read = c.sections.where((s) => app.hasRead(s.id)).length;
    if (read < c.sections.length) return c;
  }
  return null;
}

class _CountdownCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final left = app.daysLeft;

    Future<void> pick() async {
      final now = DateTime.now();
      final picked = await showDatePicker(
        context: context,
        initialDate: app.examDay == null ? now.add(const Duration(days: 30)) : dateOfDay(app.examDay!),
        firstDate: now.subtract(const Duration(days: 1)),
        lastDate: now.add(const Duration(days: 730)),
      );
      if (picked != null) app.setExamDate(picked);
    }

    if (left == null) {
      return TapCard(
        onTap: pick,
        color: tint(Acc.coral, p.dark, 1.1),
        borderColor: Acc.coral.withValues(alpha: 0.5),
        child: Row(
          children: [
            const Icon(Icons.event_rounded, color: Acc.coral, size: 30),
            const SizedBox(width: 14),
            Expanded(
              child: Bi(S.setExamDate,
                  style: display(18, wght: 600, color: p.ink)),
            ),
            Icon(Icons.chevron_right_rounded, color: p.inkSoft),
          ],
        ),
      );
    }

    final urgent = left <= 7;
    final accent = urgent ? Acc.coral : Acc.honey;
    return TapCard(
      onTap: pick,
      color: tint(accent, p.dark, 1.2),
      borderColor: accent.withValues(alpha: 0.5),
      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                left <= 0 ? '🎉' : '$left',
                style: display(46, wght: 600, color: accent, height: 1),
              ),
            ],
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Bi(
                  left <= 0
                      ? S.examToday
                      : (left == 1 ? S.dayToExam : S.daysToExam),
                  style: display(17, wght: 600, color: p.ink, height: 1.2),
                ),
                const SizedBox(height: 6),
                Text(
                  _formatDate(dateOfDay(app.examDay!), app.lang),
                  style: body(13, wght: 700, color: p.inkSoft),
                ),
              ],
            ),
          ),
          Icon(Icons.edit_calendar_rounded, color: p.inkSoft, size: 20),
        ],
      ),
    );
  }
}

String _formatDate(DateTime d, Lang lang) {
  const sv = [
    'januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december'
  ];
  const en = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  final m = lang == Lang.sv ? sv[d.month - 1] : en[d.month - 1];
  return lang == Lang.sv ? '${d.day} $m ${d.year}' : '$m ${d.day}, ${d.year}';
}

class _GoalCard extends StatelessWidget {
  final int due;
  const _GoalCard({required this.due});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final done = app.answeredToday;
    final reached = done >= app.dailyGoal;

    return TapCard(
      onTap: () => openQuiz(context, QuizMode.classic, color: Acc.honey),
      child: Row(
        children: [
          Ring(
            value: app.goalProgress,
            size: 74,
            stroke: 9,
            color: reached ? Acc.success : Acc.honey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('$done',
                    style: display(22, wght: 600, color: p.ink, height: 1)),
                Text('/ ${app.dailyGoal}',
                    style: body(11, wght: 700, color: p.inkSoft)),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Bi(reached ? S.goalReached : S.todaysGoal,
                    style: display(17, wght: 600, color: p.ink)),
                const SizedBox(height: 4),
                Text(S.questionsDone(app.lang),
                    style: body(13, wght: 600, color: p.inkSoft)),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    Pill('${app.streak} ${S.streak(app.lang)}',
                        color: Acc.tangerine, icon: Icons.local_fire_department_rounded),
                    if (due > 0)
                      Pill('$due ${S.reviewDue(app.lang)}',
                          color: Acc.mint, icon: Icons.style_rounded),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ContinueCard extends StatelessWidget {
  final Chapter chapter;
  const _ContinueCard({required this.chapter});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final accent = Acc.at(chapter.colorIndex);
    final next = chapter.sections.firstWhere((s) => !app.hasRead(s.id),
        orElse: () => chapter.sections.first);

    return TapCard(
      color: tint(accent, p.dark, 0.9),
      borderColor: accent.withValues(alpha: 0.45),
      onTap: () => Navigator.of(context).push(MaterialPageRoute(
        builder: (_) => ChapterReader(chapter: chapter, focusSection: next.id),
      )),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            alignment: Alignment.center,
            decoration: BoxDecoration(color: accent, borderRadius: rSm),
            child: Icon(chapter.icon, color: onAccent(accent), size: 25),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('${S.chapter(app.lang)} ${chapter.number}',
                    style: body(12, wght: 800, color: accent)),
                const SizedBox(height: 3),
                Bi(next.title,
                    style: display(16.5, wght: 600, color: p.ink, height: 1.2),
                    maxLines: 2),
              ],
            ),
          ),
          Icon(Icons.play_circle_fill_rounded, color: accent, size: 34),
        ],
      ),
    );
  }
}

class _QuickTile extends StatelessWidget {
  final T title;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;
  final String? badge;

  const _QuickTile({
    required this.title,
    required this.icon,
    required this.color,
    required this.onTap,
    this.badge,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return TapCard(
      onTap: onTap,
      padding: const EdgeInsets.all(15),
      color: tint(color, p.dark, 0.9),
      borderColor: color.withValues(alpha: 0.4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                alignment: Alignment.center,
                decoration: BoxDecoration(color: color, borderRadius: rSm),
                child: Icon(icon, color: onAccent(color), size: 22),
              ),
              const Spacer(),
              if (badge != null) Pill(badge!, color: color),
            ],
          ),
          Bi(title,
              style: display(15.5, wght: 600, color: p.ink, height: 1.15),
              maxLines: 2),
        ],
      ),
    );
  }
}

/// A short, concrete list of what to do today. It reacts to what is actually
/// missing rather than repeating the same three lines every day.
class _PlanList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final due = app.dueCardCount(Curriculum.flashcards.map((c) => c.id));
    final left = app.daysLeft;
    final chapter = _nextChapter(app);
    final weak = app.weakQuestionIds().length;

    final items = <_PlanItem>[
      if (chapter != null)
        _PlanItem(
          T('Läs ${chapter.title.sv}', 'Read “${chapter.title.en}”'),
          Icons.menu_book_rounded,
          Acc.grape,
          false,
          () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => ChapterReader(chapter: chapter))),
        ),
      _PlanItem(
        T('Svara på ${app.dailyGoal} frågor', 'Answer ${app.dailyGoal} questions'),
        Icons.bolt_rounded,
        Acc.honey,
        app.answeredToday >= app.dailyGoal,
        () => openQuiz(context, QuizMode.classic, color: Acc.honey),
      ),
      if (due > 0)
        _PlanItem(
          T('Repetera $due minneskort', 'Review $due flashcards'),
          Icons.style_rounded,
          Acc.mint,
          false,
          () => Navigator.of(context, rootNavigator: true)
              .push(MaterialPageRoute(builder: (_) => const FlashcardsScreen())),
        ),
      if (weak >= 5)
        _PlanItem(
          T('Träna $weak svaga frågor', 'Drill $weak weak questions'),
          Icons.crisis_alert_rounded,
          Acc.coral,
          false,
          () => openQuiz(context, QuizMode.weak, color: Acc.coral),
        ),
      if (left != null && left <= 14)
        _PlanItem(
          T('Kör en provsimulering', 'Run a full mock test'),
          Icons.emoji_events_rounded,
          Acc.berry,
          app.exams.any((e) => e.dayNumber == app.today),
          () => openQuiz(context, QuizMode.exam, color: Acc.grape),
        ),
    ];

    return Column(
      children: [
        for (final it in items)
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: TapCard(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
              radius: rMd,
              onTap: it.onTap,
              child: Row(
                children: [
                  Container(
                    width: 34,
                    height: 34,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: it.done ? Acc.success : tint(it.color, p.dark, 1.5),
                      borderRadius: BorderRadius.circular(11),
                    ),
                    child: Icon(
                      it.done ? Icons.check_rounded : it.icon,
                      size: 19,
                      color: it.done ? Colors.white : it.color,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Bi(
                      it.label,
                      style: body(15, wght: 700, color: it.done ? p.inkSoft : p.ink)
                          .copyWith(
                              decoration:
                                  it.done ? TextDecoration.lineThrough : null),
                      maxLines: 2,
                    ),
                  ),
                  if (it.done)
                    Pill(S.planDone(AppScope.of(context).lang), color: Acc.success),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _PlanItem {
  final T label;
  final IconData icon;
  final Color color;
  final bool done;
  final VoidCallback onTap;
  _PlanItem(this.label, this.icon, this.color, this.done, this.onTap);
}

class _WeakSpots extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final ids = app.weakQuestionIds().take(4).toList();
    if (ids.isEmpty) {
      return Column(
        children: [
          Heading(S.yourWeakSpots),
          const EmptyNote(S.noWeakSpots),
        ],
      );
    }
    final p = paletteOf(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Heading(
          S.yourWeakSpots,
          trailing: TextButton(
            onPressed: () => openQuiz(context, QuizMode.weak, color: Acc.coral),
            child: Text(S.modeWeak(app.lang),
                style: body(13.5, wght: 800, color: Acc.coral)),
          ),
        ),
        for (final id in ids)
          if (Curriculum.question(id) != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: TapCard(
                radius: rMd,
                padding: const EdgeInsets.all(14),
                onTap: () {
                  final q = Curriculum.question(id)!;
                  final ch = Curriculum.chapterOfSection(q.sectionId);
                  if (ch != null) {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (_) =>
                          ChapterReader(chapter: ch, focusSection: q.sectionId),
                    ));
                  }
                },
                child: Row(
                  children: [
                    if (Curriculum.question(id)!.signId != null) ...[
                      SignView(
                          Curriculum.sign(Curriculum.question(id)!.signId!)!,
                          size: 40),
                      const SizedBox(width: 12),
                    ] else ...[
                      const Icon(Icons.error_outline_rounded, color: Acc.coral),
                      const SizedBox(width: 12),
                    ],
                    Expanded(
                      child: Bi(Curriculum.question(id)!.prompt,
                          style: body(14, wght: 700, color: p.ink), maxLines: 2),
                    ),
                  ],
                ),
              ),
            ),
        const SizedBox(height: 4),
        TextButton(
          onPressed: () => RootShell.go(context, 2),
          child: Text(S.practiceHub(app.lang),
              style: body(14, wght: 800, color: Acc.grape)),
        ),
      ],
    );
  }
}
