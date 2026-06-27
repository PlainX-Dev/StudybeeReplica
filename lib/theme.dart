import 'package:flutter/material.dart';

/// Colours sampled from the original app screenshots.
class AppColors {
  static const yellow = Color(0xFFFFC400); // header / drawer honey yellow
  static const yellowDark = Color(0xFFE8B300); // slightly darker accents
  static const drawerSelected = Color(0xFFFFCE1F);
  static const dark = Color(0xFF1C1C1C); // near-black text / filter pill
  static const scaffold = Color(0xFFF2F2F2); // grey page background
  static const sectionBar = Color(0xFFE9E9E9);
  static const avatarGold = Color(0xFFB8860B); // course initial circle
  static const avatarPurple = Color(0xFF9C27B0); // profile circle

  static const green = Color(0xFF2E9E4F);
  static const greenBox = Color(0xFF43B85F);
  static const yellowStatus = Color(0xFFF2B807);
  static const red = Color(0xFFE74C3C);

  static const badgeTrack = Color(0xFFEDEDED);

  static Color statusColor(String status) {
    switch (status.toLowerCase()) {
      case 'red':
        return red;
      case 'yellow':
        return yellowStatus;
      case 'green':
      default:
        return green;
    }
  }
}

ThemeData buildTheme() {
  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AppColors.scaffold,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.yellow,
      primary: AppColors.yellow,
    ),
    fontFamily: 'Roboto',
  );
}
