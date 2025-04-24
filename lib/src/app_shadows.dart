
import 'package:flutter/material.dart';

// Shadow styles from the design system
class AppShadows {
  /// Default shadow for cards and elevated surfaces (1dp)
  static const List<BoxShadow> elevation1 = [
    BoxShadow(
      color: Color(0x14000000),
      offset: Offset(0, 1),
      blurRadius: 3,
      spreadRadius: 0,
    )
  ];

  /// Default shadow for slightly elevated components (2dp)
  static const List<BoxShadow> elevation2 = [
    BoxShadow(
      color: Color(0x1A000000),
      offset: Offset(0, 2),
      blurRadius: 4,
      spreadRadius: 0,
    )
  ];

  /// Default shadow for navigation drawers and modals (4dp)
  static const List<BoxShadow> elevation4 = [
    BoxShadow(
      color: Color(0x26000000),
      offset: Offset(0, 4),
      blurRadius: 8,
      spreadRadius: 0,
    )
  ];

  /// Default shadow for floating action buttons and menus (8dp)
  static const List<BoxShadow> elevation8 = [
    BoxShadow(
      color: Color(0x33000000),
      offset: Offset(0, 8),
      blurRadius: 16,
      spreadRadius: 0,
    )
  ];

  AppShadows._();
}
