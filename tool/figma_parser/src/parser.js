const fs = require('fs-extra');
const path = require('path');
const colorsTemplate = require('./templates/colors.template');
const typographyTemplate = require('./templates/typography.template');
const spacingTemplate = require('./templates/spacing.template');
const borderTemplate = require('./templates/border.template');

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
    const typographyStyles = [];
    const spacingValues = [];
    const borderValues = [];

    // Process variables
    figmaVariables.variables.forEach(variable => {
      const name = variable.name;
      const type = variable.type;

      // Process semantic colors
      if (name.startsWith('semantic/color/--')) {
        const colorName = name.replace('semantic/color/--', '');
        const lightValue = getResolvedValue(variable, lightModeId, figmaVariables);
        const darkValue = getResolvedValue(variable, darkModeId, figmaVariables);

        if (lightValue && darkValue) {
          semanticColors.push({
            name: colorName,
            lightValue,
            darkValue,
            description: variable.description || ''
          });
          console.log(`Processed semantic color: ${colorName}`);
        }
      }
      // Process regular colors (non-semantic)
      else if (name.startsWith('color/') || type === 'COLOR') {
        // Normalize the name by removing 'color/' prefix and replacing '/' with '_'
        const colorName = name.replace('color/', '').replace(/\//g, '_');
        const value = getResolvedValue(variable, lightModeId, figmaVariables);

        if (value) {
          regularColors.push({
            name: colorName,
            value,
            description: variable.description || ''
          });
          console.log(`Processed regular color: ${colorName}`);
        }
      }

      // Process typography
      else if (name.startsWith('typography/')) {
        const parts = name.split('/');
        const category = parts[1];
        const typeName = parts[2];

        if (['family', 'weight', 'size', 'line-height'].includes(category)) {
          const value = getResolvedValue(variable, lightModeId, figmaVariables);

          typographyStyles.push({
            name: typeName,
            category,
            value,
            description: variable.description || ''
          });
          console.log(`Processed typography: ${category}/${typeName}`);
        }
      }

      // Process spacing
      else if (name.startsWith('spacing/')) {
        const spacingName = name.replace('spacing/', '');
        const value = getResolvedValue(variable, lightModeId, figmaVariables);

        if (value !== null) {
          spacingValues.push({
            name: spacingName,
            value,
            description: variable.description || ''
          });
          console.log(`Processed spacing: ${spacingName}`);
        }
      }

      // Process borders
      else if (name.startsWith('border/')) {
        const borderName = name.replace('border/', '');
        const value = getResolvedValue(variable, lightModeId, figmaVariables);

        if (value !== null) {
          borderValues.push({
            name: borderName,
            value,
            description: variable.description || ''
          });
          console.log(`Processed border: ${borderName}`);
        }
      }
    });

    // Create output directory
    await fs.ensureDir(OUTPUT_DIR);

    // Generate colors.dart
    if (semanticColors.length > 0 || regularColors.length > 0) {
      const colorsDartCode = colorsTemplate(semanticColors, regularColors);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_colors.dart'), colorsDartCode);
      console.log(`Generated app_colors.dart with ${semanticColors.length} semantic colors and ${regularColors.length} regular colors`);
    }

    // Generate typography.dart
    if (typographyStyles.length > 0) {
      const typographyDartCode = typographyTemplate(typographyStyles);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_typography.dart'), typographyDartCode);
      console.log(`Generated app_typography.dart with ${typographyStyles.length} typography styles`);
    }

    // Generate spacing.dart
    if (spacingValues.length > 0) {
      const spacingDartCode = spacingTemplate(spacingValues);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_spacing.dart'), spacingDartCode);
      console.log(`Generated app_spacing.dart with ${spacingValues.length} spacing values`);
    }

    // Generate borders.dart
    if (borderValues.length > 0) {
      const borderDartCode = borderTemplate(borderValues);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_borders.dart'), borderDartCode);
      console.log(`Generated app_borders.dart with ${borderValues.length} border values`);
    }

    // Generate theme.dart (main file that imports others)
    const themeDartCode = `
import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import 'app_spacing.dart';
import 'app_borders.dart';

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