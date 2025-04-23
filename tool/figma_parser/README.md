# PDF Figma Variables Parser

This tool parses Figma variables exported as JSON and generates Flutter Dart code for theme-aware colors.

## Usage

1. Export your Figma variables:
   - In Figma, go to File > Export Variables
   - Save the JSON file to `input/figma-variables.json`

2. Run the parser:
node src/parser.js

3. Find the generated code in `output/generated/colors.dart`

4. Copy the generated file to your Flutter project

## Structure

- `src/parser.js`: Main parser script
- `src/templates/colors.template.js`: Template for generating colors.dart
- `input/figma-variables.json`: Your exported Figma variables
- `output/generated/colors.dart`: Generated Flutter code

## Requirements

- Node.js 12+
- Figma variables with light/dark mode variants

