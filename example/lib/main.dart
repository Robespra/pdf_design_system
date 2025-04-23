import 'package:flutter/material.dart';
import 'package:pdf_design_system/pdf_design_system.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.system;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PDF Design System Example',
      theme: ThemeData.light().copyWith(
        extensions: [AppThemeColors.light],
      ),
      darkTheme: ThemeData.dark().copyWith(
        extensions: [AppThemeColors.dark],
      ),
      themeMode: _themeMode,
      home: HomePage(
        toggleTheme: _toggleTheme,
      ),
    );
  }

  void _toggleTheme() {
    setState(() {
      if (_themeMode == ThemeMode.light) {
        _themeMode = ThemeMode.dark;
      } else {
        _themeMode = ThemeMode.light;
      }
    });
  }
}

class HomePage extends StatelessWidget {
  final VoidCallback toggleTheme;

  const HomePage({required this.toggleTheme});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.colors.text, // Inverted for demonstration
      appBar: AppBar(
        title: Text('Design System Demo'),
        actions: [
          IconButton(
            icon: Icon(Icons.brightness_6),
            onPressed: toggleTheme,
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(AppSpacing.md),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'PDF Design System',
                style: AppTypography.bodyLarge.copyWith(
                  color: context.colors.text,
                ),
              ),
              SizedBox(height: AppSpacing.md),
              ElevatedButton(
                child: Text('Sample Button'),
                onPressed: () {},
              ),
            ],
          ),
        ),
      ),
    );
  }
}