// templates/colors.template.js
module.exports = (semanticColors, regularColors) => {
    return `
  import 'package:flutter/material.dart';

  // Regular colors from the design system
  class AppColors {
  ${regularColors.map(color => {
    const comment = color.description ? `  /// ${color.description}\n` : '';
    return `${comment}  static const Color ${color.name} = Color(0x${color.value});`;
  }).join('\n\n')}

    AppColors._();
  }

  // Theme-aware semantic colors
  class AppThemeColors extends ThemeExtension<AppThemeColors> {
  ${semanticColors.map(color => `  final Color ${color.name};`).join('\n')}

    const AppThemeColors({
  ${semanticColors.map(color => `    required this.${color.name},`).join('\n')}
    });

    // Light theme values
    static AppThemeColors get light => const AppThemeColors(
  ${semanticColors.map(color => `    ${color.name}: Color(0x${color.lightValue}),`).join('\n')}
    );

    // Dark theme values
    static AppThemeColors get dark => const AppThemeColors(
  ${semanticColors.map(color => `    ${color.name}: Color(0x${color.darkValue}),`).join('\n')}
    );

    @override
    AppThemeColors copyWith({
  ${semanticColors.map(color => `    Color? ${color.name},`).join('\n')}
    }) {
      return AppThemeColors(
  ${semanticColors.map(color => `      ${color.name}: ${color.name} ?? this.${color.name},`).join('\n')}
      );
    }

    @override
    ThemeExtension<AppThemeColors> lerp(ThemeExtension<AppThemeColors>? other, double t) {
      if (other is! AppThemeColors) {
        return this;
      }
      return AppThemeColors(
  ${semanticColors.map(color => `      ${color.name}: Color.lerp(${color.name}, other.${color.name}, t)!,`).join('\n')}
      );
    }
  }

  // Extension for easier theme color access
  extension BuildContextThemeExtension on BuildContext {
    AppThemeColors get colors => Theme.of(this).extension<AppThemeColors>()!;
  }
  `;
  };