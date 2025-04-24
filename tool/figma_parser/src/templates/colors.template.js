// colors.template.js
module.exports = (regularColors, semanticColors) => {
  // Filter out semantic colors from regular colors
  const nonSemanticColors = regularColors.filter(color =>
    !color.name.startsWith('Semantic_'));

  // Extract semantic colors
  const semanticColorMap = {};
  for (const color of regularColors) {
    if (color.name.startsWith('Semantic_Color_Semantic')) {
      // Extract name (removing prefix)
      const simpleName = color.name.replace('Semantic_Color_Semantic', '');
      // Convert to camelCase
      const camelName = simpleName.charAt(0).toLowerCase() + simpleName.slice(1);

      // Store in map with light value
      if (!semanticColorMap[camelName]) {
        semanticColorMap[camelName] = { light: color.value };
      } else {
        semanticColorMap[camelName].light = color.value;
      }
    }
  }

  // Get matching dark values from semanticColors array
  for (const semanticColor of semanticColors) {
    if (semanticColorMap[semanticColor.name]) {
      semanticColorMap[semanticColor.name].dark = semanticColor.darkValue;
    }
  }

  // Convert map to array
  const themeColors = Object.entries(semanticColorMap).map(([name, values]) => ({
    name,
    lightValue: values.light || 'FF000000',
    darkValue: values.dark || 'FFFFFFFF'
  }));

  return `
import 'package:flutter/material.dart';

// Regular colors from the design system
class AppColors {
${nonSemanticColors.map(color => {
  const comment = color.description ? `  /// ${color.description}\n` : '';
  return `${comment}  static const Color ${color.name} = Color(0x${color.value});`;
}).join('\n\n')}

  AppColors._();
}

// Theme-aware semantic colors
class AppThemeColors extends ThemeExtension<AppThemeColors> {
${themeColors.map(color => `  final Color ${color.name};`).join('\n')}

  const AppThemeColors({
${themeColors.map(color => `    required this.${color.name},`).join('\n')}
  });

  // Light theme values
  static AppThemeColors get light => const AppThemeColors(
${themeColors.map(color => `    ${color.name}: Color(0x${color.lightValue}),`).join('\n')}
  );

  // Dark theme values
  static AppThemeColors get dark => const AppThemeColors(
${themeColors.map(color => `    ${color.name}: Color(0x${color.darkValue}),`).join('\n')}
  );

  @override
  AppThemeColors copyWith({
${themeColors.map(color => `    Color? ${color.name},`).join('\n')}
  }) {
    return AppThemeColors(
${themeColors.map(color => `      ${color.name}: ${color.name} ?? this.${color.name},`).join('\n')}
    );
  }

  @override
  ThemeExtension<AppThemeColors> lerp(ThemeExtension<AppThemeColors>? other, double t) {
    if (other is! AppThemeColors) {
      return this;
    }
    return AppThemeColors(
${themeColors.map(color => `      ${color.name}: Color.lerp(${color.name}, other.${color.name}, t)!,`).join('\n')}
    );
  }
}

// Extension for easier theme color access
extension BuildContextThemeExtension on BuildContext {
  AppThemeColors get colors => Theme.of(this).extension<AppThemeColors>()!;
}
`;
};