import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../core/l10n.dart';
import '../../core/store.dart';
import '../../core/theme.dart';
import '../../models/content.dart';

/// Reads the palette that matches the current setting.
Palette paletteOf(BuildContext context) =>
    AppScope.of(context).darkMode ? Palette.night : Palette.light;

/// Bilingual text. Shows the chosen language, and — when "show both" is on —
/// the other language underneath in quieter type. That second line is the
/// whole point of the app for someone taking a Swedish test in English.
class Bi extends StatelessWidget {
  final T text;
  final TextStyle style;
  final TextStyle? subStyle;
  final bool showOther;
  final TextAlign align;
  final int? maxLines;

  const Bi(
    this.text, {
    super.key,
    required this.style,
    this.subStyle,
    this.showOther = true,
    this.align = TextAlign.start,
    this.maxLines,
  });

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final p = paletteOf(context);
    final primary = text(app.lang);
    final secondary = text.other(app.lang);
    final showSecond =
        showOther && app.showBoth && secondary.trim() != primary.trim();

    if (!showSecond) {
      return Text(primary, style: style, textAlign: align, maxLines: maxLines,
          overflow: maxLines == null ? null : TextOverflow.ellipsis);
    }
    return Column(
      crossAxisAlignment:
          align == TextAlign.center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(primary, style: style, textAlign: align, maxLines: maxLines,
            overflow: maxLines == null ? null : TextOverflow.ellipsis),
        const SizedBox(height: 2),
        Text(
          secondary,
          style: subStyle ??
              body(max(11, style.fontSize! - 3), wght: 500, color: p.inkSoft, height: 1.3),
          textAlign: align,
          maxLines: maxLines,
          overflow: maxLines == null ? null : TextOverflow.ellipsis,
        ),
      ],
    );
  }
}

/// A road sign, drawn from its SVG with numerals painted on top.
class SignView extends StatelessWidget {
  final RoadSign sign;
  final double size;

