import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'quiz_screen.dart';
import 'widgets/common.dart';

class ChapterReader extends StatefulWidget {
  final Chapter chapter;
  final String? focusSection;

  const ChapterReader({super.key, required this.chapter, this.focusSection});

  @override
  State<ChapterReader> createState() => _ChapterReaderState();
}

class _ChapterReaderState extends State<ChapterReader> {
  late final Set<String> _open = {
    if (widget.focusSection != null) widget.focusSection!,
  };
  final _keys = <String, GlobalKey>{};

  Color get _accent => Acc.at(widget.chapter.colorIndex);

  @override
  void initState() {
    super.initState();
    for (final s in widget.chapter.sections) {
      _keys[s.id] = GlobalKey();
    }
    if (widget.focusSection != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final key = _keys[widget.focusSection!];
        if (key?.currentContext != null) {
          Scrollable.ensureVisible(key!.currentContext!,
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeOutCubic,
              alignment: 0.06);
        }
        AppScope.read(context).markRead(widget.focusSection!);
      });
    }
  }

  void _toggle(String id) {
    setState(() {
      if (_open.contains(id)) {
        _open.remove(id);
      } else {
        _open.add(id);
        AppScope.read(context).markRead(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final ch = widget.chapter;
    final readCount = ch.sections.where((s) => app.hasRead(s.id)).length;

    return Scaffold(
      backgroundColor: p.bg,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            expandedHeight: 188,
            backgroundColor: p.bg,
            surfaceTintColor: Colors.transparent,
            iconTheme: IconThemeData(color: p.ink),
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.fromLTRB(56, 0, 16, 14),
              title: Text(
                ch.title(app.lang),
                style: display(17, wght: 600, color: p.ink),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              // Laid out at full height and clipped as the bar collapses,
              // rather than being squeezed into an impossible box.
              background: ClipRect(
                child: OverflowBox(
                  alignment: Alignment.topCenter,
                  minHeight: 188,
                  maxHeight: 188,
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(20, 78, 20, 62),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [tint(_accent, p.dark, 1.6), p.bg],
                      ),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(ch.icon, color: _accent, size: 26),
                        const SizedBox(width: 8),
                        Text('${S.chapter(app.lang)} ${ch.number}',
                            style: body(13, wght: 800, color: _accent)),
                        const Spacer(),
                        Pill(
                            '$readCount/${ch.sections.length} ${S.sectionsLabel(app.lang)}',
                            color: _accent),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
            sliver: SliverList.list(
              children: [
                Bi(ch.summary, style: body(15, wght: 600, color: p.inkSoft, height: 1.5)),
                const SizedBox(height: 18),
                for (var i = 0; i < ch.sections.length; i++)
                  Padding(
                    key: _keys[ch.sections[i].id],
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _SectionCard(
                      section: ch.sections[i],
                      index: i + 1,
                      accent: _accent,
                      open: _open.contains(ch.sections[i].id),
                      read: app.hasRead(ch.sections[i].id),
                      highlight: ch.sections[i].id == widget.focusSection,
                      onToggle: () => _toggle(ch.sections[i].id),
                    ),
                  ),
                const SizedBox(height: 8),
                BigButton(
                  S.testChapter(app.lang),
                  color: _accent,
                  icon: Icons.bolt_rounded,
                  onTap: () => openQuiz(context, QuizMode.chapter,
                      chapterId: ch.id, title: ch.title, color: _accent),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final Section section;
  final int index;
  final Color accent;
  final bool open;
  final bool read;
  final bool highlight;
  final VoidCallback onToggle;

  const _SectionCard({
    required this.section,
    required this.index,
    required this.accent,
    required this.open,
    required this.read,
    required this.highlight,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      decoration: cardDeco(
        p,
        borderColor: highlight ? accent : (open ? accent.withValues(alpha: 0.5) : p.border),
        color: highlight ? tint(accent, p.dark, 0.5) : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          InkWell(
            borderRadius: rLg,
            onTap: onToggle,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 12, 16),
              child: Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: read ? accent : tint(accent, p.dark, 1.4),
                      borderRadius: BorderRadius.circular(11),
                    ),
                    child: read
                        ? Icon(Icons.check_rounded, size: 19, color: onAccent(accent))
                        : Text('$index',
                            style: body(14, wght: 800, color: p.dark ? accent : Color.lerp(accent, p.ink, 0.3))),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Bi(section.title,
                        style: display(17, wght: 600, color: p.ink, height: 1.2)),
                  ),
                  AnimatedRotation(
                    turns: open ? 0.5 : 0,
                    duration: const Duration(milliseconds: 220),
                    child: Icon(Icons.expand_more_rounded, color: p.inkSoft),
                  ),
                ],
              ),
            ),
          ),
          AnimatedCrossFade(
            firstChild: const SizedBox(width: double.infinity),
            secondChild: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final b in section.blocks) BlockView(block: b, accent: accent),
                ],
              ),
            ),
            crossFadeState:
                open ? CrossFadeState.showSecond : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 240),
            sizeCurve: Curves.easeOutCubic,
          ),
        ],
      ),
    );
  }
}

