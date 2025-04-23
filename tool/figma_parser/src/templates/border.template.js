module.exports = (borderValues) => {
  return `
import 'package:flutter/material.dart';

/// Border values for the PDF design system
class AppBorders {
${borderValues.map(border => {
    let comment = border.description ? `  /// ${border.description}\n` : '';
    return `${comment}  static const double ${border.name.toLowerCase()} = ${border.value};`;
  }).join('\n\n')}

  // Common border styles
  static BorderSide thin = const BorderSide(width: xs);
  static BorderSide medium = const BorderSide(width: s);
  static BorderSide thick = const BorderSide(width: m);

  AppBorders._();
}
`;
};