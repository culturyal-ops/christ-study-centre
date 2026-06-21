# Christ Study Centre - Design System Update

## Overview
Complete redesign implementing a premium editorial design system inspired by high-end academic institutions. Navy & gold color palette with clean typography and sophisticated layouts.

## Key Changes

### 1. **Color Palette** (Updated)
- **Navy**: `#0A1628` - primary dark
- **Navy Mid**: `#1A2A42` - secondary dark
- **Cream**: `#F6F1E4` - background (was #FAFAFA)
- **Gold**: `#C9A84C` - accent
- **Bone**: `#E8E2D0` - light text on dark
- **Lines**: Subtle borders using gold/bone opacity

### 2. **Homepage Hero**
- **Full-bleed hero** with position:absolute nav overlay
- **Curved SVG transition** from hero to content
- **Stats strip** directly under hero with dark navy background
- **Photo placeholder tags** for future image placement
- **Premium typography** with Fraunces serif + Inter sans

### 3. **Navigation**
- Overlays the hero section
- Light bone text on transparent background
- Active states with gold underline
- Mobile-responsive with collapsible menu
- SVG crest icon added

### 4. **Typography System**
```css
Display: Fraunces (serif) - 36-92px
Headings: Fraunces - 30-46px
Body: Inter - 15px
Monospace: JetBrains Mono - labels/eyebrows
```

### 5. **Layout Components**

#### Ledger List
- Numbered index system (01, 02, 03...)
- Three-column grid: index | heading | description
- Horizontal ruled lines

#### Photo Slots
- 4:5 aspect ratio frames
- Decorative corner brackets
- Placeholder labels in monospace
- Pattern fill backgrounds

#### Split Layouts
- Side-by-side content + image
- Story sections with pull quotes
- Responsive stacking on mobile

#### Check Grid
- Dark panel with roman numerals (I, II, III...)
- Two-column methodology display
- 1px grid separation

#### Course Cards
- Three-column grid
- Grade labels in monospace
- Hover states
- Inline arrow links

### 6. **Button System**
```css
.btn - default outline button
.btn-solid - gold filled (nav CTA)
.btn-primary - navy filled (forms)
.btn-secondary - navy outline
```

### 7. **Sections**
- Consistent 104px vertical padding (64px mobile)
- Section-head: two-column intro layout
- Eyebrow labels with horizontal rule
- Border-bottom separators

### 8. **Dark Panels**
- Navy background sections
- Bone text color
- Gold accents
- Subtle pattern overlays

### 9. **CTA Section**
- Full-width navy background
- Centered content
- Pattern overlay
- Italic emphasis in headings

### 10. **Footer**
- Four-column grid
- Dark navy background
- Subdued color hierarchy
- Responsive two-column on mobile

## File Structure

```
app/
├── globals.css          ← Complete redesign
├── layout.tsx           ← Font setup
├── page.tsx             ← New hero layout
├── about/page.tsx       ← Needs update
├── courses/page.tsx     ← Needs update
├── contact/page.tsx     ← Needs update
└── login/page.tsx       ← Minimal update

components/
├── Navbar.tsx           ← Updated with SVG crest
├── Footer.tsx           ← Updated structure
└── Crest.tsx            ← Existing SVG component
```

## Next Steps

1. **Update remaining pages** (About, Courses, Contact) to match new design
2. **Add real photos** to replace placeholder frames
3. **Test responsive** breakpoints thoroughly
4. **Add JetBrains Mono font** to layout.tsx if not auto-loaded
5. **Create Tailwind config** (optional) for utility classes
6. **Performance audit** after images added

## Design Principles

✓ **No em-dashes** - use periods, commas, natural language  
✓ **Short sentences** - direct and clear  
✓ **Premium feel** - serif headings, generous spacing  
✓ **Catalog aesthetic** - photo frames, structured grids  
✓ **Academic authority** - navy, gold, understated elegance  
✓ **Natural hierarchy** - size, weight, color used purposefully  

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid & Flexbox
- SVG support required
- backdrop-filter for mobile nav

## Notes
- Remove unused lucide-react imports from pages
- All pages should follow the same header pattern (position:relative wrapper)
- Mobile links shown < 900px width
- Stats use custom grid with bordered cells
