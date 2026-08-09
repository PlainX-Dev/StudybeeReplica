import 'package:flutter/material.dart';

/// Warm, rounded, high-energy. Nothing grey unless it is doing a job.
class Palette {
  final bool dark;
  final Color bg;
  final Color surface;
  final Color surfaceAlt;
  final Color ink;
  final Color inkSoft;
  final Color border;
  final Color shadow;

  const Palette({
    required this.dark,
    required this.bg,
    required this.surface,
    required this.surfaceAlt,
    required this.ink,
    required this.inkSoft,
    required this.border,
    required this.shadow,
  });

  static const light = Palette(
    dark: false,
    bg: Color(0xFFFFF7F0),
    surface: Colors.white,
    surfaceAlt: Color(0xFFFFF0E3),
    ink: Color(0xFF241B33),
    inkSoft: Color(0xFF6E6685),
    border: Color(0xFFF2E3D6),
    shadow: Color(0x14A05B2E),
  );

  static const night = Palette(
    dark: true,
    bg: Color(0xFF15111F),
    surface: Color(0xFF221C33),
    surfaceAlt: Color(0xFF2C2544),
    ink: Color(0xFFF6EFFF),
    inkSoft: Color(0xFFA79FC0),
    border: Color(0xFF352C50),
    shadow: Color(0x33000000),
  );
}

/// The happy accent set. Chapters, decks and cards pick from here so the whole
/// app reads as one cheerful family instead of a random colour soup.
class Acc {
  static const honey = Color(0xFFFFB020);
  static const coral = Color(0xFFFF6B6B);
  static const mint = Color(0xFF17C3B2);
  static const sky = Color(0xFF3AA9F5);
  static const grape = Color(0xFF8A5CF6);
  static const leaf = Color(0xFF4CC38A);
  static const pink = Color(0xFFFF6FB5);
  static const tangerine = Color(0xFFFF8A3D);
  static const berry = Color(0xFFE0457B);
  static const ocean = Color(0xFF2C7DF7);

  static const all = <Color>[
    honey, coral, mint, sky, grape, leaf, pink, tangerine, berry, ocean,
  ];

  static const success = Color(0xFF2FBF71);
  static const danger = Color(0xFFFF4D6D);
  static const warn = Color(0xFFFFA41B);

  static Color at(int i) => all[i % all.length];
}

/// Softer companion of an accent, for chips and tinted backgrounds.
Color tint(Color c, bool dark, [double strength = 1]) => dark
    ? Color.alphaBlend(c.withValues(alpha: 0.20 * strength), const Color(0xFF221C33))
    : Color.alphaBlend(c.withValues(alpha: 0.14 * strength), Colors.white);

/// Readable ink on top of a filled accent.
Color onAccent(Color c) =>
    c.computeLuminance() > 0.55 ? const Color(0xFF241B33) : Colors.white;

// ── Type ───────────────────────────────────────────────────────────────────
// Both families are variable fonts, so weight comes from the `wght` axis.

TextStyle display(double size,
        {double wght = 600, Color? color, double height = 1.15, double? spacing}) =>
    TextStyle(
      fontFamily: 'Fredoka',
      fontSize: size,
      height: height,
      color: color,
      letterSpacing: spacing,
      fontVariations: [FontVariation('wght', wght)],
    );

TextStyle body(double size,
        {double wght = 400, Color? color, double height = 1.45, double? spacing}) =>
    TextStyle(
      fontFamily: 'Nunito',
      fontSize: size,
      height: height,
      color: color,
      letterSpacing: spacing,
      fontVariations: [FontVariation('wght', wght)],
    );

// ── Shapes ─────────────────────────────────────────────────────────────────

const rSm = BorderRadius.all(Radius.circular(14));
const rMd = BorderRadius.all(Radius.circular(20));
const rLg = BorderRadius.all(Radius.circular(28));
const rXl = BorderRadius.all(Radius.circular(34));

List<BoxShadow> softShadow(Palette p, {double y = 8, double blur = 22}) => [
      BoxShadow(color: p.shadow, offset: Offset(0, y), blurRadius: blur),
    ];

/// The card look used almost everywhere.
BoxDecoration cardDeco(Palette p,
        {Color? color, BorderRadius radius = rLg, Color? borderColor, bool shadow = true}) =>
    BoxDecoration(
      color: color ?? p.surface,
      borderRadius: radius,
      border: Border.all(color: borderColor ?? p.border, width: 1.5),
      boxShadow: shadow ? softShadow(p) : null,
    );

LinearGradient accentGradient(Color c) => LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        Color.lerp(c, Colors.white, 0.18)!,
        Color.lerp(c, const Color(0xFF7A2BE0), 0.12)!,
      ],
    );

ThemeData buildTheme(Palette p) {
  final scheme = ColorScheme.fromSeed(
    seedColor: Acc.honey,
    brightness: p.dark ? Brightness.dark : Brightness.light,
    surface: p.surface,
  );
  return ThemeData(
    useMaterial3: true,
    brightness: p.dark ? Brightness.dark : Brightness.light,
    colorScheme: scheme.copyWith(surface: p.surface),
    scaffoldBackgroundColor: p.bg,
    fontFamily: 'Nunito',
    splashFactory: InkSparkle.splashFactory,
    appBarTheme: AppBarTheme(
      backgroundColor: p.bg,
      surfaceTintColor: Colors.transparent,
      foregroundColor: p.ink,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: display(22, wght: 600, color: p.ink),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: p.surface,
      shape: const RoundedRectangleBorder(borderRadius: rLg),
    ),
    bottomSheetTheme: BottomSheetThemeData(
      backgroundColor: p.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
      ),
    ),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: p.ink,
      contentTextStyle: body(15, wght: 600, color: p.bg),
      shape: const RoundedRectangleBorder(borderRadius: rMd),
      behavior: SnackBarBehavior.floating,
    ),
    sliderTheme: SliderThemeData(
      activeTrackColor: Acc.honey,
      inactiveTrackColor: p.border,
      thumbColor: Acc.honey,
      overlayColor: Acc.honey.withValues(alpha: 0.18),
    ),
  );
}