  const SignView(this.sign, {super.key, this.size = 84});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        children: [
          SvgPicture.string(sign.svg, width: size, height: size),
          if (sign.overlay != null)
            Positioned.fill(
              child: Align(
                alignment: Alignment(0, sign.overlayDy * 2),
                child: Text(
                  sign.overlay!,
                  textAlign: TextAlign.center,
                  style: display(
                    size * sign.overlaySize,
                    wght: 600,
                    color: Color(sign.overlayColor),
                    height: 1.05,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// Circular progress with a soft track — used for chapter mastery and the
/// daily goal.
class Ring extends StatelessWidget {
  final double value;
  final double size;
  final double stroke;
  final Color color;
  final Widget? child;

  const Ring({
    super.key,
    required this.value,
    this.size = 56,
    this.stroke = 7,
    this.color = Acc.honey,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return SizedBox(
      width: size,
      height: size,
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: value.clamp(0.0, 1.0)),
        duration: const Duration(milliseconds: 700),
        curve: Curves.easeOutCubic,
        builder: (_, v, __) => CustomPaint(
          painter: _RingPainter(v, stroke, color, p.border),
          child: Center(child: child),
        ),
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  final double value;
  final double stroke;
  final Color color;
  final Color track;

  _RingPainter(this.value, this.stroke, this.color, this.track);

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset(stroke / 2, stroke / 2) &
        Size(size.width - stroke, size.height - stroke);
    final base = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..color = track;
    canvas.drawArc(rect, 0, 2 * pi, false, base);
    if (value <= 0) return;
    final arc = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..shader = SweepGradient(
        startAngle: -pi / 2,
        endAngle: 3 * pi / 2,
        colors: [color.withValues(alpha: 0.65), color],
      ).createShader(rect);
    canvas.drawArc(rect, -pi / 2, 2 * pi * value, false, arc);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.value != value || old.color != color || old.track != track;
}

/// Small rounded label.
class Pill extends StatelessWidget {
  final String label;
  final Color color;
  final IconData? icon;
  final double fontSize;

  const Pill(this.label, {super.key, this.color = Acc.honey, this.icon, this.fontSize = 12});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Container(
      padding: EdgeInsets.symmetric(horizontal: icon == null ? 10 : 8, vertical: 5),
      decoration: BoxDecoration(color: tint(color, p.dark, 1.4), borderRadius: rSm),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: fontSize + 3, color: p.dark ? color : Color.lerp(color, p.ink, 0.35)),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: body(fontSize,
                wght: 800, color: p.dark ? color : Color.lerp(color, p.ink, 0.35)),
          ),
        ],
      ),
    );
  }
}

/// The chunky primary action.
class BigButton extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;
  final Color color;
  final IconData? icon;
  final bool expand;

  const BigButton(
    this.label, {
    super.key,
    required this.onTap,
    this.color = Acc.honey,
    this.icon,
    this.expand = true,
  });

  @override
  Widget build(BuildContext context) {
    final enabled = onTap != null;
    final fg = onAccent(color);
    final child = Container(
      height: 58,
      padding: const EdgeInsets.symmetric(horizontal: 26),
      decoration: BoxDecoration(
        gradient: enabled ? accentGradient(color) : null,
        color: enabled ? null : paletteOf(context).border,
        borderRadius: rMd,
        boxShadow: enabled
            ? [BoxShadow(color: color.withValues(alpha: 0.35), blurRadius: 18, offset: const Offset(0, 8))]
            : null,
      ),
      child: Row(
        mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (icon != null) ...[
            Icon(icon, color: enabled ? fg : paletteOf(context).inkSoft, size: 22),
            const SizedBox(width: 10),
          ],
          Text(label,
              style: display(18,
                  wght: 600, color: enabled ? fg : paletteOf(context).inkSoft)),
        ],
      ),
    );
    return Material(
      color: Colors.transparent,
      child: InkWell(borderRadius: rMd, onTap: onTap, child: child),
    );
  }
}

/// Card with a tap target and the house shadow.
class TapCard extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsets padding;
  final Color? color;
  final Color? borderColor;
  final BorderRadius radius;

  const TapCard({
    super.key,
    required this.child,
    this.onTap,
    this.padding = const EdgeInsets.all(18),
    this.color,
    this.borderColor,
    this.radius = rLg,
  });

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Material(
      color: Colors.transparent,
      child: Ink(
        decoration:
            cardDeco(p, color: color, radius: radius, borderColor: borderColor),
        child: InkWell(
          borderRadius: radius,
          onTap: onTap,
          child: Padding(padding: padding, child: child),
        ),
      ),
    );
  }
}

/// Section title with an optional trailing action.
class Heading extends StatelessWidget {
  final T title;
  final Widget? trailing;

  const Heading(this.title, {super.key, this.trailing});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    final app = AppScope.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 22, 4, 12),
      child: Row(
        children: [
          Expanded(
            child: Text(title(app.lang), style: display(20, wght: 600, color: p.ink)),
          ),
          if (trailing != null) trailing!,
        ],
      ),
    );
  }
}

/// The app mascot. Cheap to draw, does a lot of emotional work.
class Bee extends StatelessWidget {
  final double size;
  const Bee({super.key, this.size = 64});

