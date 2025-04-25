
import 'package:flutter/material.dart';

// Text styles from the design system
class AppTextStyles {
  static const TextStyle type = TextStyle(
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 01 Serif
  static const TextStyle headline01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 48,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 01
  static const TextStyle headlinesans01 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 48,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 02 Serif
  static const TextStyle headline02 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 03
  static const TextStyle headline03 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 03
  static const TextStyle headlinesans03 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Large body 01
  static const TextStyle largebody01 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Large body serif 01
  static const TextStyle largebodyserif01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Regular Body 01
  static const TextStyle regularbody01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Regular Body serif 01
  static const TextStyle regularbodyserif01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.25, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Small Body 02
  static const TextStyle smallbody02 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1428571428571428, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Small Body serif 02
  static const TextStyle smallbodyserif02 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1428571428571428, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Mention text
  static const TextStyle mentiontext = TextStyle(
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1666666666666667, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Navbar
  static const TextStyle smallnav01 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 10,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Italic/Bold Body 01
  static const TextStyle italicbody01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// ItalicBold Body 01
  static const TextStyle italicboldbody01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.italic,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Bold Body 01
  static const TextStyle boldbody01 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 04
  static const TextStyle headline04 = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 20,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 04
  static const TextStyle headlinesans04 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  static const TextStyle smallbody02bold = TextStyle(
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1428571428571428, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  static const TextStyle smallbody2boldunderline = TextStyle(
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1428571428571428, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.underline,
  );

  static const TextStyle smallnavbold01 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 10,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.6, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  static const TextStyle details8 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 8,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.25, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  static const TextStyle headlinesans02 = TextStyle(
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 01
  static const TextStyle headinglarge = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1111111111111112, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline Sans 01
  static const TextStyle headinglargesans = TextStyle(
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1111111111111112, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 02
  static const TextStyle headingmedium = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.1111111111111112, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline Sans 02
  static const TextStyle headingmediumsans = TextStyle(
    fontFamily: 'Arial',
    fontSize: 30,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.2, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Headline 03
  static const TextStyle headingsmall = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.3333333333333333, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// HeadlineSans 03
  static const TextStyle headingsmallsans = TextStyle(
    fontFamily: 'Arial',
    fontSize: 18,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.3333333333333333, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Large body 01
  static const TextStyle bodylarge = TextStyle(
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.375, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Large body serif
  static const TextStyle bodylargeserif = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.375, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Regular body 01
  static const TextStyle bodyregular = TextStyle(
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.4285714285714286, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Small body 02
  static const TextStyle bodysmall = TextStyle(
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.4285714285714286, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Regular body serif 01
  static const TextStyle bodyregularserif = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.4285714285714286, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// Small body serif 02
  static const TextStyle bodysmallserif = TextStyle(
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.4285714285714286, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  /// MENTION TEXT
  static const TextStyle mentiontext = TextStyle(
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.normal,
    letterSpacing: 0,
    height: 1.6666666666666667, // lineHeight divided by fontSize for Flutter
    decoration: TextDecoration.none,
  );

  AppTextStyles._();
}
