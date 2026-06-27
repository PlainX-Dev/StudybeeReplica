import 'package:flutter/material.dart';

/// Colours sampled directly from the original app screenshots.
class AppColors {
  static const yellow = Color(0xFFFFCC00); // header / drawer honey yellow
  static const yellowDark = Color(0xFFE8B800); // darker accents
  static const drawerSelected = Color(0xFFECBC00); // selected drawer band
  static const dark = Color(0xFF1C1C1C); // near-black text / filter pill
  static const scaffold = Color(0xFFFFFFFF); // white page background
  static const sectionBar = Color(0xFFEEEEEE); // grey section header bar
  static const sectionText = Color(0xFF484848);
  static const subtitle = Color(0xFF6A6A6A);
  static const divider = Color(0xFFEDEDED);
  static const avatarGold = Color(0xFFAB8A00); // course initial circle
  static const avatarPurple = Color(0xFF7A1FA2); // profile circle

  static const green = Color(0xFF4BB04F);
  static const greenBox = Color(0xFF4BB04F);
  static const yellowStatus = Color(0xFFF2B807);
  static const red = Color(0xFFE53935);

  static const badgeTrack = Color(0xFFEEEEEE);

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