  static const _svg = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="34" cy="34" rx="20" ry="13" fill="#FFFFFF" opacity="0.75" transform="rotate(-28 34 34)"/>
  <ellipse cx="66" cy="30" rx="20" ry="13" fill="#FFFFFF" opacity="0.75" transform="rotate(24 66 30)"/>
  <ellipse cx="50" cy="60" rx="30" ry="26" fill="#FFB020"/>
  <path d="M32 48 h36 a30 26 0 0 1 3 9 H31 z" fill="#241B33"/>
  <path d="M28 66 h44 a30 26 0 0 1 -5 10 H33 z" fill="#241B33"/>
  <circle cx="41" cy="55" r="4.5" fill="#241B33"/>
  <circle cx="59" cy="55" r="4.5" fill="#241B33"/>
  <circle cx="42.5" cy="53.5" r="1.6" fill="#FFFFFF"/>
  <circle cx="60.5" cy="53.5" r="1.6" fill="#FFFFFF"/>
  <path d="M43 22 q4 8 6 12 M57 22 q-4 8 -6 12" stroke="#241B33" stroke-width="3"
        fill="none" stroke-linecap="round"/>
  <circle cx="42" cy="20" r="4" fill="#241B33"/><circle cx="58" cy="20" r="4" fill="#241B33"/>
</svg>''';

  @override
  Widget build(BuildContext context) =>
      SvgPicture.string(_svg, width: size, height: size);
}

/// Empty-state block with the mascot and a friendly line.
class EmptyNote extends StatelessWidget {
  final T text;
  const EmptyNote(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    final p = paletteOf(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 36, horizontal: 24),
      child: Column(
        children: [
          const Bee(size: 76),
          const SizedBox(height: 14),
          Bi(text,
              style: body(15, wght: 600, color: p.inkSoft), align: TextAlign.center),
        ],
      ),
    );
  }
}

/// Slide-and-fade used when quiz cards and chapter sections appear.
class Appear extends StatelessWidget {
  final Widget child;
  final int index;

  const Appear({super.key, required this.child, this.index = 0});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      key: ValueKey(index),
      tween: Tween(begin: 0, end: 1),
      duration: Duration(milliseconds: 320 + (index.clamp(0, 6) * 45)),
      curve: Curves.easeOutCubic,
      builder: (_, v, c) => Opacity(
        opacity: v,
        child: Transform.translate(offset: Offset(0, 16 * (1 - v)), child: c),
      ),
      child: child,
    );
  }
}

/// Confetti burst for a passed exam or a finished deck.
class Celebrate extends StatefulWidget {
  final Widget child;
  const Celebrate({super.key, required this.child});

  @override
  State<Celebrate> createState() => _CelebrateState();
}

class _CelebrateState extends State<Celebrate> with SingleTickerProviderStateMixin {
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 2200))
        ..forward();
  final _rnd = Random();
  late final List<_Bit> _bits = List.generate(
    46,
    (_) => _Bit(
      x: _rnd.nextDouble(),
      delay: _rnd.nextDouble() * 0.35,
      drift: (_rnd.nextDouble() - 0.5) * 0.35,
      spin: (_rnd.nextDouble() - 0.5) * 10,
      color: Acc.at(_rnd.nextInt(Acc.all.length)),
      size: 6 + _rnd.nextDouble() * 8,
    ),
  );

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Stack(
        children: [
          widget.child,
          Positioned.fill(
            child: IgnorePointer(
              child: AnimatedBuilder(
                animation: _c,
                builder: (_, __) =>
                    CustomPaint(painter: _ConfettiPainter(_bits, _c.value)),
              ),
            ),
          ),
        ],
      );
}

class _Bit {
  final double x, delay, drift, spin, size;
  final Color color;
  _Bit({
    required this.x,
    required this.delay,
    required this.drift,
    required this.spin,
    required this.color,
    required this.size,
  });
}

class _ConfettiPainter extends CustomPainter {
  final List<_Bit> bits;
  final double t;
  _ConfettiPainter(this.bits, this.t);

  @override
  void paint(Canvas canvas, Size size) {
    for (final b in bits) {
      final local = ((t - b.delay) / (1 - b.delay)).clamp(0.0, 1.0);
      if (local <= 0) continue;
      final y = -0.1 + local * 1.25;
      final x = b.x + b.drift * local;
      final paint = Paint()
        ..color = b.color.withValues(alpha: (1 - local * local).clamp(0.0, 1.0));
      canvas.save();
      canvas.translate(x * size.width, y * size.height);
      canvas.rotate(b.spin * local);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(center: Offset.zero, width: b.size, height: b.size * 0.6),
          const Radius.circular(2),
        ),
        paint,
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(_ConfettiPainter old) => old.t != t;
}
