module.exports = (spacingValues) => {
  return `
import 'package:flutter/material.dart';

/// Spacing values for the PDF design system
class AppSpacing {
${spacingValues.map(spacing => {
    let comment = spacing.description ?
    `  /// ${spacing.description}\n` : '';
    return `${comment}  static const double ${spacing.name.toLowerCase()} = ${spacing.value};`;
  }).join('\n\n')}

  AppSpacing._();
}
`;
};