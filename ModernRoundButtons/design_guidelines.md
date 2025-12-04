# Design Guidelines for CLEM by Clément Caillot

## Design Approach
**Reference-Based Approach**: Educational platform inspired by modern learning management systems (Khan Academy, Coursera) with a distinctly French national identity through color and typography.

## Core Visual Identity

### Color Palette
- **Primary Colors**: French flag palette (Blue #0055A4, White #FFFFFF, Red #EF4135)
- **Dark Mode**: Implement full dark theme toggle with inverted color scheme
- Use tricolor accent system throughout interface elements

### Typography
- **Headings**: Bold, modern sans-serif (2-3 weight variations)
- **Body**: Clean, readable sans-serif optimized for educational content
- **Hierarchy**: Clear distinction between chapter titles, section headers, course content, and exercise text

## Layout System

### Spacing
- **Tailwind units**: Consistent use of p-4, p-6, p-8, m-4, m-6 for section spacing
- **Vertical rhythm**: py-12 mobile, py-16 tablet, py-20 desktop for major sections
- **Component spacing**: gap-4 for cards, gap-6 for section divisions

### Component Library

**Navigation**
- Top navigation bar with logo "CLEM by Clément Caillot"
- Mobile: Animated hamburger menu (round, French-themed, sliding panel)
- Desktop: Horizontal navigation with dropdown for subject selection

**Subject Cards**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Round corners with shadow elevation
- Hover animations (lift effect, glow)
- Subject icon + title + chapter count

**Chapter Structure**
- Expandable/collapsible sections for: Introduction → Course → Summary → Exercises → Corrections
- Progress indicators showing completion
- Bookmark icon for favorites (filled/outlined states)

**Buttons**
- **Critical Design Rule**: All buttons use border-radius: 999px (fully round)
- Primary: French blue background, white text
- Secondary: White background, blue border
- Accent: Red for important actions
- Hover states: Scale transform + shadow increase + slight color shift
- Active states: Pressed effect with scale reduction

**Search Bar**
- Prominent placement in header
- Round input field matching button style
- Real-time suggestions dropdown
- Highlighted search terms in results (yellow background)

**Video Modals**
- Centered modal with backdrop blur
- Round "Watch Video" button on chapters
- YouTube embed with lazy loading
- Close button (X) in top-right, round background

**AI Assistant Interface**
- Floating round button (bottom-right, fixed position)
- Opens chat panel with slide-in animation
- Message bubbles (round corners)
- Input field with send button (round)
- French flag colors for AI responses

**Favorites Page**
- Saved chapters displayed as cards
- Remove button (round, red accent)
- Empty state illustration when no favorites

**Dark Mode Toggle**
- Round switch button in header
- Moon/sun icon transition
- Smooth color transitions across entire site

## Animations

**Micro-interactions**
- Button hover: transform scale(1.05) + shadow enhancement
- Card hover: translateY(-4px) + shadow increase
- Menu transitions: slide/fade combinations
- Modal open/close: scale + opacity animations
- Search results: stagger fade-in

**Page Transitions**
- Smooth scrolling to sections
- Content fade-in on load
- Chapter expand/collapse with height animation

## Content Presentation

**Educational Content Layout**
- Full-width container with max-w-4xl for readability
- Introduction: Light blue background panel
- Course content: White/dark background with clear typography hierarchy
- Summary: Highlighted box with key points in bullet format
- Exercises: Numbered list with space for student work visualization
- Corrections: Expandable sections (initially collapsed) with green accent

**Media Integration**
- Video thumbnails with play overlay
- External link icons (open in new tab indicator)
- Example boxes with distinct background treatment

## Responsive Behavior

**Mobile (base)**
- Single column layout
- Stacked navigation (hamburger menu)
- Full-width cards and content
- Bottom-fixed AI assistant button

**Tablet (md:)**
- Two-column grids for subject cards
- Expanded search bar
- Side-by-side content where appropriate

**Desktop (lg:)**
- Three-column subject grids
- Persistent navigation
- Optimal reading width for course content
- Enhanced hover states and animations

## Images
No hero image required. Focus on:
- Subject icons (Math, French, Science symbols)
- Illustration placeholders for empty states
- Video thumbnails for each chapter
- French flag motif elements as decorative accents

This design prioritizes functionality and educational clarity while maintaining a modern, animated, distinctly French visual identity with comprehensive interactive features.