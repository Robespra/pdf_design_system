const fs = require('fs-extra');
const path = require('path');

// Path constants
const VARIABLES_FILE = path.join(__dirname, '../input/figma-variables.json');
const STYLES_FILE = path.join(__dirname, '../input/figma-styles.json');
const OUTPUT_DIR = path.join(__dirname, '../../../lib/src');

// Import templates
const colorsTemplate = require('../src/templates/colors.template');
const spacingTemplate = require('../src/templates/spacing.template');
const borderTemplate = require('../src/templates/border.template');
const typographyTemplate = require('../src/templates/typography.template');
const shadowsTemplate = require('../src/templates/shadows.template');

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

// Process typography styles from Design Tokens format
function processTypographyStyles(stylesData) {
  const textStyles = [];

  // Process main typography styles
  if (stylesData.typography) {
    for (const [styleName, styleData] of Object.entries(stylesData.typography)) {
      // Skip nested objects like "type"
      if (typeof styleData !== 'object' || Array.isArray(styleData) || styleData === null) {
        continue;
      }

      // Skip if this is a nested object (like "type")
      if (styleData.fontSize && typeof styleData.fontSize === 'object') {
        continue;
      }

      // Extract values directly or from nested value objects
      const fontSize = styleData.fontSize?.value || styleData.fontSize || 16;
      const fontFamily = styleData.fontFamily?.value || styleData.fontFamily || 'Arial';
      const fontWeight = styleData.fontWeight?.value || styleData.fontWeight || 400;
      const fontStyle = styleData.fontStyle?.value || styleData.fontStyle || 'normal';
      const lineHeight = styleData.lineHeight?.value || styleData.lineHeight || fontSize * 1.2;
      const letterSpacing = styleData.letterSpacing?.value || styleData.letterSpacing || 0;
      const textDecoration = styleData.textDecoration?.value || styleData.textDecoration || 'none';

      textStyles.push({
        name: styleName.replace(/[^a-zA-Z0-9]/g, '_'),
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        lineHeight,
        letterSpacing,
        textDecoration,
        description: styleData.description || ''
      });

      console.log(`Processed typography style: ${styleName}`);
    }
  }

  // Process font styles
  if (stylesData.font) {
    for (const [styleName, styleData] of Object.entries(stylesData.font)) {
      // Skip nested objects
      if (typeof styleData !== 'object' || Array.isArray(styleData) || styleData === null) {
        continue;
      }

      // Skip if this has nested objects (like "type")
      if (styleData.type && styleData.type === 'custom-fontStyle' && styleData.value) {
        // Extract values from the value object
        const valueObj = styleData.value;

        textStyles.push({
          name: styleName.replace(/[^a-zA-Z0-9]/g, '_'),
          fontSize: valueObj.fontSize || 16,
          fontFamily: valueObj.fontFamily || 'Arial',
          fontWeight: valueObj.fontWeight || 400,
          fontStyle: valueObj.fontStyle || 'normal',
          lineHeight: valueObj.lineHeight || valueObj.fontSize * 1.2,
          letterSpacing: valueObj.letterSpacing || 0,
          textDecoration: valueObj.textDecoration || 'none',
          description: styleData.description || ''
        });

        console.log(`Processed font style: ${styleName}`);
      } else if (styleName === 'type') {
        // Process nested type styles
        for (const [nestedStyleName, nestedStyleData] of Object.entries(styleData)) {
          if (typeof nestedStyleData !== 'object' || Array.isArray(nestedStyleData) || nestedStyleData === null) {
            continue;
          }

          // Extract values from the value object
          const valueObj = nestedStyleData.value || nestedStyleData;

          textStyles.push({
            name: nestedStyleName.replace(/[^a-zA-Z0-9]/g, '_'),
            fontSize: valueObj.fontSize?.value || valueObj.fontSize || 16,
            fontFamily: valueObj.fontFamily?.value || valueObj.fontFamily || 'Arial',
            fontWeight: valueObj.fontWeight?.value || valueObj.fontWeight || 400,
            fontStyle: valueObj.fontStyle?.value || valueObj.fontStyle || 'normal',
            lineHeight: valueObj.lineHeight?.value || valueObj.lineHeight || valueObj.fontSize * 1.2,
            letterSpacing: valueObj.letterSpacing?.value || valueObj.letterSpacing || 0,
            textDecoration: valueObj.textDecoration?.value || valueObj.textDecoration || 'none',
            description: nestedStyleData.description || ''
          });

          console.log(`Processed nested type style: ${nestedStyleName}`);
        }
      }
    }
  }

  return textStyles;
}

