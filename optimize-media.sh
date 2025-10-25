#!/bin/bash
# Media Optimization Script for karingunnerek.com
# This script will optimize images and video while maintaining high quality

set -e  # Exit on error

echo "🎨 Media Optimization Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependencies() {
    echo "Checking dependencies..."

    MISSING_DEPS=()

    if ! command -v ffmpeg &> /dev/null; then
        MISSING_DEPS+=("ffmpeg")
    fi

    if ! command -v cwebp &> /dev/null; then
        MISSING_DEPS+=("webp")
    fi

    if ! command -v convert &> /dev/null; then
        MISSING_DEPS+=("imagemagick")
    fi

    if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Missing dependencies: ${MISSING_DEPS[*]}${NC}"
        echo ""
        echo "Install them with:"
        echo ""
        echo "macOS (Homebrew):"
        echo "  brew install ffmpeg webp imagemagick"
        echo ""
        echo "Ubuntu/Debian:"
        echo "  sudo apt-get install ffmpeg webp imagemagick"
        echo ""
        echo "Windows (via Scoop):"
        echo "  scoop install ffmpeg imagemagick"
        echo "  # For WebP, download from: https://developers.google.com/speed/webp/download"
        echo ""
        exit 1
    fi

    echo -e "${GREEN}✓ All dependencies installed${NC}"
}

# Create images directory if it doesn't exist
mkdir -p images/optimized

echo ""
echo "📸 Optimizing Profile Image (kgprofile.jpg)"
echo "============================================"

# Original: 999KB
# Target: ~100-200KB per size

# 1. Create JPEG versions at different sizes (optimized)
echo "Creating JPEG versions..."
convert kgprofile.jpg -resize 320x320 -quality 85 -strip images/optimized/kgprofile-320.jpg
convert kgprofile.jpg -resize 640x640 -quality 85 -strip images/optimized/kgprofile-640.jpg
convert kgprofile.jpg -resize 800x800 -quality 85 -strip images/optimized/kgprofile-800.jpg

# 2. Create WebP versions (best compression, excellent quality)
echo "Creating WebP versions..."
cwebp -q 85 -resize 320 320 kgprofile.jpg -o images/optimized/kgprofile-320.webp
cwebp -q 85 -resize 640 640 kgprofile.jpg -o images/optimized/kgprofile-640.webp
cwebp -q 85 -resize 800 800 kgprofile.jpg -o images/optimized/kgprofile-800.webp

# 3. Create AVIF versions (even better compression, cutting-edge)
# Note: Requires ffmpeg with libavif support
echo "Creating AVIF versions (if supported)..."
if ffmpeg -version 2>&1 | grep -q "libavif"; then
    ffmpeg -i kgprofile.jpg -vf scale=320:320 images/optimized/kgprofile-320.avif -y
    ffmpeg -i kgprofile.jpg -vf scale=640:640 images/optimized/kgprofile-640.avif -y
    ffmpeg -i kgprofile.jpg -vf scale=800:800 images/optimized/kgprofile-800.avif -y
else
    echo "  ⚠️  AVIF not supported by your ffmpeg build (optional, skipping)"
fi

echo ""
echo "🎬 Optimizing Hero Video"
echo "========================"

# Original: 1.9MB
# Target: ~500KB-1MB with great quality

echo "Creating optimized MP4 (H.264, high quality)..."
ffmpeg -i Architectural_Idea_s_Looping_Video_Journey.mp4 \
    -vf scale=1280:-2 \
    -c:v libx264 \
    -preset slow \
    -crf 28 \
    -movflags +faststart \
    -an \
    images/optimized/hero-video.mp4 -y

echo "Creating WebM version (VP9, excellent compression)..."
ffmpeg -i Architectural_Idea_s_Looping_Video_Journey.mp4 \
    -vf scale=1280:-2 \
    -c:v libvpx-vp9 \
    -crf 35 \
    -b:v 0 \
    -an \
    images/optimized/hero-video.webm -y

# Create a poster image from the video
echo "Creating video poster image..."
ffmpeg -i Architectural_Idea_s_Looping_Video_Journey.mp4 \
    -vf "select=eq(n\,0),scale=1280:-2" \
    -frames:v 1 \
    images/optimized/hero-poster.jpg -y

# Convert poster to WebP too
cwebp -q 85 images/optimized/hero-poster.jpg -o images/optimized/hero-poster.webp

echo ""
echo "📊 Size Comparison"
echo "=================="

# Profile image comparison
echo ""
echo "Profile Image:"
echo "  Original:    $(du -h kgprofile.jpg | cut -f1)"
echo ""
echo "  JPEG sizes:"
echo "    320px:     $(du -h images/optimized/kgprofile-320.jpg | cut -f1)"
echo "    640px:     $(du -h images/optimized/kgprofile-640.jpg | cut -f1)"
echo "    800px:     $(du -h images/optimized/kgprofile-800.jpg | cut -f1)"
echo ""
echo "  WebP sizes:"
echo "    320px:     $(du -h images/optimized/kgprofile-320.webp | cut -f1)"
echo "    640px:     $(du -h images/optimized/kgprofile-640.webp | cut -f1)"
echo "    800px:     $(du -h images/optimized/kgprofile-800.webp | cut -f1)"

# Video comparison
echo ""
echo "Hero Video:"
echo "  Original MP4:    $(du -h Architectural_Idea_s_Looping_Video_Journey.mp4 | cut -f1)"
echo "  Optimized MP4:   $(du -h images/optimized/hero-video.mp4 | cut -f1)"
echo "  WebM:            $(du -h images/optimized/hero-video.webm | cut -f1)"
echo "  Poster (JPEG):   $(du -h images/optimized/hero-poster.jpg | cut -f1)"
echo "  Poster (WebP):   $(du -h images/optimized/hero-poster.webp | cut -f1)"

echo ""
echo -e "${GREEN}✅ Optimization Complete!${NC}"
echo ""
echo "📁 All optimized files are in: images/optimized/"
echo ""
echo "Next steps:"
echo "  1. Review the optimized images/videos"
echo "  2. Run the HTML update script to use the new images"
echo "  3. Test the website locally"
echo "  4. Commit and push the changes"