/// Renders one content block. This is where the chapters get their texture.
class BlockView extends StatelessWidget {
  final Block block;
  final Color accent;

  const BlockView({super.key, required this.block, required this.accent});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);

    Widget wrap(Widget child) =>
        Padding(padding: const EdgeInsets.only(bottom: 14), child: child);

    switch (block) {
      case Para(:final text):
        return wrap(Bi(text, style: body(15.5, color: p.ink, height: 1.55)));

      case Head(:final text):
        return wrap(Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Bi(text, style: display(16.5, wght: 600, color: p.ink)),
        ));

      case Bullets(:final items):
        return wrap(Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final it in items)
              Padding(
                padding: const EdgeInsets.only(bottom: 9),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 7, right: 10),
                      child: Container(
                        width: 7,
                        height: 7,
                        decoration:
                            BoxDecoration(color: accent, shape: BoxShape.circle),
                      ),
                    ),
                    Expanded(
                        child: Bi(it, style: body(15, color: p.ink, height: 1.5))),
                  ],
                ),
              ),
          ],
        ));

      case Steps(:final items):
        return wrap(Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var i = 0; i < items.length; i++)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 24,
                      height: 24,
                      alignment: Alignment.center,
                      margin: const EdgeInsets.only(right: 10, top: 2),
                      decoration: BoxDecoration(
                        color: tint(accent, p.dark, 1.5),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text('${i + 1}',
                          style: body(12,
                              wght: 800,
                              color: p.dark ? accent : Color.lerp(accent, p.ink, 0.3))),
                    ),
                    Expanded(
                        child: Bi(items[i], style: body(15, color: p.ink, height: 1.5))),
                  ],
                ),
              ),
          ],
        ));

      case Facts(:final rows, :final title):
        return wrap(Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: tint(Acc.honey, p.dark, 1.2),
            borderRadius: rMd,
            border: Border.all(color: Acc.honey.withValues(alpha: 0.45), width: 1.5),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.bolt_rounded, size: 19, color: Acc.honey),
                  const SizedBox(width: 6),
                  Text((title ?? S.keyFacts)(app.lang),
                      style: body(12.5, wght: 800, color: p.inkSoft, spacing: 0.6)),
                ],
              ),
              const SizedBox(height: 10),
              for (final r in rows)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        flex: 5,
                        child: Bi(r.$1, style: body(14, wght: 600, color: p.inkSoft, height: 1.4)),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        flex: 4,
                        child: Bi(r.$2,
                            style: body(14.5, wght: 800, color: p.ink, height: 1.4),
                            align: TextAlign.right),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ));

      case LawBox(:final ref, :final text):
        return wrap(Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: p.surfaceAlt,
            borderRadius: rMd,
            border: Border(left: BorderSide(color: Acc.grape, width: 4)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.gavel_rounded, size: 17, color: Acc.grape),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Bi(ref, style: body(12.5, wght: 800, color: Acc.grape)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Bi(text,
                  style: body(14.5, wght: 500, color: p.ink, height: 1.5)
                      .copyWith(fontStyle: FontStyle.italic)),
            ],
          ),
        ));

      case Hook(:final text):
        return wrap(Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: tint(Acc.mint, p.dark, 1.2),
            borderRadius: rMd,
            border: Border.all(color: Acc.mint.withValues(alpha: 0.45), width: 1.5),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.only(right: 10, top: 2),
                child: Icon(Icons.psychology_alt_rounded, size: 20, color: Acc.mint),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(S.memoryHook(app.lang),
                        style: body(12.5, wght: 800, color: p.inkSoft, spacing: 0.6)),
                    const SizedBox(height: 6),
                    Bi(text, style: body(14.5, wght: 600, color: p.ink, height: 1.5)),
                  ],
                ),
              ),
            ],
          ),
        ));

      case Trap(:final text):
        return wrap(Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: tint(Acc.coral, p.dark, 1.2),
            borderRadius: rMd,
            border: Border.all(color: Acc.coral.withValues(alpha: 0.5), width: 1.5),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.only(right: 10, top: 2),
                child: Icon(Icons.error_rounded, size: 20, color: Acc.coral),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(S.watchOut(app.lang),
                        style: body(12.5, wght: 800, color: p.inkSoft, spacing: 0.6)),
                    const SizedBox(height: 6),
                    Bi(text, style: body(14.5, wght: 600, color: p.ink, height: 1.5)),
                  ],
                ),
              ),
            ],
          ),
        ));

      case SignRow(:final ids, :final caption):
        final signs = [
          for (final id in ids)
            if (Curriculum.sign(id) != null) Curriculum.sign(id)!,
        ];
        if (signs.isEmpty) return const SizedBox.shrink();
        return wrap(Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height: 108,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: signs.length,
                separatorBuilder: (_, __) => const SizedBox(width: 10),
                itemBuilder: (_, i) => _SignChip(sign: signs[i]),
              ),
            ),
            if (caption != null) ...[
              const SizedBox(height: 8),
              Bi(caption, style: body(13, wght: 600, color: p.inkSoft)),
            ],
          ],
        ));

      case TableBlock(:final headers, :final rows):
        return wrap(Container(
          decoration: BoxDecoration(
            color: p.surfaceAlt,
            borderRadius: rMd,
            border: Border.all(color: p.border, width: 1.5),
          ),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(12, 10, 12, 8),
                child: Row(
                  children: [
                    for (final h in headers)
                      Expanded(
                        child: Text(h(app.lang),
                            style: body(12, wght: 800, color: p.inkSoft, spacing: 0.4)),
                      ),
                  ],
                ),
              ),
              for (var i = 0; i < rows.length; i++)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  decoration: BoxDecoration(
                    color: i.isEven ? p.surface.withValues(alpha: 0.55) : null,
                    borderRadius: i == rows.length - 1
                        ? const BorderRadius.vertical(bottom: Radius.circular(18))
                        : null,
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (final cell in rows[i])
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(right: 6),
                            child: Bi(cell,
                                style: body(13.5, wght: 600, color: p.ink, height: 1.4)),
                          ),
                        ),
                    ],
                  ),
                ),
            ],
          ),
        ));
    }
  }
}

