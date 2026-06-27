import 'package:flutter/material.dart';

import '../theme.dart';

/// The split badge on the right of each course row: a coloured box with the
/// letter grade joined to a light track showing the status dot + label.
/// Sizes are derived from the original screenshots (badge ≈ 53x51 dp).
class GradeBadge extends StatelessWidget {
  const GradeBadge({super.key, required this.grade, required this.status});

  final String grade;
  final String status;

  @override
  Widget build(BuildContext context) {
    final color = AppColors.statusColor(status);
    return SizedBox(
      height: 50,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(11),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 44,
              alignment: Alignment.center,
              color: color,
              child: Text(
                grade.isEmpty ? '-' : grade,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 21,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            Container(
              width: 50,
              color: AppColors.badgeTrack,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 18,
                    height: 18,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    status,
                    style: const TextStyle(
                      color: Color(0xFF555555),
                      fontSize: 10.5,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
