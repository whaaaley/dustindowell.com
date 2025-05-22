#!/bin/bash

# Define the screenshot directory
SCREENSHOT_DIR="/home/nixos/projects/dustindowell.com/src/assets/screenshots"
BACKUP_DIR="${SCREENSHOT_DIR}/backup"

# Back up original files
echo "Backing up original screenshots..."
find "$SCREENSHOT_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -not -path "$BACKUP_DIR/*" | while read img; do
  # Get the relative path from the screenshot directory
  rel_path="${img#$SCREENSHOT_DIR/}"
  # Create the backup directory structure if it doesn't exist
  mkdir -p "$BACKUP_DIR/$(dirname "$rel_path")"
  # Copy the file to the backup directory
  cp "$img" "$BACKUP_DIR/$rel_path"
  echo "Backed up: $rel_path"
done

# Process each image file
echo -e "\nResizing screenshots to 1366x1024..."
find "$SCREENSHOT_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -not -path "$BACKUP_DIR/*" | while read img; do
  echo "Resizing: $img"
  # Create a temporary file path
  temp_file="${img%.*}_temp.${img##*.}"
  # Resize the image to 1366x1024 while preserving aspect ratio and centering
  nix-shell -p imagemagick --run "convert \"$img\" -resize 1366x1024\! \"$temp_file\""
  # Replace the original with the resized version
  mv "$temp_file" "$img"
done

echo -e "\nAll images have been resized to 1366x1024"
echo "Original images are backed up in: $BACKUP_DIR"
