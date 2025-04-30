module.exports = (textStyles) => {
  // First, collect all unique line heights
  const lineHeights = new Set();
  textStyles.forEach(style => {
    if (style.lineHeight) {
      lineHeights.add(style.lineHeight);
    }
  });

  return `
import 'package:flutter/material.dart';

/// Typography styles for the PDF design system
class AppTypography {
  // Font families
  static const String headingsFamily = "Georgia";
  static const String bodyFamily = "Arial";
  static const String headingsSansFamily = "Arial";
  static const String bodySerifFamily = "Georgia";

  // Font weights
  static const FontWeight boldWeight = FontWeight.w700;
  static const FontWeight mediumWeight = FontWeight.w500;
  static const FontWeight regularWeight = FontWeight.w400;
  static const FontWeight italicWeight = FontWeight.w400;

  // Line heights
  ${Array.from(lineHeights).map(height =>
    `static const double lineHeight${height.toString().replace('.', '_')} = ${height};`
  ).join('\n  ')}

  // Text styles
${textStyles.map(style => {
  const comment = style.description ? `  /// ${style.description}\n` : '';

  // Handle FontWeight
  let fontWeight = 'regularWeight';
  if (style.fontWeight === 700) {
    fontWeight = 'boldWeight';
  } else if (style.fontWeight === 500) {
    fontWeight = 'mediumWeight';
  } else if (style.fontWeight === 400) {
    fontWeight = 'regularWeight';
  }

  // Handle FontStyle
  let fontStyle = 'FontStyle.normal';
  if (style.fontStyle === 'italic') {
    fontStyle = 'FontStyle.italic';
  }

  // Handle textDecoration
  let textDecoration = 'TextDecoration.none';
  if (style.textDecoration === 'underline') {
    textDecoration = 'TextDecoration.underline';
  } else if (style.textDecoration === 'line-through') {
    textDecoration = 'TextDecoration.lineThrough';
  }

  // Convert name to camelCase and ensure uniqueness
  const styleName = style.name.replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/^[0-9]/, 'n$&'); // Prefix with 'n' if starts with number

  const lineHeightVar = 'lineHeight' + style.lineHeight.toString().replace('.', '_');

  return `${comment}  static const TextStyle ${styleName} = TextStyle(
    fontFamily: ${style.fontFamily === 'Georgia' ? 'headingsFamily' : 'bodyFamily'},
    fontSize: ${style.fontSize},
    fontWeight: ${fontWeight},
    fontStyle: ${fontStyle},
    letterSpacing: ${style.letterSpacing},
    height: ${lineHeightVar} / ${style.fontSize},
    decoration: ${textDecoration},
  );`;
}).join('\n\n')}

  AppTypography._();
}
`;
};