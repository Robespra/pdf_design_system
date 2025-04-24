
import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_text_styles.dart';
import 'app_shadows.dart';

// Main theme configuration
class AppTheme {
  // Light theme
  static ThemeData lightTheme = ThemeData.light().copyWith(
    extensions: [AppThemeColors.light],
    
    // Text theme
    textTheme: const TextTheme(
      // Map your text styles to appropriate TextTheme fields
      // Examples:
      // headlineLarge: AppTextStyles.heading_large,
      // headlineMedium: AppTextStyles.heading_medium,
      // bodyLarge: AppTextStyles.body_large,
      // bodyMedium: AppTextStyles.body_regular,
    ),
    
    // Shadow theme (you can use these in your widgets)
    // Example: Container(decoration: BoxDecoration(boxShadow: AppShadows.elevation2))
    // Add other theme settings here
  );

  // Dark theme
  static ThemeData darkTheme = ThemeData.dark().copyWith(
    extensions: [AppThemeColors.dark],
    
    // Text theme for dark mode
    textTheme: const TextTheme(
      // Map your text styles to appropriate TextTheme fields
      // Examples:
      // headlineLarge: AppTextStyles.heading_large,
      // headlineMedium: AppTextStyles.heading_medium,
      // bodyLarge: AppTextStyles.body_large,
      // bodyMedium: AppTextStyles.body_regular,
    ),
    // Add other theme settings here
  );
}
