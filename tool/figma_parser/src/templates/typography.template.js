module.exports = (typographyStyles) => {
  // Group typography values by category
  const families = typographyStyles.filter(t => t.category === 'family');
  const weights = typographyStyles.filter(t => t.category === 'weight');
  const sizes = typographyStyles.filter(t => t.category === 'size');
  const lineHeights = typographyStyles.filter(t => t.category === 'line-height');

  return `
import 'package:flutter/material.dart';

/// Typography styles for the PDF design system
class AppTypography {
  // Font families
${families.map(f => {
    let comment = f.description ? `  /// ${f.description}\n` : '';
    return `${comment}  static const String ${f.name.toLowerCase()}Family = "${f.value}";`;
  }).join('\n\n')}

  // Font weights
${weights.map(w => {
    let comment = w.description ? `  /// ${w.description}\n` : '';
    let weightValue;

    // Map weight names to Flutter FontWeight values
    switch(w.value.toLowerCase()) {
      case 'thin': weightValue = 'FontWeight.w100'; break;
      case 'extralight': weightValue = 'FontWeight.w200'; break;
      case 'light': weightValue = 'FontWeight.w300'; break;
      case 'regular': weightValue = 'FontWeight.w400'; break;
      case 'medium': weightValue = 'FontWeight.w500'; break;
      case 'semibold': weightValue = 'FontWeight.w600'; break;
      case 'bold': weightValue = 'FontWeight.w700'; break;
      case 'extrabold': weightValue = 'FontWeight.w800'; break;
      case 'black': weightValue = 'FontWeight.w900'; break;
      default: weightValue = 'FontWeight.w400';
    }

    return `${comment}  static const FontWeight ${w.name.toLowerCase()}Weight = ${weightValue};`;
  }).join('\n\n')}

  // Font sizes
${sizes.map(s => {
    let comment = s.description ? `  /// ${s.description}\n` : '';
    return `${comment}  static const double ${s.name.toLowerCase()}Size = ${s.value};`;
  }).join('\n\n')}

  // Line heights
${lineHeights.map(lh => {
    let comment = lh.description ? `  /// ${lh.description}\n` : '';
    return `${comment}  static const double ${lh.name.toLowerCase()}LineHeight = ${lh.value};`;
  }).join('\n\n')}

  // Predefined text styles
  static const TextStyle headline1 = TextStyle(
    fontFamily: headingsFamily,
    fontWeight: boldWeight,
    fontSize: xxlSize,
    height: xxlLineHeight / xxlSize,
  );

  static const TextStyle headline2 = TextStyle(
    fontFamily: headingsFamily,
    fontWeight: boldWeight,
    fontSize: xlSize,
    height: xlLineHeight / xlSize,
  );

  static const TextStyle headline3 = TextStyle(
    fontFamily: headingsFamily,
    fontWeight: mediumWeight,
    fontSize: lSize,
    height: lLineHeight / lSize,
  );

  static const TextStyle bodyLarge = TextStyle(
    fontFamily: bodyFamily,
    fontWeight: regularWeight,
    fontSize: mSize,
    height: mLineHeight / mSize,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontFamily: bodyFamily,
    fontWeight: regularWeight,
    fontSize: sSize,
    height: sLineHeight / sSize,
  );

  static const TextStyle bodySmall = TextStyle(
    fontFamily: bodyFamily,
    fontWeight: regularWeight,
    fontSize: xsSize,
    height: xsLineHeight / xsSize,
  );

  AppTypography._();
}
`;
};