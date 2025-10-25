# Media Optimization Guide

This guide will help you optimize your images and video to drastically improve website performance.

## What Will Be Optimized

### Profile Image (`kgprofile.jpg`)
- **Current size**: 999KB
- **Expected final size**: 50-150KB per size variant
- **Reduction**: ~80-85% smaller

### Hero Video (`Architectural_Idea_s_Looping_Video_Journey.mp4`)
- **Current size**: 1.9MB
- **Expected final size**: 500KB-1MB
- **Reduction**: ~50-75% smaller

## Quick Start (3 Simple Steps)

### Step 1: Install Required Tools

**macOS (using Homebrew):**
```bash
brew install ffmpeg webp imagemagick
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg webp imagemagick
```

**Windows (using Scoop):**
```bash
scoop install ffmpeg imagemagick
# For WebP, download from: https://developers.google.com/speed/webp/download
```

### Step 2: Run the Optimization Script

```bash
./optimize-media.sh
```

This will:
- Create multiple sizes of your profile image (320px, 640px, 800px)
- Convert images to WebP and AVIF formats
- Compress your hero video to MP4 and WebM
- Create a poster image for the video
- Show you size comparisons

**Output location**: `images/optimized/`

### Step 3: Update Your HTML

```bash
./update-html-with-optimized-media.sh
```

This will:
- Backup your current `index.html` (saved as `index.html.backup`)
- Replace the profile image with a `<picture>` element
- Update the hero video to use optimized versions
- Add responsive image serving (srcset)

## What Gets Created

After running the optimization script, you'll have:

### Profile Image Variants
```
images/optimized/
├── kgprofile-320.jpg     (~30-50KB)   - Mobile small
├── kgprofile-640.jpg     (~80-120KB)  - Mobile/tablet
├── kgprofile-800.jpg     (~120-180KB) - Desktop
├── kgprofile-320.webp    (~20-35KB)   - Mobile small (WebP)
├── kgprofile-640.webp    (~50-80KB)   - Mobile/tablet (WebP)
├── kgprofile-800.webp    (~80-120KB)  - Desktop (WebP)
├── kgprofile-320.avif    (~15-30KB)   - Mobile small (AVIF)
├── kgprofile-640.avif    (~40-70KB)   - Mobile/tablet (AVIF)
└── kgprofile-800.avif    (~60-100KB)  - Desktop (AVIF)
```

### Video Variants
```
images/optimized/
├── hero-video.mp4        (~500KB-1MB)  - Optimized H.264
├── hero-video.webm       (~300-700KB)  - VP9 (best compression)
├── hero-poster.jpg       (~50-100KB)   - Video poster frame
└── hero-poster.webp      (~30-60KB)    - Video poster (WebP)
```

## How It Works

### Responsive Image Serving

The HTML will be updated to use the `<picture>` element:

```html
<picture>
  <!-- Modern browsers get AVIF (smallest) -->
  <source type="image/avif" srcset="..." sizes="...">

  <!-- Older modern browsers get WebP -->
  <source type="image/webp" srcset="..." sizes="...">

  <!-- Legacy browsers get JPEG -->
  <img src="images/optimized/kgprofile-640.jpg" alt="...">
</picture>
```

**Browser picks the best format it supports:**
- Chrome 85+, Edge 85+, Firefox 93+ → AVIF (smallest)
- Chrome 23+, Firefox 65+, Safari 14+ → WebP (small)
- All browsers → JPEG (fallback)

**Browser picks the right size based on viewport:**
- Mobile (< 600px) → 320px image
- Tablet (600-1000px) → 640px image
- Desktop (> 1000px) → 800px image

### Video Optimization

The hero video will use:
1. **WebM with VP9 codec** - Best compression (modern browsers)
2. **MP4 with H.264 codec** - Good compression (all browsers)
3. **Poster image** - Shows instantly while video loads
4. **Metadata preload** - Only loads video metadata, not full video initially

## Testing

After running the scripts:

1. **Open index.html locally in a browser**
2. **Open DevTools > Network tab**
3. **Reload the page**
4. **Check what gets loaded:**
   - Chrome/Edge should load `.avif` images
   - Firefox should load `.webp` images
   - Video should show poster first, then load

5. **Test responsive behavior:**
   - Resize browser window
   - Check Network tab to see different sizes loading

6. **Performance check:**
   - Run Lighthouse in Chrome DevTools
   - Look for improved LCP (Largest Contentful Paint)
   - Check reduced page weight

## Before & After Comparison

### Before Optimization
```
Page Load Size:
  Profile Image:  999KB
  Hero Video:     1.9MB
  Total:          ~2.9MB

Load Time (3G):   ~15-20 seconds
LCP:              ~8-12 seconds
```

### After Optimization
```
Page Load Size:
  Profile Image:  50-150KB (depending on device)
  Hero Video:     500KB-1MB
  Total:          ~600KB-1.2MB

Load Time (3G):   ~3-5 seconds
LCP:              ~2-3 seconds

Improvement:      ~60-75% reduction
```

## Reverting Changes

If something goes wrong:

```bash
# Restore original HTML
mv index.html.backup index.html

# Remove optimized images (optional)
rm -rf images/optimized
```

## Troubleshooting

### "Command not found: ffmpeg/cwebp/convert"
→ You need to install the tools (see Step 1)

### "Permission denied"
```bash
chmod +x optimize-media.sh update-html-with-optimized-media.sh
```

### Images look blurry
→ Adjust quality settings in `optimize-media.sh`:
- Change `-quality 85` to `-quality 90` for JPEG
- Change `-q 85` to `-q 90` for WebP

### Video is too large/small
→ Edit `optimize-media.sh` and change:
- Resolution: `-vf scale=1280:-2` (change 1280)
- Quality: `-crf 28` (lower = better quality, larger size)

### AVIF not created
→ Your ffmpeg might not support AVIF (it's optional, WebP is sufficient)

## Next Steps

After optimization:

1. ✅ Test locally
2. ✅ Commit changes:
   ```bash
   git add images/optimized/ index.html .gitignore
   git commit -m "Optimize images and video for performance"
   ```
3. ✅ Push changes
4. ✅ Deploy to production
5. ✅ Run Lighthouse on live site to verify improvements

## Performance Impact

Expected improvements:
- **Page load**: 60-75% faster
- **Mobile data usage**: 60-75% less
- **LCP (Largest Contentful Paint)**: From ~8s to ~2s
- **Google PageSpeed Score**: +20-30 points
- **User experience**: Much snappier, especially on mobile

## Questions?

If you run into issues:
1. Check the error message from the scripts
2. Verify all tools are installed: `ffmpeg --version`, `cwebp -version`, `convert --version`
3. Make sure you're in the correct directory (should have `kgprofile.jpg` and the video file)

---

**Ready to optimize? Run: `./optimize-media.sh`**