class _SignChip extends StatelessWidget {
  final RoadSign sign;
  const _SignChip({required this.sign});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return GestureDetector(
      onTap: () => showSignSheet(context, sign),
      child: SizedBox(
        width: 92,
        child: Column(
          children: [
            SignView(sign, size: 68),
            const SizedBox(height: 6),
            Text(
              sign.name(app.lang),
              maxLines: 2,
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
              style: body(10.5, wght: 700, color: p.inkSoft, height: 1.2),
            ),
          ],
        ),
      ),
    );
  }
}

/// Sheet with the full meaning of a sign, reachable from anywhere a sign appears.
void showSignSheet(BuildContext context, RoadSign sign) {
  final p = paletteOf(context);
  final app = AppScope.read(context);
  showModalBottomSheet(
    context: context,
    backgroundColor: p.surface,
    isScrollControlled: true,
    builder: (_) => Padding(
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 34),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 42,
            height: 5,
            decoration:
                BoxDecoration(color: p.border, borderRadius: BorderRadius.circular(3)),
          ),
          const SizedBox(height: 18),
          SignView(sign, size: 150),
          const SizedBox(height: 16),
          Bi(sign.name,
              style: display(21, wght: 600, color: p.ink), align: TextAlign.center),
          const SizedBox(height: 10),
          Bi(sign.meaning,
              style: body(15, wght: 600, color: p.inkSoft, height: 1.5),
              align: TextAlign.center),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: [
              Pill(sign.cat.label(app.lang), color: Acc.mint),
              if (RegExp(r'^[A-EX]\d').hasMatch(sign.id)) Pill(sign.id, color: Acc.grape),
            ],
          ),
        ],
      ),
    ),
  );
}
