module.exports = (shadowStyles) => {
  return `
import 'package:flutter/material.dart';

// Shadow styles from the design system
class AppShadows {
${shadowStyles.map(style => {
  const comment = style.description ? `  /// ${style.description}\n` : '';

  return `${comment}  static const List<BoxShadow> ${style.name} = [
${style.shadows.map(shadow => {
  return `    BoxShadow(
      color: Color(0x${shadow.color}),
      offset: Offset(${shadow.offsetX}, ${shadow.offsetY}),
      blurRadius: ${shadow.blurRadius},
      spreadRadius: ${shadow.spreadRadius || 0},
    )`;
}).join(',\n')}
  ];`;
}).join('\n\n')}

  AppShadows._();
}
`;
};