import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'core/l10n.dart';
import 'core/store.dart';
import 'core/theme.dart';
import 'ui/chapters_screen.dart';
import 'ui/home_screen.dart';
import 'ui/practice_screen.dart';
import 'ui/progress_screen.dart';
import 'ui/signs_screen.dart';
import 'ui/widgets/common.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final state = await AppState.load();
  runApp(KompisApp(state: state));
}

class KompisApp extends StatelessWidget {
  final AppState state;
  const KompisApp({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    return AppScope(
      state: state,
      child: Builder(
        builder: (context) {
          final app = AppScope.of(context);
          final p = app.darkMode ? Palette.night : Palette.light;
          SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: p.dark ? Brightness.light : Brightness.dark,
            systemNavigationBarColor: p.bg,
            systemNavigationBarIconBrightness:
                p.dark ? Brightness.light : Brightness.dark,
          ));
          return MaterialApp(
            title: 'Körkortskompis',
            debugShowCheckedModeBanner: false,
            theme: buildTheme(p),
            home: const RootShell(),
          );
        },
      ),
    );
  }
}

class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => RootShellState();

  /// Lets any screen jump to another tab — "practise this chapter" and
  /// "back to the section" both rely on it.
  static void go(BuildContext context, int index) =>
      context.findAncestorStateOfType<RootShellState>()?.select(index);
}

class RootShellState extends State<RootShell> {
  int _index = 0;
  final _keys = List.generate(5, (_) => GlobalKey<NavigatorState>());

  void select(int i) {
    if (i == _index) {
      _keys[i].currentState?.popUntil((r) => r.isFirst);
    } else {
      setState(() => _index = i);
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final pages = [
      const HomeScreen(),
      const ChaptersScreen(),
      const PracticeScreen(),
      const SignsScreen(),
      const ProgressScreen(),
    ];
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (didPop) return;
        final nav = _keys[_index].currentState;
        if (nav != null && nav.canPop()) {
          nav.pop();
        } else if (_index != 0) {
          setState(() => _index = 0);
        }
      },
      child: Scaffold(
        backgroundColor: p.bg,
        body: Stack(
          children: [
            IndexedStack(
              index: _index,
              children: [
                for (var i = 0; i < pages.length; i++)
                  Navigator(
                    key: _keys[i],
                    onGenerateRoute: (s) =>
                        MaterialPageRoute(builder: (_) => pages[i], settings: s),
                  ),
              ],
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: _NavBar(index: _index, onTap: select),
            ),
          ],
        ),
      ),
    );
  }
}

class _NavBar extends StatelessWidget {
  final int index;
  final ValueChanged<int> onTap;

  const _NavBar({required this.index, required this.onTap});

  static const _items = <(IconData, T, Color)>[
    (Icons.cottage_rounded, S.navHome, Acc.honey),
    (Icons.menu_book_rounded, S.navChapters, Acc.grape),
    (Icons.bolt_rounded, S.navPractice, Acc.coral),
    (Icons.signpost_rounded, S.navSigns, Acc.mint),
    (Icons.insights_rounded, S.navProgress, Acc.sky),
  ];

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return Container(
      margin: EdgeInsets.fromLTRB(
          14, 0, 14, 10 + MediaQuery.of(context).padding.bottom * 0.35),
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 7),
      decoration: BoxDecoration(
        color: p.surface,
        borderRadius: rXl,
        border: Border.all(color: p.border, width: 1.5),
        boxShadow: [
          BoxShadow(
            color: p.dark ? const Color(0x55000000) : const Color(0x1FA05B2E),
            blurRadius: 26,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          for (var i = 0; i < _items.length; i++)
            _NavItem(
              icon: _items[i].$1,
              label: _items[i].$2(app.lang),
              color: _items[i].$3,
              selected: i == index,
              onTap: () => onTap(i),
            ),
        ],
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final bool selected;
  final VoidCallback onTap;

  const _NavItem({
    required this.icon,
    required this.label,
    required this.color,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Expanded(
      child: InkWell(
        borderRadius: rMd,
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 220),
          curve: Curves.easeOut,
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: selected ? tint(color, p.dark, 1.5) : Colors.transparent,
            borderRadius: rMd,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon,
                  size: 23,
                  color: selected
                      ? (p.dark ? color : Color.lerp(color, p.ink, 0.25))
                      : p.inkSoft),
              const SizedBox(height: 3),
              Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: body(10.5,
                    wght: selected ? 800 : 600,
                    color: selected
                        ? (p.dark ? color : Color.lerp(color, p.ink, 0.25))
                        : p.inkSoft),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
