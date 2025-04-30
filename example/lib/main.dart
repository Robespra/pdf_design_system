import 'package:flutter/material.dart';
import 'package:pdf_design_system/pdf_design_system.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.system;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PDF Design System Test',
      theme: ThemeData(
        extensions: [AppThemeColors.light],
      ),
      darkTheme: ThemeData(
        extensions: [AppThemeColors.dark],
      ),
      themeMode: _themeMode,
      home: DesignSystemTestPage(toggleTheme: _toggleTheme),
    );
  }
}

class DesignSystemTestPage extends StatelessWidget {
  final VoidCallback toggleTheme;

  const DesignSystemTestPage({super.key, required this.toggleTheme});

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Design System Test', style: AppTypography.headline04),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: toggleTheme,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Test Colors
            Text('Colors', style: AppTypography.headline03),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _ColorBox(color: colors.text, name: 'Text'),
                _ColorBox(color: colors.background, name: 'Background'),
                _ColorBox(color: colors.successPromo, name: 'Success'),
                _ColorBox(color: colors.warningYellow, name: 'Warning'),
                _ColorBox(color: colors.backgroundCards, name: 'Cards'),
                _ColorBox(color: colors.backgroundNav, name: 'Nav'),
                _ColorBox(color: colors.brandRed, name: 'Brand Red'),
                _ColorBox(color: colors.basicContrastText, name: 'Contrast Text'),
                _ColorBox(color: colors.logoLine, name: 'Logo Line'),
                _ColorBox(color: colors.backgroundNavStronger, name: 'Nav Stronger'),
                _ColorBox(color: colors.grey, name: 'Grey'),
                _ColorBox(color: colors.greyDarker, name: 'Grey Darker'),
                _ColorBox(color: colors.contrastOpacityS, name: 'Opacity S'),
                _ColorBox(color: colors.contrastOpacityM, name: 'Opacity M'),
                _ColorBox(color: colors.basicContrastOpposite, name: 'Contrast Opposite'),
                _ColorBox(color: colors.nightShow, name: 'Night Show'),
              ],
            ),

            const SizedBox(height: 32),

            // Test Typography
            Text('Typography', style: AppTypography.headline03),
            const SizedBox(height: 16),
            Text('Headline 01', style: AppTypography.headline01),
            Text('Headline Sans 01', style: AppTypography.headlinesans01),
            Text('Headline 02', style: AppTypography.headline02),
            Text('Headline Sans 02', style: AppTypography.headlinesans02),
            Text('Headline 03', style: AppTypography.headline03),
            Text('Headline Sans 03', style: AppTypography.headlinesans03),
            Text('Headline 04', style: AppTypography.headline04),
            Text('Headline Sans 04', style: AppTypography.headlinesans04),
            Text('Large Body', style: AppTypography.largebody01),
            Text('Large Body Serif', style: AppTypography.largebodyserif01),
            Text('Regular Body', style: AppTypography.regularbody01),
            Text('Regular Body Serif', style: AppTypography.regularbodyserif01),
            Text('Small Body', style: AppTypography.smallbody02),
            Text('Small Body Serif', style: AppTypography.smallbodyserif02),
            Text('Bold Body', style: AppTypography.boldbody01),
            Text('Italic Body', style: AppTypography.italicbody01),
            Text('Italic Bold Body', style: AppTypography.italicboldbody01),
            Text('Mention Text', style: AppTypography.mentiontext),
            Text('Navbar', style: AppTypography.smallnav01),
            Text('Navbar Bold', style: AppTypography.smallnavbold01),
            Text('Details', style: AppTypography.details8),

            const SizedBox(height: 32),

            // Test Shadows
            Text('Shadows', style: AppTypography.headline03),
            const SizedBox(height: 16),
            _ShadowBox(shadow: const [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))], name: 'Shadow S'),
            _ShadowBox(shadow: const [BoxShadow(color: Colors.black26, blurRadius: 8, offset: Offset(0, 4))], name: 'Shadow M'),
            _ShadowBox(shadow: const [BoxShadow(color: Colors.black38, blurRadius: 12, offset: Offset(0, 6))], name: 'Shadow L'),
            _ShadowBox(shadow: const [BoxShadow(color: Colors.black45, blurRadius: 16, offset: Offset(0, 8))], name: 'Shadow XL'),
          ],
        ),
      ),
    );
  }
}

class _ColorBox extends StatelessWidget {
  final Color color;
  final String name;

  const _ColorBox({
    required this.color,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      height: 100,
      color: color,
      child: Center(
        child: Text(
          name,
          style: AppTypography.smallbody02.copyWith(
            color: color.computeLuminance() > 0.5 ? Colors.black : Colors.white,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}

class _ShadowBox extends StatelessWidget {
  final List<BoxShadow> shadow;
  final String name;

  const _ShadowBox({
    required this.shadow,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      width: 200,
      height: 100,
      decoration: BoxDecoration(
        color: context.colors.backgroundCards,
        borderRadius: BorderRadius.circular(8),
        boxShadow: shadow,
      ),
      child: Center(
        child: Text(name, style: AppTypography.bodyregular),
      ),
    );
  }
}