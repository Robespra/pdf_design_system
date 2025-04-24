
import 'package:flutter/material.dart';
import 'app_colors.dart';

// Main theme configuration
class AppTheme {
  // Light theme
  static ThemeData lightTheme = ThemeData.light().copyWith(
    extensions: [AppThemeColors.light],
    // Add other theme settings here
  );

  // Dark theme
  static ThemeData darkTheme = ThemeData.dark().copyWith(
    extensions: [AppThemeColors.dark],
    // Add other theme settings here
  );
}