// Process shadow styles from Design Tokens format
function processShadowStyles(stylesData) {
  const shadowStyles = [];

  // Look for shadow-specific properties in the file
  // Common patterns in design token files for shadows:
  // 1. "effect" section
  // 2. "shadow" section
  // 3. "elevation" section

  // Define a list of sections to look for shadows
  const possibleShadowSections = ['effect', 'shadow', 'elevation', 'drop-shadow', 'dropShadow'];

  for (const section of possibleShadowSections) {
    if (stylesData[section]) {
      for (const [shadowName, shadowData] of Object.entries(stylesData[section])) {
        if (typeof shadowData !== 'object' || shadowData === null) continue;

        processShadowStyle(shadowName, shadowData, shadowStyles);
      }
    }
  }

  // For files without dedicated shadow sections, we can look in the root
  // Structure might vary depending on how shadows are exported
  for (const [key, value] of Object.entries(stylesData)) {
    // Look for keys that might indicate shadow styles
    if (key.toLowerCase().includes('shadow') || key.toLowerCase().includes('elevation')) {
      if (typeof value === 'object' && value !== null) {
        processShadowStyle(key, value, shadowStyles);
      }
    }
  }

  // As a fallback, let's create some default shadows based on Material Design elevations
  if (shadowStyles.length === 0) {
    console.log('No shadow styles found in the styles file. Creating default shadow styles...');

    // Create default shadow styles based on Material Design elevations
    shadowStyles.push({
      name: 'elevation1',
      shadows: [
        {
          color: '14000000',
          offsetX: 0,
          offsetY: 1,
          blurRadius: 3,
          spreadRadius: 0
        }
      ],
      description: 'Default shadow for cards and elevated surfaces (1dp)'
    });

    shadowStyles.push({
      name: 'elevation2',
      shadows: [
        {
          color: '1A000000',
          offsetX: 0,
          offsetY: 2,
          blurRadius: 4,
          spreadRadius: 0
        }
      ],
      description: 'Default shadow for slightly elevated components (2dp)'
    });

    shadowStyles.push({
      name: 'elevation4',
      shadows: [
        {
          color: '26000000',
          offsetX: 0,
          offsetY: 4,
          blurRadius: 8,
          spreadRadius: 0
        }
      ],
      description: 'Default shadow for navigation drawers and modals (4dp)'
    });

    shadowStyles.push({
      name: 'elevation8',
      shadows: [
        {
          color: '33000000',
          offsetX: 0,
          offsetY: 8,
          blurRadius: 16,
          spreadRadius: 0
        }
      ],
      description: 'Default shadow for floating action buttons and menus (8dp)'
    });
  }

  return shadowStyles;
}

