#!/bin/bash
# HTML Update Script - Implements <picture> elements with optimized images

set -e

echo "🔧 Updating HTML with Optimized Media"
echo "======================================"

# Backup original files
echo "Creating backups..."
cp index.html index.html.backup
echo "✓ Created index.html.backup"

# Update index.html with optimized profile image
echo ""
echo "Updating profile image in index.html..."

# Create temporary file with the new picture element
cat > /tmp/picture-element.html << 'EOF'
          <picture>
            <source type="image/avif"
                    srcset="images/optimized/kgprofile-320.avif 320w,
                            images/optimized/kgprofile-640.avif 640w,
                            images/optimized/kgprofile-800.avif 800w"
                    sizes="(max-width: 600px) 100vw, 400px">
            <source type="image/webp"
                    srcset="images/optimized/kgprofile-320.webp 320w,
                            images/optimized/kgprofile-640.webp 640w,
                            images/optimized/kgprofile-800.webp 800w"
                    sizes="(max-width: 600px) 100vw, 400px">
            <img src="images/optimized/kgprofile-640.jpg"
                 alt="Professional headshot of the architect, Karin Gunnerek."
                 class="about__headshot"
                 loading="lazy"
                 decoding="async"
                 width="400"
                 height="400">
          </picture>
EOF

# Use sed to replace the old img tag (we'll do this manually to be safe)
# Since sed can be tricky with multiline, let's create a Python script instead

cat > /tmp/update_html.py << 'PYTHON_SCRIPT'
import re

# Read the original HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to match the old profile image
old_image_pattern = r'<img src="kgprofile\.jpg"[^>]*class="about__headshot"[^>]*>'

# New picture element
new_picture = '''<picture>
            <source type="image/avif"
                    srcset="images/optimized/kgprofile-320.avif 320w,
                            images/optimized/kgprofile-640.avif 640w,
                            images/optimized/kgprofile-800.avif 800w"
                    sizes="(max-width: 600px) 100vw, 400px">
            <source type="image/webp"
                    srcset="images/optimized/kgprofile-320.webp 320w,
                            images/optimized/kgprofile-640.webp 640w,
                            images/optimized/kgprofile-800.webp 800w"
                    sizes="(max-width: 600px) 100vw, 400px">
            <img src="images/optimized/kgprofile-640.jpg"
                 alt="Professional headshot of the architect, Karin Gunnerek."
                 class="about__headshot"
                 loading="lazy"
                 decoding="async"
                 width="400"
                 height="400">
          </picture>'''

# Replace the old image with new picture element
html = re.sub(old_image_pattern, new_picture, html, flags=re.DOTALL)

# Update hero video
old_video_pattern = r'<video[^>]*class="hero__video"[^>]*>.*?</video>'

new_video = '''<video
          class="hero__video"
          autoplay
          muted
          playsinline
          loop
          preload="metadata"
          poster="images/optimized/hero-poster.webp"
          aria-hidden="true">
          <source src="images/optimized/hero-video.webm" type="video/webm">
          <source src="images/optimized/hero-video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>'''

html = re.sub(old_video_pattern, new_video, html, flags=re.DOTALL)

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✓ Updated index.html")
PYTHON_SCRIPT

# Run the Python script
python3 /tmp/update_html.py

echo "✓ Profile image updated to use <picture> element with srcset"
echo "✓ Hero video updated with optimized versions and poster"

echo ""
echo "📝 Summary of Changes:"
echo "======================"
echo ""
echo "Profile Image (about section):"
echo "  • Now uses <picture> element"
echo "  • Serves AVIF for modern browsers (best compression)"
echo "  • Falls back to WebP for older modern browsers"
echo "  • Falls back to JPEG for legacy browsers"
echo "  • Responsive: serves appropriate size based on viewport"
echo ""
echo "Hero Video:"
echo "  • Added WebM format (better compression than MP4)"
echo "  • Added poster image for instant visual"
echo "  • Uses preload='metadata' (loads only metadata, not full video)"
echo "  • Falls back to MP4 for older browsers"
echo ""
echo "Expected Results:"
echo "  • Profile image: ~999KB → ~50-150KB (80-85% reduction)"
echo "  • Hero video: ~1.9MB → ~500KB-1MB (50-75% reduction)"
echo "  • Faster page load, especially on mobile"
echo "  • Better Core Web Vitals (LCP, CLS)"
echo ""
echo -e "\033[0;32m✅ HTML Update Complete!\033[0m"
echo ""
echo "Next steps:"
echo "  1. Test the website locally: open index.html in a browser"
echo "  2. Verify images/video load correctly"
echo "  3. Check responsive behavior (resize browser)"
echo "  4. If all looks good, commit the changes"
echo ""
echo "To restore original if needed:"
echo "  mv index.html.backup index.html"
