### ZIRME - Zero-Installation Resizing & Manipulation Engine

**Professional batch image processing tool that runs 100% in your browser**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)]()
[![Pure HTML](https://img.shields.io/badge/tech-HTML5-orange.svg)]()

### What is [ZIRME](https://zirme.net)?

ZIRME is a **zero-installation**, **privacy-first** image processing tool designed for ML datasets, e-commerce catalogs, social media content, and professional photography workflows. Everything runs locally in your browser - **no uploads, no servers, no tracking**.

### Key Features

- ✅ **Zero Installation** - Single HTML file, no setup required
- ✅ **100% Local** - All processing happens in your browser
- ✅ **Privacy First** - Your images never leave your computer
- ✅ **Batch Processing** - Process hundreds of images simultaneously
- ✅ **ML-Powered** - Face and body detection with TensorFlow.js
- ✅ **Professional Tools** - Blur, pixelate, eraser, annotation, text
- ✅ **Smart Cropping** - AI-assisted crop with multiple modes

---

## 📦 What You Can Do

### Image Processing
- **Batch resize** up to 1000+ images with custom dimensions
- **Intelligent cropping** with Auto, Face, Body, and Manual modes
- **Export formats**: Original, Cropped, Both (separate folders)
- **Multiple aspect ratios** with smart focal point adjustment

### Privacy & Anonymization
- **Blur tool** with adjustable strength and hardness
- **Pixelate tool** for license plates, faces, sensitive info
- **3-in-1 Eraser**: Transparent, Solid color, Smart fill
- **Content-aware fill** for seamless object removal

### Annotation & Markup
- **Drawing tools** with customizable brush (thickness, hardness, opacity)
- **Text tool** with live editing, drag-to-position, 8 fonts
- **Color picker** with presets and HEX input
- **Professional output** for QA, documentation, dataset labeling

---

## 🎯 Use Cases

### ML / AI Datasets
- Crop thousands of images to exact dimensions (e.g., 512×512)
- Face detection for facial recognition datasets
- Body detection for pose estimation datasets
- Batch anonymization with blur/pixelate
- Add labels and annotations for ground truth

### E-Commerce
- Product background removal (transparent PNG)
- Consistent crop sizes for catalog
- Batch watermark removal (smart fill)
- Quick photo touch-ups

### Social Media
- Resize for Instagram/Facebook/Twitter
- Privacy protection (blur faces, plates)
- Add text overlays
- Consistent aspect ratios

### Photography
- Batch resize for web galleries
- Smart cropping for portraits
- Remove unwanted objects
- Professional retouching

---

## 🛠️ Tools Overview

### ✂️ Crop Tool
- **Auto Mode**: SmartCrop algorithm finds best composition
- **Face Mode**: ML face detection, auto-centers on faces
- **Body Mode**: COCO-SSD body detection, crops from clavicle down
- **Manual Mode**: 9-point focal grid for precise control
- **Free Crop**: Unlock aspect ratio for custom dimensions

### 🌫️ Blur Tool
- Gaussian blur with adjustable strength (1-60px)
- Brush size: 5-500px
- Hardness control: 0-95%
- Opacity: 10-100%
- Perfect for privacy, backgrounds, or artistic effects

### 🔲 Pixelate Tool
- Pixelation effect with adjustable pixel size (2-40px)
- Same brush controls as blur
- Ideal for license plates, faces, logos

### 🪄 Eraser (3-in-1)
- **Transparent**: Remove to transparency (PNG export)
- **Solid Color**: Fill with custom color
- **Smart Fill**: Content-aware edge clone (no blur)
- Full hardness and opacity control

### ✏️ Annotate
- **Draw Mode**: Freehand drawing with hardness control
- **Text Mode**: Live editable text, drag-to-position
- 8 professional fonts (Inter, Arial, Georgia, Courier, etc.)
- Custom colors with HEX input
- Size: 12-120px, Opacity: 10-100%

---

## 🚀 Getting Started

### Quick Start
1. Download `ZIRME.html`
2. Open in any modern browser (Chrome, Firefox, Edge, Safari)
3. Drag & drop images or click "Select Images"
4. Configure output size and tools
5. Export All or Export Selected

### Supported Formats
- **Input**: JPG, PNG, WEBP, GIF
- **Output**: JPG (default), PNG (for transparency)

### System Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- 4GB+ RAM recommended for large batches
- No internet required (after libraries load)

---

## 📖 How to Use

### Basic Workflow
```
1. Load Images → 2. Configure Size → 3. Choose Mode → 4. Apply → 5. Export
```

### Advanced Workflow
```
1. Load 100+ images
2. Set output: 1024×1024
3. Mode: Body detection
4. Enable "Ensure minimum size"
5. Process batch (auto-applies to all)
6. Review results
7. Edit individual images if needed
   - Enter edit mode
   - Use Blur/Eraser/Annotate
   - Apply changes
8. Export All → Separate folders
```

---

## ⚙️ Configuration Options

### Output Settings
- **Width & Height**: 1-4096px
- **Aspect Ratio**: Free, 1:1, 4:3, 16:9, 9:16, 3:4, or custom
- **Border**: Optional border (0-100px) with custom color

### Crop Modes
- **Auto**: SmartCrop algorithm (best composition)
- **Face**: ML face detection (requires TensorFlow.js)
- **Body**: COCO-SSD detection (crops from clavicle)
- **Manual**: 9-point focal grid

### Export Options
- Original images only
- Cropped images only
- Both (in separate folders)
- ZIP download with organized structure

---

## 🎨 Tool Controls

### Brush Tools (Blur, Pixelate, Eraser, Draw)
- **Size**: 5-500px (eraser/draw), 1-30px (annotate thickness)
- **Hardness**: 0-95% (edge softness)
- **Opacity**: 10-100%
- **Color**: 6 presets + custom HEX

### Text Tool
- **Live Editing**: Type directly on canvas
- **Drag-to-Position**: Click and drag text box
- **Fonts**: Inter, Arial, Helvetica, Georgia, Times New Roman, Courier New, Verdana, Comic Sans MS
- **Size**: 12-120px
- **Opacity**: 10-100%
- **Color**: Full HEX support

---

## 🔬 Technical Details

### Performance Optimizations
- **Lazy loading**: ML libraries load on-demand (first use only)
- **Batch processing**: 10 images parallel, reduces re-renders by 90%
- **React.memo**: Only re-renders changed images
- **Web Workers**: Offload processing from main thread (when available)

### Processing Speed (avg, modern PC)
- **10 images SmartCrop**: ~2-3 seconds
- **50 images SmartCrop**: ~12-15 seconds
- **100 images Face detection**: ~15-20 seconds
- **Export 100 images**: ~8-10 seconds

### Memory Usage
- Base: ~150MB
- +100 images (5MB each): ~500MB-1GB
- Optimized: Frees original images after processing

### Libraries Used
- React 18.2.0 (UI)
- JSZip 3.10.1 (export)
- SmartCrop 2.0.5 (auto crop)
- TensorFlow.js 4.11.0 (ML foundation, lazy loaded)
- COCO-SSD 2.2.3 (body detection, lazy loaded)
- Face-API 1.7.12 (face detection, lazy loaded)

---

## 🔐 Privacy & Security

- **Zero telemetry**: No tracking, analytics, or data collection
- **Offline capable**: Works without internet (after first load)
- **Local processing**: Images never uploaded anywhere
- **No cookies**: No persistent tracking
- **Open source**: Fully auditable single HTML file

---

## 📝 Changelog

### v4.0 (Current)
- ✨ Live text editor (Photoshop-style)
- ✨ Custom HEX color picker (no native popup)
- ✨ Smart Fill V3 (edge clone, no blur)
- ✨ Body detection from clavicle (not lips)
- ✨ Minimum size mode for Face/Body (flexible, not forced)
- 🎨 White default color for better visibility
- 🐛 Color picker now works correctly

### v3.0
- ✨ Annotate tool with Draw/Text modes
- ✨ Eraser tool with 3 modes
- ✨ Hardness control for all brush tools
- ✨ ML detection optimization

### v2.0
- ⚡ Performance optimizations (batch processing, React.memo)
- ⚡ Lazy loading for ML libraries (-80% initial load)
- 🎨 Improved smart crop algorithm

### v1.0
- 🎉 Initial release
- ✂️ Basic crop functionality
- 🌫️ Blur and pixelate tools
- 📦 Batch export

---

## 🤝 Contributing

Contributions are welcome! This is a single-file project, so:

1. Fork the repo
2. Make changes to `ZIRME.html`
3. Test thoroughly (multiple browsers, large batches)
4. Submit PR with clear description

### Development Guidelines
- Keep everything in single HTML file
- Maintain zero external dependencies (except CDN libs)
- Optimize for performance (avoid unnecessary re-renders)
- Test with 100+ images
- Follow existing code style

---

## 📄 License

MIT License - See LICENSE file for details

**TL;DR**: Free for personal and commercial use. No warranty.

---

## 🙏 Credits

- SmartCrop.js by Jonas Wagner
- TensorFlow.js by Google
- COCO-SSD by Google Research
- Face-API by Vladimir Mandic
- Icons: Custom SVG (no external dependencies)

---

## ⚠️ Known Limitations

- **Smart Fill**: Works best on areas <150px, uniform backgrounds
- **ML Detection**: Requires modern browser, ~500KB download (first use)
- **Memory**: Large batches (500+) may require 8GB+ RAM
- **Export**: Browser may limit ZIP size (~500MB on some browsers)

---

## 💡 Tips & Tricks

### For Best Results
- **Face Detection**: Use "Ensure minimum size" ON for flexible crops
- **Body Detection**: Starts from clavicle, perfect for clothing datasets
- **Smart Fill**: Use hardness 40-60% for most natural results
- **Text Tool**: Drag text box to position before applying
- **Batch Processing**: Select all → Apply mode → Export

### Performance Tips
- Close other browser tabs
- Process in batches of 100-200 for very large sets
- Use JPEG export for smaller file sizes (PNG for transparency)

### Common Workflows
1. **Dataset Prep**: Load → Body/Face → Ensure min size → Export
2. **Privacy**: Load → Edit each → Blur faces → Export
3. **E-commerce**: Load → Manual crop → Add text → Export
4. **Quick Resize**: Load → Set size → Auto mode → Export

---

## 📧 Support

- **Issues**: GitHub Issues (bug reports, feature requests)
- **Discussions**: GitHub Discussions (questions, ideas)
- **Documentation**: This README + inline tooltips

---

## 🌟 Star History

If you find ZIRME useful, please star the repo! It helps others discover the tool.

---

**Made with ❤️ for ML engineers, photographers, and privacy enthusiasts**

**Zero installation. Maximum control. Complete privacy.**
