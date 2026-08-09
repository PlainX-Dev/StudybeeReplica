import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import '../models/content.dart';
import 'chapter_reader.dart';
import 'quiz_screen.dart';
import 'widgets/common.dart';

class SignsScreen extends StatefulWidget {
  const SignsScreen({super.key});

  @override
  State<SignsScreen> createState() => _SignsScreenState();
}

class _SignsScreenState extends State<SignsScreen> {
  String _query = '';
  SignCat? _cat;

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    final q = _query.trim().toLowerCase();
    final signs = Curriculum.signs.where((s) {
      if (_cat != null && s.cat != _cat) return false;
      if (q.isEmpty) return true;
      return s.name.sv.toLowerCase().contains(q) ||
          s.name.en.toLowerCase().contains(q) ||
          s.meaning.sv.toLowerCase().contains(q) ||
          s.meaning.en.toLowerCase().contains(q) ||
          s.id.toLowerCase().contains(q);
    }).toList();

    return Scaffold(
      backgroundColor: p.bg,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(S.navSigns(app.lang),
                            style: display(28, wght: 600, color: p.ink)),
                        const SizedBox(height: 2),
                        Text('${Curriculum.signs.length} ${S.signsCount(app.lang)}',
                            style: body(13.5, wght: 700, color: p.inkSoft)),
                      ],
                    ),
                  ),
                  IconButton.filled(
                    style: IconButton.styleFrom(backgroundColor: Acc.sky),
                    icon: const Icon(Icons.bolt_rounded, color: Colors.white),
                    onPressed: () => openQuiz(context, QuizMode.signs, color: Acc.sky),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 10),
              child: TextField(
                onChanged: (v) => setState(() => _query = v),
                style: body(15, wght: 600, color: p.ink),
                decoration: InputDecoration(
                  hintText: S.searchSigns(app.lang),
                  hintStyle: body(15, wght: 600, color: p.inkSoft),
                  prefixIcon: Icon(Icons.search_rounded, color: p.inkSoft),
                  filled: true,
                  fillColor: p.surface,
                  contentPadding: const EdgeInsets.symmetric(vertical: 4),
                  border: OutlineInputBorder(
                    borderRadius: rMd,
                    borderSide: BorderSide(color: p.border, width: 1.5),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: rMd,
                    borderSide: BorderSide(color: p.border, width: 1.5),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: rMd,
                    borderSide: const BorderSide(color: Acc.sky, width: 2),
                  ),
                ),
              ),
            ),
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _CatChip(
                    label: S.allSigns(app.lang),
                    selected: _cat == null,
                    onTap: () => setState(() => _cat = null),
                  ),
                  for (final c in SignCat.values)
                    _CatChip(
                      label: c.label(app.lang),
                      selected: _cat == c,
                      onTap: () => setState(() => _cat = c),
                    ),
                ],
              ),
            ),
            Expanded(
              child: signs.isEmpty
                  ? const EmptyNote(S.noSignsFound)
                  : GridView.builder(
                      padding: const EdgeInsets.fromLTRB(16, 14, 16, 120),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 3,
                        mainAxisSpacing: 12,
                        crossAxisSpacing: 12,
                        childAspectRatio: 0.78,
                      ),
                      itemCount: signs.length,
                      itemBuilder: (_, i) => _SignCard(sign: signs[i]),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CatChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _CatChip({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: rSm,
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
            decoration: BoxDecoration(
              color: selected ? Acc.sky : p.surface,
              borderRadius: rSm,
              border: Border.all(
                  color: selected ? Acc.sky : p.border, width: 1.5),
            ),
            child: Text(
              label,
              style: body(13, wght: 800, color: selected ? Colors.white : p.inkSoft),
            ),
          ),
        ),
      ),
    );
  }
}

class _SignCard extends StatelessWidget {
  final RoadSign sign;
  const _SignCard({required this.sign});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return TapCard(
      radius: rMd,
      padding: const EdgeInsets.all(10),
      onTap: () => showSignSheet(context, sign),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(child: Center(child: SignView(sign, size: 66))),
          const SizedBox(height: 6),
          Text(
            sign.name(app.lang),
            maxLines: 2,
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            style: body(10.5, wght: 700, color: p.ink, height: 1.2),
          ),
        ],
      ),
    );
  }
}
