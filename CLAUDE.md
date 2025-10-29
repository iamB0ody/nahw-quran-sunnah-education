# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page landing website for "سلسلة في رحاب اللغة والقرآن والسنة" (Series in the Realm of Language, Quran, and Sunnah) - an Islamic educational book series focused on teaching Arabic grammar (النحو), Quranic recitation (التجويد), and Quranic reading through traditional Islamic texts.

## Technology Stack

- Pure HTML with inline Tailwind CSS (loaded via CDN)
- RTL (right-to-left) layout for Arabic language
- Google Fonts: 'Amiri Quran' for Quranic text and Hadith, 'Tajawal' for body text
- No build process, bundler, or compilation required

## Development

### Running the Website

Simply open `index.html` in any modern web browser. No server or build process is needed.

For local development with live reload, you can use any simple HTTP server:
```bash
python -m http.server 8000
# or
npx serve
```

### File Structure

This is a single-file project:
- `index.html` - The complete landing page with all content, styles, and structure

## Content Structure

The landing page is organized into the following sections:

1. **Hero Section** - Features Quranic verse (العلق:1) and Hadith about learning Quran
2. **Intro Section** - Vision and mission statement of the series
3. **Goals Section** - 6 key objectives and features
4. **Levels Section** - Three educational levels with book listings:
   - Level 1 (التمهيدي والمبتدئ): 4 books including grammar and tajweed fundamentals
   - Level 2 (المتوسط): 2 books for intermediate learners
   - Level 3 (المتقدم): 2 advanced books based on Hadith and stories
5. **Footer** - Closing inspiration and copyright

## Design System

- Color scheme: Emerald green (#059669, #047857, #065f46) representing Islamic aesthetics
- Background: Warm off-white (#faf8f5)
- Typography hierarchy uses specific fonts for different content types:
  - `.quran` and `.hadith` classes use 'Amiri Quran' serif font
  - Body text uses 'Tajawal' sans-serif
- Responsive grid layouts using Tailwind's md: and lg: breakpoints

## Important Notes

- The page uses `dir="rtl"` and `lang="ar"` for proper Arabic text rendering
- All book images are placeholders (placehold.co) - replace with actual book covers when available
- Purchase links (`href="#"`) are not yet implemented - these need to be connected to an e-commerce solution