// Helper function to process a shadow style
function processShadowStyle(name, data, shadowStyles) {
  // Process shadow data based on different possible formats

  // 1. Format with 'value' containing array or object of shadow properties
  if (data.value) {
    const shadowsData = Array.isArray(data.value) ? data.value : [data.value];
    const shadows = shadowsData.map(shadowData => {
      // Check different shadow property formats
      if (shadowData.color) {
        // Direct properties
        return {
          color: formatColorToHex(shadowData.color),
          offsetX: shadowData.offsetX || shadowData.x || 0,
          offsetY: shadowData.offsetY || shadowData.y || 0,
          blurRadius: shadowData.blurRadius || shadowData.blur || 0,
          spreadRadius: shadowData.spreadRadius || shadowData.spread || 0
        };
      } else if (typeof shadowData === 'string') {
        // CSS-like shadow string: "0px 2px 4px rgba(0,0,0,0.1)"
        return parseCssShadow(shadowData);
      }

      // Default shadow if format is unknown
      return {
        color: '1A000000',
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0
      };
    });

    if (shadows.length > 0) {
      shadowStyles.push({
        name: name.replace(/[^a-zA-Z0-9]/g, '_'),
        shadows,
        description: data.description || ''
      });
      console.log(`Processed shadow style: ${name}`);
    }
  }
  // 2. Format where the data itself contains shadow properties directly
  else if (data.color || data.offsetX || data.offsetY || data.x || data.y || data.blur || data.blurRadius) {
    shadowStyles.push({
      name: name.replace(/[^a-zA-Z0-9]/g, '_'),
      shadows: [{
        color: formatColorToHex(data.color || { r: 0, g: 0, b: 0, a: 0.1 }),
        offsetX: data.offsetX || data.x || 0,
        offsetY: data.offsetY || data.y || 0,
        blurRadius: data.blurRadius || data.blur || 0,
        spreadRadius: data.spreadRadius || data.spread || 0
      }],
      description: data.description || ''
    });
    console.log(`Processed shadow style: ${name}`);
  }
  // 3. Nested objects that might contain shadow styles
  else if (typeof data === 'object' && !Array.isArray(data)) {
    for (const [nestedName, nestedData] of Object.entries(data)) {
      if (typeof nestedData === 'object' && nestedData !== null) {
        processShadowStyle(`${name}_${nestedName}`, nestedData, shadowStyles);
      }
    }
  }
}

// Helper function to parse CSS shadow string
function parseCssShadow(shadowString) {
  // Very basic parse of "0px 2px 4px rgba(0,0,0,0.1)" format
  // A proper implementation would use a CSS shadow parser
  const parts = shadowString.trim().split(/\s+/);

  let offsetX = 0;
  let offsetY = 0;
  let blurRadius = 0;
  let spreadRadius = 0;
  let color = '1A000000';

  // Try to extract values
  if (parts.length >= 3) {
    // Parse offset X
    offsetX = parseFloat(parts[0]) || 0;

    // Parse offset Y
    offsetY = parseFloat(parts[1]) || 0;

    // Parse blur radius
    blurRadius = parseFloat(parts[2]) || 0;

    // Parse spread radius if available
    if (parts.length >= 4 && !parts[3].includes('rgb')) {
      spreadRadius = parseFloat(parts[3]) || 0;
    }

    // Parse color if available
    const colorPart = parts.find(p => p.includes('rgb') || p.includes('#'));
    if (colorPart) {
      if (colorPart.includes('rgba')) {
        // Parse rgba color
        const rgba = colorPart.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
        if (rgba) {
          const r = parseInt(rgba[1]) / 255;
          const g = parseInt(rgba[2]) / 255;
          const b = parseInt(rgba[3]) / 255;
          const a = parseFloat(rgba[4]);
          color = formatColorToHex({ r, g, b, a });
        }
      } else if (colorPart.includes('rgb')) {
        // Parse rgb color
        const rgb = colorPart.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (rgb) {
          const r = parseInt(rgb[1]) / 255;
          const g = parseInt(rgb[2]) / 255;
          const b = parseInt(rgb[3]) / 255;
          color = formatColorToHex({ r, g, b, a: 1 });
        }
      } else if (colorPart.startsWith('#')) {
        // Parse hex color
        color = colorPart.substring(1).padEnd(8, 'F');
      }
    }
  }

  return {
    color,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius
  };
}

