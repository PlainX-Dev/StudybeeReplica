import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'widgets/common.dart';

class ChaptersScreen extends StatelessWidget {
  const ChaptersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final chapters = Curriculum.chapters;
    final readTotal = app.readSections.length;

    return Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 120),
          children: [
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(S.allChapters(app.lang),
                          style: display(28, wght: 600, color: p.ink)),
                      const SizedBox(height: 4),
                      Text(
                        '$readTotal / ${Curriculum.sections.length} ${S.sectionsLabel(app.lang)}',
                        style: body(14, wght: 700, color: p.inkSoft),
                      ),
                    ],
                  ),
                ),
                Ring(
                  value: Curriculum.sections.isEmpty
                      ? 0
                      : readTotal / Curriculum.sections.length,
                  size: 58,
                  color: Acc.grape,
                  child: Text(
                    '${(readTotal / Curriculum.sections.length * 100).round()}%',
                    style: body(12, wght: 800, color: p.ink),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            for (var i = 0; i < chapters.length; i++)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Appear(index: i, child: _ChapterTile(chapter: chapters[i])),
              ),
          ],
        ),
      ),
    );
  }
}

class _ChapterTile extends StatelessWidget {
  final Chapter chapter;
  const _ChapterTile({required this.chapter});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final accent = Acc.at(chapter.colorIndex);
    final read = chapter.sections.where((s) => app.hasRead(s.id)).length;
    final progress = read / chapter.sections.length;
    final qs = Curriculum.questionsForChapter(chapter.id);
    final answered = qs.where((q) => app.questions.containsKey(q.id)).length;

    return TapCard(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => ChapterReader(chapter: chapter)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 52,
            height: 52,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: tint(accent, p.dark, 1.5),
              borderRadius: rSm,
            ),
            child: Icon(chapter.icon, color: accent, size: 26),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text('${chapter.number}',
                        style: body(12, wght: 800, color: accent)),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        chapter.title(app.lang),
                        style: display(17, wght: 600, color: p.ink, height: 1.15),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                if (app.showBoth) ...[
                  const SizedBox(height: 2),
                  Text(
                    chapter.title.other(app.lang),
                    style: body(12.5, wght: 500, color: p.inkSoft),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(99),
                        child: LinearProgressIndicator(
                          value: progress,
                          minHeight: 7,
                          backgroundColor: p.border,
                          valueColor: AlwaysStoppedAnimation(accent),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Text('$read/${chapter.sections.length}',
                        style: body(12, wght: 800, color: p.inkSoft)),
                  ],
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    Pill('${chapter.minutes} ${S.minRead(app.lang)}',
                        color: accent, icon: Icons.schedule_rounded, fontSize: 11),
                    Pill('$answered/${qs.length}',
                        color: Acc.sky, icon: Icons.quiz_rounded, fontSize: 11),
                    if (progress >= 1)
                      Pill(S.chapterDone(app.lang),
                          color: Acc.success, icon: Icons.check_rounded, fontSize: 11),
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
