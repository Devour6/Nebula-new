# Nebula Node - Design Guidelines

## Design Approach
**Reference-Based:** Space/cosmic themed interface inspired by immersive gaming experiences and modern fintech applications. The design creates a sense of exploration and discovery through interactive planetary navigation.

## Core Design Elements

### Color System
- **Background:** Pure black (#000000)
- **Primary Accent:** Pink-to-orange gradient (#FF3366 → #FF6B8A → #FFB366)
- **Planet 1 (Stake):** Purple/magenta/blue swirl (#8B5CF6, #EC4899, #3B82F6)
- **Planet 2 (Unstake):** Blue/cyan Earth-like (#3B82F6, #06B6D4 with white cloud patterns)
- **Planet 3 (Security):** Orange/yellow Mars-like (#F97316, #EAB308)
- **Planet 4 (Tools):** Green/teal nebula (#10B981, #14B8A6)
- **Text:** White (#FFFFFF) primary, muted gray (#9CA3AF) secondary
- **Interactive Elements:** Red accent (#DC2626) for borders and outlines

### Typography
- **Logo:** Bold, wide-spaced uppercase "NEBULA" with smaller "NODE" beneath
- **Headings:** Bold, uppercase, generous letter-spacing
- **Body:** Clean sans-serif, readable sizing

### Layout System
**Spacing:** Use Tailwind units of 2, 4, 6, 8, and 12 for consistent rhythm

**Header:**
- Left-aligned logo with icon + text
- Right-aligned wallet button with gradient background
- Connected state shows truncated address (e.g., "9QL...7Vt")

**Main Canvas:**
- Full-viewport immersive space scene
- Four planets arranged: stake (left), unstake (center), security (bottom-right), tools (position creatively)
- Planets are interactive navigation elements
- Red/orange nebula glow visible at left screen edge

**Footer:**
- Centered copyright text

### Component Library

**Planets (Primary Navigation):**
- Spherical objects with realistic depth and glow effects
- Size variations for visual hierarchy
- Hover reveals dark pill overlay with uppercase label
- Click triggers corresponding modal/action

**Modals:**
- Dark cards with rounded corners, centered on backdrop
- 60% opacity black backdrop with blur
- Header with back arrow icon + title
- Input fields with token icons and amount display
- HALF/MAX helper buttons with red outline
- Large gradient action button (pink → orange)
- Info rows for balance and epoch countdown
- Close on backdrop click or ESC

**Buttons:**
- Primary: Pink-to-orange gradient, uppercase text
- Secondary: Red outline, fill on hover
- Disabled: Reduced opacity, no interactions
- Wallet button: Gradient background, rounded

**Security Modal:**
- Text-focused informational card
- Paragraph spacing for readability
- Monospace font for public keys
- No action buttons, information only

**Tools Dropdown:**
- Appears on planet click
- Empty state: "No tools available yet. Check back soon!"
- Future-ready structure for tool list items

### Animations & Atmosphere

**Constant Motion (Critical for Immersion):**
- **Planet Floating:** Each planet bobs vertically (10-20px amplitude) and drifts horizontally (3-5px) on different periods (6-10s)
- **Planet Rotation:** Slow 360° rotation (45-80s per planet, staggered timing)
- **Star Twinkling:** Random opacity changes creating shimmer effect
- **Shooting Stars:** Occasional streak across screen every 10-15 seconds
- **Glow Pulse:** Subtle brightness oscillation on planet halos

**Parallax Depth:**
- Mouse movement creates layered parallax:
  - Far stars: 2% movement
  - Medium stars: 5% movement
  - Planets: 8-12% movement
  - Foreground: 15% movement

**Hover States:**
- Planets scale to 1.05-1.08x
- Glow intensifies with increased shadow spread
- Label pill fades in from center
- 300ms smooth transitions
- Floating animation continues during hover

**Page Load Sequence:**
- Stars fade in (0-500ms)
- Background nebula appears (200-700ms)
- Planets scale up from 0, staggered (500-1200ms)
- Header slides down (300-600ms)

**Modal Transitions:**
- Slide up and fade in
- Background planets dim and blur when modal active
- Smooth enter/exit animations

### Images & Visual Assets

**Star Field Background:**
- Three layers of stars: tiny distant (100+ dots), medium (30-50), bright (5-10 with sparkle)
- Varying sizes and opacities
- Implement via CSS or canvas for performance

**Planet Visuals:**
- Use CSS gradients with multiple color stops for texture
- Radial gradients for spherical depth
- Box-shadows for atmospheric glow (multi-layer, soft spread)
- Consider sourcing high-quality royalty-free planet textures as background images within circular containers
- Each planet needs distinct visual identity matching its color scheme

**Nebula Element:**
- Partial red/orange glow at left screen edge
- Very soft opacity, large blur radius
- Creates ambient atmospheric lighting

**No Hero Image:** This is a full-screen interactive experience, not a traditional landing page

### Responsive Considerations
- **Desktop:** Horizontal planet arrangement as primary navigation
- **Tablet:** 2x2 grid or adjusted spacing
- **Mobile:** Vertical stack or list-based navigation with planet thumbnails

### Accessibility
- Ensure planet labels are readable on hover
- Modal focus management for keyboard navigation
- Color contrast meets WCAG standards for all text
- Alternative text descriptions for planetary navigation elements

This design creates an immersive, gamified staking experience that balances visual spectacle with functional clarity.