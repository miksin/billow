#!/bin/bash

# Define the directory containing the SVG files
ICON_DIR="./src/assets/icons"

# Define the output file
OUTPUT_FILE="$ICON_DIR/icon.d.ts"

# Start the TypeScript declaration file
echo -n "declare type IconName = \"" > $OUTPUT_FILE

# Loop through each SVG file in the directory
for file in $ICON_DIR/*.svg; do
  # Extract the base name of the file (without extension)
  base_name=$(basename "$file" .svg)
  
  # Append the base name to the TypeScript declaration file
  echo -n "$base_name\" | \"" >> $OUTPUT_FILE
done

# Remove the trailing ' | "' and add a semicolon at the end
sed -i '$ s/ | "$/;/' $OUTPUT_FILE

echo "TypeScript declaration file generated at $OUTPUT_FILE"