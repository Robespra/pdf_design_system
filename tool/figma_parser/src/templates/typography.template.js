module.exports = (textStyles) => {
  return `
import 'package:flutter/material.dart';

// Text styles from the design system
class AppTextStyles {
${textStyles.map(style => {
  const comment = style.description ? `  /// ${style.description}\n` : '';

  // Handle FontWeight
  let fontWeight = 'FontWeight.w400';
  if (style.fontWeight === 700) {
    fontWeight = 'FontWeight.w700';
  } else if (style.fontWeight === 600) {
    fontWeight = 'FontWeight.w600';
  } else if (style.fontWeight === 500) {
    fontWeight = 'FontWeight.w500';
  } else if (style.fontWeight === 300) {
    fontWeight = 'FontWeight.w300';
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

  return `${comment}  static const TextStyle ${style.name.replace(/[^a-zA-Z0-9]/g, '_')} = TextStyle(
    fontFamily: '${style.fontFamily}',
    fontSize: ${style.fontSize},
    fontWeight: ${fontWeight},
    fontStyle: ${fontStyle},
    letterSpacing: ${style.letterSpacing},
    height: ${style.lineHeight / style.fontSize}, // lineHeight divided by fontSize for Flutter
    decoration: ${textDecoration},
  );`;
}).join('\n\n')}

  AppTextStyles._();
}
`;
};