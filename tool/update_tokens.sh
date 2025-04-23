#!/bin/bash
set -e

# Change to the figma_parser directory
cd "$(dirname "$0")/figma_parser"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the parser
echo "Running parser..."
npm run parse

# Copy generated files to lib/src
echo "Copying generated files to lib/src..."
cp output/generated/app_colors.dart ../../lib/src/colors.dart
cp output/generated/app_typography.dart ../../lib/src/typography.dart
cp output/generated/app_spacing.dart ../../lib/src/spacing.dart
cp output/generated/app_borders.dart ../../lib/src/borders.dart

echo "Done! Design tokens updated."