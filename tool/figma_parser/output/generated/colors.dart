
  import 'package:flutter/material.dart';

  // Generated from Figma variables
  class AppThemeColors extends ThemeExtension<AppThemeColors> {
    final Color text;
  final Color background;
  final Color sucessPromo;
  final Color warningYellow;
  final Color backgroundCards;
  final Color backgroundNav;
  final Color brandRed;
  final Color basicContrastText;
  final Color colorlogoLine;
  final Color backgroundNavStronger;
  final Color grey;
  final Color greyDarker;
  final Color contrastOpacityS;
  final Color contrastOpacityM;
  final Color basicContrastOpposite;
  final Color nightShow;

    const AppThemeColors({
      required this.text,
    required this.background,
    required this.sucessPromo,
    required this.warningYellow,
    required this.backgroundCards,
    required this.backgroundNav,
    required this.brandRed,
    required this.basicContrastText,
    required this.colorlogoLine,
    required this.backgroundNavStronger,
    required this.grey,
    required this.greyDarker,
    required this.contrastOpacityS,
    required this.contrastOpacityM,
    required this.basicContrastOpposite,
    required this.nightShow,
    });

    // Light theme values
    static AppThemeColors get light => const AppThemeColors(
      text: Color(0xFF3B311F),
    background: Color(0xFFFBF7F0),
    sucessPromo: Color(0xFF009A58),
    warningYellow: Color(0xFFE8C328),
    backgroundCards: Color(0xFFFFFFFF),
    backgroundNav: Color(0xFFF6F6F6),
    brandRed: Color(0xFFB40020),
    basicContrastText: Color(0xFF1D1D1B),
    colorlogoLine: Color(0xFFB40020),
    backgroundNavStronger: Color(0xFFF1EFEF),
    grey: Color(0xFF616161),
    greyDarker: Color(0xFF1F1F1F),
    contrastOpacityS: Color(0x1A000000),
    contrastOpacityM: Color(0x40000000),
    basicContrastOpposite: Color(0xFFFFFFFF),
    nightShow: Color(0xFF09406D),
    );

    // Dark theme values
    static AppThemeColors get dark => const AppThemeColors(
      text: Color(0xFFF6F6F6),
    background: Color(0xFF1C1C1B),
    sucessPromo: Color(0xFF48BF73),
    warningYellow: Color(0xFFECCB57),
    backgroundCards: Color(0xFF2C2D2D),
    backgroundNav: Color(0xFF2C2D2D),
    brandRed: Color(0xFFCB1617),
    basicContrastText: Color(0xFFFFFFFF),
    colorlogoLine: Color(0xFFFFFFFF),
    backgroundNavStronger: Color(0xFF474949),
    grey: Color(0xFFA3A3A3),
    greyDarker: Color(0xFF515151),
    contrastOpacityS: Color(0x1AFFFFFF),
    contrastOpacityM: Color(0x40FFFFFF),
    basicContrastOpposite: Color(0xFF1D1D1D),
    nightShow: Color(0xFF3D70A2),
    );

    @override
    AppThemeColors copyWith({
      Color? text,
    Color? background,
    Color? sucessPromo,
    Color? warningYellow,
    Color? backgroundCards,
    Color? backgroundNav,
    Color? brandRed,
    Color? basicContrastText,
    Color? colorlogoLine,
    Color? backgroundNavStronger,
    Color? grey,
    Color? greyDarker,
    Color? contrastOpacityS,
    Color? contrastOpacityM,
    Color? basicContrastOpposite,
    Color? nightShow,
    }) {
      return AppThemeColors(
        text: text ?? this.text,
      background: background ?? this.background,
      sucessPromo: sucessPromo ?? this.sucessPromo,
      warningYellow: warningYellow ?? this.warningYellow,
      backgroundCards: backgroundCards ?? this.backgroundCards,
      backgroundNav: backgroundNav ?? this.backgroundNav,
      brandRed: brandRed ?? this.brandRed,
      basicContrastText: basicContrastText ?? this.basicContrastText,
      colorlogoLine: colorlogoLine ?? this.colorlogoLine,
      backgroundNavStronger: backgroundNavStronger ?? this.backgroundNavStronger,
      grey: grey ?? this.grey,
      greyDarker: greyDarker ?? this.greyDarker,
      contrastOpacityS: contrastOpacityS ?? this.contrastOpacityS,
      contrastOpacityM: contrastOpacityM ?? this.contrastOpacityM,
      basicContrastOpposite: basicContrastOpposite ?? this.basicContrastOpposite,
      nightShow: nightShow ?? this.nightShow,
      );
    }

    @override
    ThemeExtension<AppThemeColors> lerp(ThemeExtension<AppThemeColors>? other, double t) {
      if (other is! AppThemeColors) {
        return this;
      }
      return AppThemeColors(
        text: Color.lerp(text, other.text, t)!,
      background: Color.lerp(background, other.background, t)!,
      sucessPromo: Color.lerp(sucessPromo, other.sucessPromo, t)!,
      warningYellow: Color.lerp(warningYellow, other.warningYellow, t)!,
      backgroundCards: Color.lerp(backgroundCards, other.backgroundCards, t)!,
      backgroundNav: Color.lerp(backgroundNav, other.backgroundNav, t)!,
      brandRed: Color.lerp(brandRed, other.brandRed, t)!,
      basicContrastText: Color.lerp(basicContrastText, other.basicContrastText, t)!,
      colorlogoLine: Color.lerp(colorlogoLine, other.colorlogoLine, t)!,
      backgroundNavStronger: Color.lerp(backgroundNavStronger, other.backgroundNavStronger, t)!,
      grey: Color.lerp(grey, other.grey, t)!,
      greyDarker: Color.lerp(greyDarker, other.greyDarker, t)!,
      contrastOpacityS: Color.lerp(contrastOpacityS, other.contrastOpacityS, t)!,
      contrastOpacityM: Color.lerp(contrastOpacityM, other.contrastOpacityM, t)!,
      basicContrastOpposite: Color.lerp(basicContrastOpposite, other.basicContrastOpposite, t)!,
      nightShow: Color.lerp(nightShow, other.nightShow, t)!,
      );
    }
  }

  // Extension for easier theme color access
  extension BuildContextThemeExtension on BuildContext {
    AppThemeColors get colors => Theme.of(this).extension<AppThemeColors>()!;
  }
  