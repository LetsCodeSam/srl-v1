# Implementation Plan - srl-v1 Video Playlist Template

This project is designed as a **Template**. All video content, categories, and metadata are driven by a single `public/data.json` file, allowing easy updates without code changes.

## Core Features
- **JSON-Driven Content**: All categories, titles, descriptions, durations, and URLs are loaded from `data.json`.
- **Embedded Modal Player**: Videos play within a high-fidelity modal (frosted glass/blur effect) to keep the user in the app context.
- **Sidebar Tree Navigation**: A modern, collapsible tree structure to navigate categories and sub-categories.
- **PWA Ready**: Standard-compliant manifest and service worker for "Add to Home Screen" on iOS and Android.

## New Feature: Global Search (Home)
- **Home View**: A new navigation item to see all videos across all categories.
- **Global Search**: Search through every video title and description in the entire `data.json`.
- **Search Result Context**: Highlighting which category a video belongs to when in Home view.

## Platform-Specific Convenience
- **Desktop**: Persistent or collapsible sidebar for quick navigation; multi-column grid for overview.
- **iOS/Android**: Sidebar becomes a touch-friendly drawer; single-column grid with large touch targets; `theme-color` optimization for mobile status bars.
- **Embedded Player**: Uses `aspect-video` (16:9) to ensure perfect viewing on all screen sizes.

## Design System: "Nordic Midnight"
- **Colors**: Deep Charcoals (#121212), Teal Accents (#2DD4BF), Indigo Glow (#6366F1).
- **Effects**: Frosted glass (backdrop-filter), subtle gradients, and smooth slide-in transitions for the sidebar.

## Proposed Changes

### [Branding]
- **Icon**: High-fidelity SRL icon generated for PWA splash screens and home screen icons.

### [Data Schema]
#### [MODIFY] [srl-v1/public/data.json](file:///C:/Users/NOSAMCH1/source/repos/LetsCodeSam/srl-v1/public/data.json)
- Define the standard schema: `title`, `description`, `url`, `duration`, `difficulty`, `tags`.

### [Frontend Components]
#### [NEW] [srl-v1/src/components/VideoModal.tsx](file:///C:/Users/NOSAMCH1/source/repos/LetsCodeSam/srl-v1/src/components/VideoModal.tsx)
- Responsive modal using Tailwind and Framer Motion for smooth entry.
- Supports YouTube and Vimeo embed logic.

#### [NEW] [srl-v1/src/components/Sidebar.tsx](file:///C:/Users/NOSAMCH1/source/repos/LetsCodeSam/srl-v1/src/components/Sidebar.tsx)
- Tree navigation that maps the JSON structure.

## Verification Plan
1. **Data Hot-Reload**: Update `data.json` and verify the UI updates instantly.
2. **Player Logic**: Test both YouTube and Vimeo links in the embedded modal.
3. **PWA**: Verify the generated icon appears correctly on mobile previews.
