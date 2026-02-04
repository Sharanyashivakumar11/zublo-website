#!/bin/bash

# Script to copy and rename content systems images from Downloads to images folder

IMAGES_DIR="/Users/sharanyashivakumar/Developer/Zublo LLC/images"
DOWNLOADS_DIR="/Users/sharanyashivakumar/Downloads"

echo "Content Systems Image Copier"
echo "============================"
echo ""
echo "This script will help you copy images from Downloads to the images folder."
echo ""
echo "IMPORTANT: You need to edit this script and replace the filenames below"
echo "with the actual filenames of your images in Downloads."
echo ""
echo "Example format:"
echo "  cp \"\$DOWNLOADS_DIR/your-image-1.jpg\" \"\$IMAGES_DIR/content-systems-nbc-1.jpg\""
echo ""

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

# ============================================
# NOTHING BUT CHICKEN (15 images)
# ============================================
# Replace the filenames below with your actual NBC image filenames
# Example: cp "$DOWNLOADS_DIR/IMG_9620 2.jpg" "$IMAGES_DIR/content-systems-nbc-1.jpg"

echo "Copying Nothing But Chicken images (15 images)..."
# TODO: Replace these with your actual filenames
# cp "$DOWNLOADS_DIR/YOUR_NBC_IMAGE_1.jpg" "$IMAGES_DIR/content-systems-nbc-1.jpg"
# cp "$DOWNLOADS_DIR/YOUR_NBC_IMAGE_2.jpg" "$IMAGES_DIR/content-systems-nbc-2.jpg"
# ... (repeat for all 15)

# ============================================
# PURVA NATURALS (12 images)
# ============================================
echo "Copying Purva Naturals images (12 images)..."
# TODO: Replace these with your actual filenames
# cp "$DOWNLOADS_DIR/YOUR_PURVA_IMAGE_1.jpg" "$IMAGES_DIR/content-systems-purva-1.jpg"
# cp "$DOWNLOADS_DIR/YOUR_PURVA_IMAGE_2.jpg" "$IMAGES_DIR/content-systems-purva-2.jpg"
# ... (repeat for all 12)

# ============================================
# URBAN DHARA (9 images)
# ============================================
echo "Copying Urban Dhara images (9 images)..."
# TODO: Replace these with your actual filenames
# cp "$DOWNLOADS_DIR/YOUR_URBAN_IMAGE_1.jpg" "$IMAGES_DIR/content-systems-urban-1.jpg"
# cp "$DOWNLOADS_DIR/YOUR_URBAN_IMAGE_2.jpg" "$IMAGES_DIR/content-systems-urban-2.jpg"
# ... (repeat for all 9)

echo ""
echo "Done! Check the images folder to verify the files were copied."
echo ""
echo "If you haven't edited this script yet, please:"
echo "1. Open this file: copy-images.sh"
echo "2. Replace the placeholder filenames with your actual image filenames"
echo "3. Run this script again: bash copy-images.sh"
