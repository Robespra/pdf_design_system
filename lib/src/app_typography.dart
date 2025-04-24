
import 'package:flutter/material.dart';

/// Typography styles for the PDF design system
class AppTypography {
  // Font families
  static const String headingsFamily = "Georgia";

  static const String bodyFamily = "Arial";

  static const String headingssansFamily = "Arial";

  static const String bodyserifFamily = "Georgia";

  static const String weightFamily = "String value";

  // Font weights
  static const FontWeight boldWeight = FontWeight.w700;

  static const FontWeight mediumWeight = FontWeight.w500;

  static const FontWeight regularWeight = FontWeight.w400;

  static const FontWeight italicWeight = FontWeight.w400;

  static const FontWeight bolditalicWeight = FontWeight.w400;

  // Font sizes
  static const double xxlSize = 48;

  static const double xlSize = 36;

  static const double lSize = 24;

  static const double mSize = 20;

  static const double sSize = 16;

  static const double xsSize = 14;

  static const double xxsSize = 12;

  static const double xxxsSize = 10;

  static const double xxxlSize = 64;

  // Line heights


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
