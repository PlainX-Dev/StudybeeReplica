import 'package:flutter/material.dart';

import '../core/l10n.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../data/curriculum.dart';
import 'widgets/common.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);

    return Scaffold(
      backgroundColor: p.bg,
      appBar: AppBar(title: Text(S.settings(app.lang))),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 40),
        children: [
          _Group(
            title: S.language,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    for (final l in Lang.values)
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: _Choice(
                            label: '${l.flag}  ${l.label}',
                            selected: app.lang == l,
                            onTap: () => app.setLang(l),
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                Bi(S.languageHint, style: body(12.5, wght: 600, color: p.inkSoft)),
                const SizedBox(height: 14),
                _SwitchRow(
                  title: S.showBothLanguages,
                  subtitle: S.showBothHint,
                  value: app.showBoth,
                  onChanged: app.setShowBoth,
                ),
              ],
            ),
          ),
          _Group(
            title: S.examDate,
            child: Column(
              children: [
                _Row(
                  icon: Icons.event_rounded,
                  color: Acc.coral,
                  title: S.examDate,
                  trailing: Text(
                    app.examDay == null
                        ? '—'
                        : '${dateOfDay(app.examDay!).day}/${dateOfDay(app.examDay!).month}/${dateOfDay(app.examDay!).year}',
                    style: body(14, wght: 800, color: p.ink),
                  ),
                  onTap: () async {
                    final now = DateTime.now();
                    final picked = await showDatePicker(
                      context: context,
                      initialDate: app.examDay == null
                          ? now.add(const Duration(days: 30))
                          : dateOfDay(app.examDay!),
                      firstDate: now.subtract(const Duration(days: 1)),
                      lastDate: now.add(const Duration(days: 730)),
                    );
                    if (picked != null) app.setExamDate(picked);
                  },
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: Bi(S.dailyGoal,
                          style: body(15, wght: 700, color: p.ink)),
                    ),
                    Pill('${app.dailyGoal}', color: Acc.honey),
                  ],
                ),
                Slider(
                  value: app.dailyGoal.toDouble(),
                  min: 5,
                  max: 100,
                  divisions: 19,
                  onChanged: (v) => app.setDailyGoal(v.round()),
                ),
              ],
            ),
          ),
          _Group(
            title: const T('Utseende', 'Appearance'),
            child: _SwitchRow(
              title: S.darkMode,
              subtitle: const T('Skonsammare för ögonen på kvällen',
                  'Easier on the eyes at night'),
              value: app.darkMode,
              onChanged: app.setDark,
            ),
          ),
          _Group(
            title: const T('Innehåll', 'Content'),
            child: Column(
              children: [
                _InfoRow(
                    label: const T('Kapitel', 'Chapters'),
                    value: '${Curriculum.chapters.length}'),
                _InfoRow(
                    label: const T('Avsnitt', 'Sections'),
                    value: '${Curriculum.sections.length}'),
                _InfoRow(
                    label: const T('Frågor', 'Questions'),
                    value: '${Curriculum.questions.length}'),
                _InfoRow(
                    label: const T('Vägmärken', 'Road signs'),
                    value: '${Curriculum.signs.length}'),
                _InfoRow(
                    label: const T('Minneskort', 'Flashcards'),
                    value: '${Curriculum.flashcards.length}'),
              ],
            ),
          ),
          _Group(
            title: S.about,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Bee(size: 44),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Körkortskompis',
                              style: display(19, wght: 600, color: p.ink)),
                          Bi(S.appTagline,
                              style: body(12.5, wght: 600, color: p.inkSoft)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Bi(S.aboutBody,
                    style: body(13, wght: 500, color: p.inkSoft, height: 1.5)),
              ],
            ),
          ),
          const SizedBox(height: 8),
          TextButton.icon(
            onPressed: () async {
              final ok = await showDialog<bool>(
                context: context,
                builder: (_) => AlertDialog(
                  title: Text(S.resetConfirm(app.lang),
                      style: display(20, wght: 600, color: p.ink)),
                  content: Text(S.resetBody(app.lang),
                      style: body(15, color: p.inkSoft)),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: Text(S.cancel(app.lang),
                          style: body(15, wght: 700, color: p.inkSoft)),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context, true),
                      child: Text(S.reset(app.lang),
                          style: body(15, wght: 800, color: Acc.danger)),
                    ),
                  ],
                ),
              );
              if (ok == true) await app.resetAll();
            },
            icon: const Icon(Icons.restart_alt_rounded, color: Acc.danger),
            label: Text(S.resetProgress(app.lang),
                style: body(15, wght: 800, color: Acc.danger)),
          ),
        ],
      ),
    );
  }
}

class _Group extends StatelessWidget {
  final T title;
  final Widget child;
  const _Group({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Heading(title),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: cardDeco(p),
          child: child,
        ),
      ],
    );
  }
}

class _Choice extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _Choice({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: rMd,
        onTap: onTap,
        child: Container(
          height: 50,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: selected ? tint(Acc.honey, p.dark, 1.5) : p.surfaceAlt,
            borderRadius: rMd,
            border: Border.all(
                color: selected ? Acc.honey : p.border, width: selected ? 2 : 1.5),
          ),
          child: Text(label,
              style: body(15, wght: 800, color: selected ? p.ink : p.inkSoft)),
        ),
      ),
    );
  }
}

class _SwitchRow extends StatelessWidget {
  final T title;
  final T subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _SwitchRow({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Bi(title, style: body(15, wght: 700, color: p.ink)),
              const SizedBox(height: 2),
              Bi(subtitle, style: body(12.5, wght: 600, color: p.inkSoft)),
            ],
          ),
        ),
        Switch(
          value: value,
          activeThumbColor: Colors.white,
          activeTrackColor: Acc.honey,
          onChanged: onChanged,
        ),
      ],
    );
  }
}

class _Row extends StatelessWidget {
  final IconData icon;
  final Color color;
  final T title;
  final Widget trailing;
  final VoidCallback onTap;

  const _Row({
    required this.icon,
    required this.color,
    required this.title,
    required this.trailing,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return InkWell(
      borderRadius: rSm,
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(width: 12),
            Expanded(child: Bi(title, style: body(15, wght: 700, color: p.ink))),
            trailing,
            const SizedBox(width: 4),
            Icon(Icons.chevron_right_rounded, color: p.inkSoft, size: 20),
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final T label;
  final String value;
  const _InfoRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        children: [
          Expanded(child: Bi(label, style: body(14.5, wght: 600, color: p.inkSoft))),
          Text(value, style: body(15, wght: 800, color: p.ink)),
        ],
      ),
    );
  }
}
