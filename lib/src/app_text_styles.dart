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
  static const double lineHeight48 = 48;
  static const double lineHeight36 = 36;
  static const double lineHeight24 = 24;
  static const double lineHeight20 = 20;
  static const double lineHeight16 = 16;
  static const double lineHeight14 = 14;
  static const double lineHeight12 = 12;
  static const double lineHeight10 = 10;
  static const double lineHeight40 = 40;
  static const double lineHeight22 = 22;

  // Text styles
  /// Headline 01 Serif
  static const TextStyle headline01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 48,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight48 / 48,
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 01
  static const TextStyle headlinesans01 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 48,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight48 / 48,
    decoration: TextDecoration.none,
  );

  /// Headline 02 Serif
  static const TextStyle headline02 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 36,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight36 / 36,
    decoration: TextDecoration.none,
  );

  /// Headline 03
  static const TextStyle headline03 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 24,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 24,
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 03
  static const TextStyle headlinesans03 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 24,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 24,
    decoration: TextDecoration.none,
  );

  /// Large body 01
  static const TextStyle largebody01 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 20,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// Large body serif 01
  static const TextStyle largebodyserif01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// Regular Body 01
  static const TextStyle regularbody01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// Regular Body serif 01
  static const TextStyle regularbodyserif01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 16,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 16,
    decoration: TextDecoration.none,
  );

  /// Small Body 02
  static const TextStyle smallbody02 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 14,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight16 / 14,
    decoration: TextDecoration.none,
  );

  /// Small Body serif 02
  static const TextStyle smallbodyserif02 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 14,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight16 / 14,
    decoration: TextDecoration.none,
  );

  /// Navbar
  static const TextStyle smallnav01 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 10,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight12 / 10,
    decoration: TextDecoration.none,
  );

  /// Italic/Bold Body 01
  static const TextStyle italicbody01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: regularWeight,
    fontStyle: FontStyle.italic,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// ItalicBold Body 01
  static const TextStyle italicboldbody01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: boldWeight,
    fontStyle: FontStyle.italic,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// Bold Body 01
  static const TextStyle boldbody01 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// Headline 04
  static const TextStyle headline04 = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 20,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 04
  static const TextStyle headlinesans04 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 20,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 20,
    decoration: TextDecoration.none,
  );

  static const TextStyle smallbody02bold = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 14,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight16 / 14,
    decoration: TextDecoration.none,
  );

  static const TextStyle smallbody2boldunderline = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 14,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight16 / 14,
    decoration: TextDecoration.underline,
  );

  static const TextStyle smallnavbold01 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 10,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight16 / 10,
    decoration: TextDecoration.none,
  );

  static const TextStyle details8 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 8,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight10 / 8,
    decoration: TextDecoration.none,
  );

  static const TextStyle headlinesans02 = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 36,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight36 / 36,
    decoration: TextDecoration.none,
  );

  /// Headline 01
  static const TextStyle headinglarge = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 36,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight40 / 36,
    decoration: TextDecoration.none,
  );

  /// Headline Sans 01
  static const TextStyle headinglargesans = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 36,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight40 / 36,
    decoration: TextDecoration.none,
  );

  /// Headline 02
  static const TextStyle headingmedium = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 36,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight40 / 36,
    decoration: TextDecoration.none,
  );

  /// Headline Sans 02
  static const TextStyle headingmediumsans = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 30,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight36 / 30,
    decoration: TextDecoration.none,
  );

  /// Headline 03
  static const TextStyle headingsmall = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 18,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 18,
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 03
  static const TextStyle headingsmallsans = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 18,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight24 / 18,
    decoration: TextDecoration.none,
  );

  /// Large body 01
  static const TextStyle bodylarge = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 16,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight22 / 16,
    decoration: TextDecoration.none,
  );

  /// Large body serif
  static const TextStyle bodylargeserif = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 16,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight22 / 16,
    decoration: TextDecoration.none,
  );

  /// Regular body 01
  static const TextStyle bodyregular = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 14,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 14,
    decoration: TextDecoration.none,
  );

  /// Small body 02
  static const TextStyle bodysmall = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 14,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 14,
    decoration: TextDecoration.none,
  );

  /// Regular body serif 01
  static const TextStyle bodyregularserif = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 14,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 14,
    decoration: TextDecoration.none,
  );

  /// Small body serif 02
  static const TextStyle bodysmallserif = TextStyle(
    fontFamily: headingsFamily,
    fontSize: 14,
    fontWeight: regularWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 14,
    decoration: TextDecoration.none,
  );

  /// MENTION TEXT
  static const TextStyle mentiontext = TextStyle(
    fontFamily: bodyFamily,
    fontSize: 12,
    fontWeight: boldWeight,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: lineHeight20 / 12,
    decoration: TextDecoration.none,
  );

  AppTypography._();
}
