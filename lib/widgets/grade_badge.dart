import 'package:flutter/material.dart';

import '../theme.dart';

/// The split badge on the right of each course row: a coloured box with the
/// letter grade, joined to a light track showing the status dot + label.
class GradeBadge extends StatelessWidget {
  const GradeBadge({super.key, required this.grade, required this.status});

  final String grade;
  final String status;

  @override
  Widget build(BuildContext context) {
    final color = AppColors.statusColor(status);
    return SizedBox(
      height: 62,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 56,
              alignment: Alignment.center,
              color: color,
              child: Text(
                grade.isEmpty ? '-' : grade,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            Container(
              width: 64,
              color: AppColors.badgeTrack,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 22,
                    height: 22,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    status,
                    style: const TextStyle(
                      color: Color(0xFF555555),
                      fontSize: 12,
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
