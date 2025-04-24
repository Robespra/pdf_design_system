# PDF Design System

Flutter design system package for PDF applications, auto-generated from Figma variables.

## Installation

Add this package to your Flutter project's pubspec.yaml:

```yaml
dependencies:
  pdf_design_system:
    git:
      url: https://github.com/Robespra/pdf_design_system.git
      ref: main  # or specific tag/commit


## Steps to use

### 1/ Export variables

Use Export/Import variables plugin to export variable. Place figma-variables.json into tool/figma_parser/input

### 2/ Export styles

Use Design Tokens plugin to export styles. Place figma-styles.json into tool/figma_parser/input

### 3/ Run parser

```npm
npm run parse

### 4/ Output dart files are generated in output/generated
All variables names and values are aligned with Figma. Enjoy !