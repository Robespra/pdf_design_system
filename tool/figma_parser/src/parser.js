const fs = require('fs-extra');
const path = require('path');

// Path constants
const INPUT_FILE = path.join(__dirname, '../input/figma-variables.json');
const OUTPUT_DIR = path.join(__dirname, '../output/generated');

// Format color value to hex with alpha
function formatColorToHex(color) {
  if (!color) return 'FF000000';

  // Check if we have RGBA values
  if (typeof color.r !== 'undefined') {
    const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
    const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
    const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
    const a = Math.round((color.a || 1) * 255).toString(16).padStart(2, '0');
    return `${a}${r}${g}${b}`.toUpperCase();
  }

  // If it's already a hex value
  if (typeof color === 'string' && color.startsWith('#')) {
    return color.substring(1).toUpperCase();
  }

  return 'FF000000'; // Default black
}

// Get value for variable (resolving aliases if needed)
function getResolvedValue(variable, modeId, figmaVariables) {
  if (!variable.valuesByMode || !variable.valuesByMode[modeId]) {
    return null;
  }

  const value = variable.valuesByMode[modeId];

  // If it's a direct value
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  // If it's a color
  if (typeof value.r !== 'undefined') {
    return formatColorToHex(value);
  }

  // If it's an alias
  if (value.type === 'VARIABLE_ALIAS') {
    const aliasId = value.id;
    const aliasVariable = figmaVariables.variables.find(v => v.id === aliasId);
    if (aliasVariable) {
      return getResolvedValue(aliasVariable, modeId, figmaVariables);
    }
  }

  // If there's a resolved value
  if (variable.resolvedValuesByMode &&
      variable.resolvedValuesByMode[modeId] &&
      variable.resolvedValuesByMode[modeId].resolvedValue) {
    const resolvedValue = variable.resolvedValuesByMode[modeId].resolvedValue;
    if (typeof resolvedValue === 'object' && resolvedValue.r !== undefined) {
      return formatColorToHex(resolvedValue);
    }
    return resolvedValue;
  }

  return null;
}

// Format variable name for Dart - preserving original capitalization
function formatVariableName(name) {
  // For regular colors: Remove the "Color/" prefix
  if (name.startsWith('Color/')) {
    return name.substring(6).replace(/\//g, '');
  }

  // For semantic colors: Remove "Semantic/Color/" prefix
  if (name.startsWith('Semantic/Color/')) {
    return name.substring(15).replace(/\//g, '');
  }

  // For other types: Remove the type prefix and slash
  const firstSlash = name.indexOf('/');
  if (firstSlash !== -1) {
    return name.substring(firstSlash + 1).replace(/\//g, '');
  }

  return name;
}

// Main function
async function main() {
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found. Please export your Figma variables to input/figma-variables.json');
      process.exit(1);
    }

    // Read and parse the Figma variables file
    const figmaVariables = await fs.readJson(INPUT_FILE);

    // Get mode IDs
    const modes = figmaVariables.modes || {};
    const lightModeId = Object.keys(modes).find(key => modes[key] === 'Light') || '53:1';
    const darkModeId = Object.keys(modes).find(key => modes[key] === 'Dark') || '53:2';

    console.log(`Using light mode ID: ${lightModeId}, dark mode ID: ${darkModeId}`);

    // Create data structures for each variable type
    const semanticColors = [];
    const regularColors = [];

    // Process variables
    figmaVariables.variables.forEach(variable => {
      const name = variable.name;
      const type = variable.type;

      // Process semantic colors
      if (name.startsWith('Semantic/Color/')) {
        // Format semantic name
        const dartVariableName = formatVariableName(name);

        // Get light and dark values
        const lightValue = getResolvedValue(variable, lightModeId, figmaVariables);
        const darkValue = getResolvedValue(variable, darkModeId, figmaVariables);

        if (lightValue && darkValue) {
          semanticColors.push({
            name: dartVariableName,
            lightValue: lightValue,
            darkValue: darkValue,
            description: variable.description || ''
          });
          console.log(`Processed semantic color: ${dartVariableName}`);
        }
      }
      // Process regular colors (non-semantic)
      else if (name.startsWith('Color/') || type === 'COLOR') {
        const value = getResolvedValue(variable, lightModeId, figmaVariables);

        if (value) {
          const dartVariableName = formatVariableName(name);
          regularColors.push({
            name: dartVariableName,
            value,
            description: variable.description || ''
          });
          console.log(`Processed regular color: ${dartVariableName}`);
        }
      }
    });

    // Create a custom template function
    const generateColorsDart = (regularColors, semanticColors) => {
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

    // Create output directory
    await fs.ensureDir(OUTPUT_DIR);

    // Generate colors.dart
    if (semanticColors.length > 0 || regularColors.length > 0) {
      const colorsDartCode = generateColorsDart(regularColors, semanticColors);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_colors.dart'), colorsDartCode);
      console.log(`Generated app_colors.dart with ${semanticColors.length} semantic colors and ${regularColors.length} regular colors`);
    }

    // Generate theme.dart (main file that imports others)
    const themeDartCode = `
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
`;

    await fs.writeFile(path.join(OUTPUT_DIR, 'app_theme.dart'), themeDartCode);
    console.log('Generated app_theme.dart');

    console.log('Design system token generation complete!');
  } catch (error) {
    console.error('Error processing Figma variables:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the main function
main();