// Generate theme.dart file
function generateThemeDart(hasTextStyles, hasShadowStyles) {
  return `
import 'package:flutter/material.dart';
import 'app_colors.dart';
${hasTextStyles ? "import 'app_text_styles.dart';" : ""}
${hasShadowStyles ? "import 'app_shadows.dart';" : ""}

// Main theme configuration
class AppTheme {
  // Light theme
  static ThemeData lightTheme = ThemeData.light().copyWith(
    extensions: [AppThemeColors.light],
    ${hasTextStyles ? `
    // Text theme
    textTheme: const TextTheme(
      // Map your text styles to appropriate TextTheme fields
      // Examples:
      // headlineLarge: AppTextStyles.heading_large,
      // headlineMedium: AppTextStyles.heading_medium,
      // bodyLarge: AppTextStyles.body_large,
      // bodyMedium: AppTextStyles.body_regular,
    ),` : ""}
    ${hasShadowStyles ? `
    // Shadow theme (you can use these in your widgets)
    // Example: Container(decoration: BoxDecoration(boxShadow: AppShadows.elevation2))` : ""}
    // Add other theme settings here
  );

  // Dark theme
  static ThemeData darkTheme = ThemeData.dark().copyWith(
    extensions: [AppThemeColors.dark],
    ${hasTextStyles ? `
    // Text theme for dark mode
    textTheme: const TextTheme(
      // Map your text styles to appropriate TextTheme fields
      // Examples:
      // headlineLarge: AppTextStyles.heading_large,
      // headlineMedium: AppTextStyles.heading_medium,
      // bodyLarge: AppTextStyles.body_large,
      // bodyMedium: AppTextStyles.body_regular,
    ),` : ""}
    // Add other theme settings here
  );
}
`;
}

// Main function
async function main() {
  try {
    // Check if input files exist
    let hasVariables = false;
    let hasStyles = false;

    if (fs.existsSync(VARIABLES_FILE)) {
      console.log('Variables file found at:', VARIABLES_FILE);
      hasVariables = true;
    } else {
      console.error('Variables file not found at:', VARIABLES_FILE);
    }

    if (fs.existsSync(STYLES_FILE)) {
      console.log('Styles file found at:', STYLES_FILE);
      hasStyles = true;
    } else {
      console.log('Styles file not found at:', STYLES_FILE);
    }

    if (!hasVariables) {
      console.error('Cannot proceed without variables file');
      process.exit(1);
    }

    // Read and parse the Figma variables file
    const figmaVariables = await fs.readJson(VARIABLES_FILE);

    // Get mode IDs
    const modes = figmaVariables.modes || {};
    const lightModeId = Object.keys(modes).find(key => modes[key] === 'Light') || '53:1';
    const darkModeId = Object.keys(modes).find(key => modes[key] === 'Dark') || '53:2';

    console.log(`Using light mode ID: ${lightModeId}, dark mode ID: ${darkModeId}`);

    // Create data structures for variables
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

    // Process styles if available
    let textStyles = [];
    let shadowStyles = [];

    if (hasStyles) {
      // Read and parse the Figma styles file
      const figmaStyles = await fs.readJson(STYLES_FILE);
      textStyles = processTypographyStyles(figmaStyles);
      shadowStyles = processShadowStyles(figmaStyles);
    }

    // Create output directory
    await fs.ensureDir(OUTPUT_DIR);

    // Generate colors.dart
    if (semanticColors.length > 0 || regularColors.length > 0) {
      const colorsDartCode = colorsTemplate(regularColors, semanticColors);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_colors.dart'), colorsDartCode);
      console.log(`Generated app_colors.dart with ${semanticColors.length} semantic colors and ${regularColors.length} regular colors`);
    }

    // Generate text styles if available
    if (textStyles.length > 0) {
      const textStylesDartCode = typographyTemplate(textStyles);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_text_styles.dart'), textStylesDartCode);
      console.log(`Generated app_text_styles.dart with ${textStyles.length} text styles`);
    }

    // Generate shadow styles if available
    if (shadowStyles.length > 0) {
      const shadowsDartCode = shadowsTemplate(shadowStyles);
      await fs.writeFile(path.join(OUTPUT_DIR, 'app_shadows.dart'), shadowsDartCode);
      console.log(`Generated app_shadows.dart with ${shadowStyles.length} shadow styles`);
    }

    // Generate theme.dart (main file that imports others)
    const themeDartCode = generateThemeDart(textStyles.length > 0, shadowStyles.length > 0);
    await fs.writeFile(path.join(OUTPUT_DIR, 'app_theme.dart'), themeDartCode);
    console.log('Generated app_theme.dart');

    console.log('Design system token generation complete!');
  } catch (error) {
    console.error('Error processing design tokens:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the main function
main();