# Nebula Node - Solana Staking Website

## Project Overview
Build a single-page Solana staking website for **Nebula Node** validator. The site features an immersive space theme with interactive planets that serve as navigation elements for staking, unstaking, security info, and tools.

## Tech Stack
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Solana Wallet Adapter** (@solana/wallet-adapter-react, @solana/wallet-adapter-wallets)
- **@solana/web3.js** for blockchain interactions
- **Framer Motion** for animations

## Design System

### Color Palette
- **Background**: Pure black (#000000) with subtle star field
- **Primary Accent**: Pink/coral gradient (#FF3366 → #FF6B8A → #FFB366)
- **Planet 1 (Stake)**: Purple/magenta/blue swirl (#8B5CF6, #EC4899, #3B82F6)
- **Planet 2 (Unstake)**: Blue/cyan Earth-like (#3B82F6, #06B6D4, with white cloud patterns)
- **Planet 3 (Security)**: Orange/yellow Mars-like (#F97316, #EAB308)
- **Planet 4 (Tools)**: NEW - suggest a green/teal nebula color scheme (#10B981, #14B8A6)
- **Text**: White (#FFFFFF), with muted gray for secondary (#9CA3AF)
- **Borders/Outlines**: Red accent (#DC2626) for buttons/inputs

### Typography
- **Logo**: "NEBULA" in bold, wide-spaced uppercase, "NODE" smaller underneath
- **Headings**: Bold, uppercase, wide letter-spacing
- **Body**: Clean sans-serif

### Visual Elements
- **Star field background**: Animated twinkling stars of varying sizes
- **Planets**: High-quality spherical objects with realistic textures and subtle glow effects
- **Partial planet/nebula**: Red/orange glow visible on the left edge of screen
- **Floating particles**: Small dots representing distant stars

## Page Layout

### Header
- **Left**: Nebula Node logo (stylized "N" icon + "NEBULA" text with "NODE" underneath)
- **Right**: Wallet connect button with pink-to-orange gradient
  - Before connect: Shows "Connect" text
  - After connect: Shows truncated wallet address (e.g., "9QL...7Vt")

### Main Content Area
Three interactive planets arranged horizontally (add fourth for Tools):

1. **Left Planet (STAKE)** - Purple/magenta swirled planet
   - On hover: Shows "STAKE" label in dark pill overlay
   - On click: Opens Stake modal

2. **Center Planet (UNSTAKE)** - Blue Earth-like planet  
   - On hover: Shows "UNSTAKE" label in dark pill overlay
   - On click: Opens Unstake modal

3. **Bottom-right Planet (SECURITY)** - Orange/yellow Mars-like planet
   - On hover: Shows "SECURITY" label in dark pill overlay
   - On click: Opens Security modal

4. **NEW - Additional Planet (TOOLS)** - Green/teal nebula planet
   - On hover: Shows "TOOLS" label in dark pill overlay
   - On click: Opens dropdown menu (empty state for now - "Coming Soon")

### Footer
- Centered: "© 2025 Nebula Stake"

## Modal Components

### Stake Modal
```
┌─────────────────────────────────────────┐
│  ← STAKE SOLANA                         │
│                                         │
│  Select Amount              [HALF][MAX] │
│  ┌─────────────────────────────────────┐│
│  │ ◎ SOL                          0.0 ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │            Stake                    ││
│  └─────────────────────────────────────┘│
│                                         │
│  Available Balance           114.49 SOL │
│  Next Epoch         01/6/2026 6:26:16 PM│
└─────────────────────────────────────────┘
```

- Dark card with rounded corners
- Red arrow icon pointing left next to title
- "STAKE SOLANA" in uppercase bold
- "Select Amount" label with HALF/MAX buttons (red outline)
- Input field with SOL icon, token symbol, and amount
- Large gradient button (pink → orange) for "Stake" action
- Info row showing Available Balance and Next Epoch countdown

### Unstake Modal
Same structure as Stake modal but:
- Title: "UNSTAKE SOLANA"  
- Red arrow icon pointing right
- Button text: "Unstake"
- Button is slightly muted/disabled when no staked balance
- Shows staked balance instead of available balance

### Security Modal
```
┌─────────────────────────────────────────┐
│  Security                               │
│                                         │
│  You can use this website to enhance    │
│  your native staking experience. If you │
│  prefer, you may also stake directly    │
│  through wallets like Phantom, Solflare,│
│  Backpack, or any other supported       │
│  platform.                              │
│                                         │
│  Rest assured, Solana's staking         │
│  protocol ensures that validators never │
│  have access to your staked SOL. You    │
│  retain full ownership and control of   │
│  your Stake Account at all times.       │
│                                         │
│  Validator Identity Public Key:         │
│  nebu15XQKGpxzhhckADBX9PgvGN5qk9RRJCFLKc118w │
│                                         │
│  Validator Vote Public Key:             │
│  nebu1WnZBrFZz5X7sfPWuEqyb8LBSsrXpxaesnK9CRE │
└─────────────────────────────────────────┘
```

### Tools Dropdown (NEW)
- When clicking Tools planet, show a dropdown/popover menu
- Empty state message: "No tools available yet. Check back soon!"
- Structure for future tools:
  ```
  ┌─────────────────────────┐
  │  TOOLS                  │
  │  ─────────────────────  │
  │  No tools available yet │
  │  Check back soon!       │
  └─────────────────────────┘
  ```

## Interactions & Animations

### 🌌 SPACE ATMOSPHERE - CRITICAL FOR IMMERSION

#### Planet Movement (Always Active)
Each planet should feel alive with constant, subtle movement:

1. **Floating/Bobbing Motion**
   - Each planet gently floats up and down
   - Use sine-wave easing for organic feel
   - Different periods for each planet (creates natural rhythm):
     - Stake planet: 8s period, 15px amplitude
     - Unstake planet: 10s period, 12px amplitude  
     - Security planet: 6s period, 10px amplitude
     - Tools planet: 9s period, 14px amplitude
   - Add slight horizontal drift too (smaller amplitude)

2. **Slow Rotation**
   - Each planet rotates very slowly on its axis
   - Stake planet: 60s full rotation
   - Unstake planet: 80s full rotation
   - Security planet: 45s full rotation
   - Tools planet: 70s full rotation
   - Use CSS `transform: rotate()` or rotate the texture/gradient

3. **Orbital Paths (Optional Advanced)**
   - Planets can follow subtle elliptical paths
   - Very slow movement (barely perceptible)
   - Creates sense of vast scale

#### Parallax Depth Effect
- On mouse move, create depth layers:
  - **Layer 1 (far stars)**: Move 2% opposite to mouse
  - **Layer 2 (medium stars)**: Move 5% opposite to mouse
  - **Layer 3 (planets)**: Move 8-12% opposite to mouse (each planet slightly different)
  - **Layer 4 (foreground elements)**: Move 15% opposite to mouse
- This creates a 3D feeling as user moves cursor

#### Star Field Animation
- **Twinkling**: Random stars fade in/out at different rates
- **Shooting stars**: Occasional streak across screen (every 10-15 seconds)
- **Star layers**: 
  - Tiny distant stars (100+ dots, very dim, slight twinkle)
  - Medium stars (30-50 dots, brighter, more visible twinkle)
  - Bright stars (5-10 dots, occasional sparkle/glint effect)
- **Nebula clouds**: Subtle colored gas clouds in background (very low opacity, slow drift)

#### Planet Glow Effects
- Each planet has a soft ambient glow matching its color
- Glow pulses very slowly (subtle brightness oscillation)
- On hover, glow intensifies

#### CSS Animation Examples
```css
/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-15px) translateX(5px); }
  50% { transform: translateY(-5px) translateX(-3px); }
  75% { transform: translateY(-20px) translateX(2px); }
}

/* Planet rotation */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Star twinkle */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Shooting star */
@keyframes shootingStar {
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  100% { transform: translateX(300px) translateY(300px); opacity: 0; }
}

/* Glow pulse */
@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(255,100,150,0.5)); }
  50% { filter: drop-shadow(0 0 35px rgba(255,100,150,0.8)); }
}
```

#### Framer Motion Config (React)
```tsx
// Planet floating animation
const floatAnimation = {
  y: [0, -15, -5, -20, 0],
  x: [0, 5, -3, 2, 0],
  transition: {
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
  }
};

// Planet hover
const planetHover = {
  scale: 1.08,
  filter: "brightness(1.2)",
  transition: { duration: 0.3 }
};
```

### Planet Hover Effects
- Subtle scale up (1.05-1.08x)
- Glow intensification (increase shadow spread and brightness)
- Label pill fades in from center of planet
- Slight "lift" toward viewer (scale creates depth)
- Smooth transition (300ms ease)
- Animation continues while hovered (doesn't stop floating)

### Modal Transitions
- Backdrop: Black with 60% opacity, blur effect
- Modal: Slides up and fades in
- Planets in background should dim/blur slightly when modal is open
- Close on backdrop click or ESC key

### Button States
- Gradient buttons: Slight brightness increase on hover
- Outline buttons (HALF/MAX): Fill with red on hover
- Disabled state: Reduced opacity, no hover effects

### Page Load Animation
- Stars fade in first (0-500ms)
- Nebula/background elements fade in (200-700ms)
- Planets scale up from 0 with staggered timing (500-1200ms)
- Header slides down (300-600ms)
- Creates a "space revealing itself" feeling

## Wallet Integration

### Supported Wallets
- Phantom
- Solflare  
- Backpack
- Ledger
- Other Solana wallets via Wallet Adapter

### Connection Flow
1. User clicks "Connect" button
2. Wallet selection modal appears
3. User selects wallet
4. Wallet prompts for approval
5. On success: Button shows truncated address
6. On disconnect: Button returns to "Connect"

### Staking Flow
1. User enters amount or clicks HALF/MAX
2. User clicks "Stake" button
3. Create stake account transaction
4. Delegate to Nebula Node validator
5. Show success/error state

### Unstaking Flow
1. User enters amount or clicks HALF/MAX
2. User clicks "Unstake" button
3. Deactivate stake transaction
4. Show success/error with epoch info for when funds will be available

## Validator Information

```javascript
const VALIDATOR_CONFIG = {
  name: "Nebula Node",
  identityPubkey: "nebu15XQKGpxzhhckADBX9PgvGN5qk9RRJCFLKc118w",
  votePubkey: "nebu1WnZBrFZz5X7sfPWuEqyb8LBSsrXpxaesnK9CRE",
  website: "https://nebulanode.io", // placeholder
};
```

## File Structure Suggestion

```
src/
├── components/
│   ├── Header.tsx
│   ├── Planet.tsx
│   ├── StakeModal.tsx
│   ├── UnstakeModal.tsx
│   ├── SecurityModal.tsx
│   ├── ToolsDropdown.tsx
│   ├── WalletButton.tsx
│   ├── StarField.tsx
│   └── Modal.tsx (base modal component)
├── hooks/
│   ├── useStake.ts
│   ├── useUnstake.ts
│   └── useBalance.ts
├── utils/
│   ├── format.ts
│   └── constants.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

## Key Implementation Notes

1. **Planet Images**: Use CSS gradients and shadows to create planet effects, or source royalty-free planet images. The planets should look realistic with depth.

2. **Responsive Design**: 
   - Desktop: Horizontal planet layout as shown
   - Tablet: Stack planets 2x2
   - Mobile: Stack planets vertically or show as a list

3. **RPC Endpoint**: Use Solana mainnet-beta RPC. Consider using a dedicated RPC provider for production.

4. **Error Handling**: 
   - Wallet not connected: Prompt to connect
   - Insufficient balance: Disable button, show message
   - Transaction failed: Show error with retry option

5. **Loading States**:
   - Skeleton loaders for balance
   - Spinner on transaction buttons
   - Optimistic UI updates where appropriate

## Assets Needed
- Nebula Node logo SVG
- Planet textures or high-quality planet PNGs
- Solana logo for SOL token display

## Future Expansion (Tools Section)
The Tools planet is a placeholder for future Nebula Node utilities. Structure it so new tools can be easily added as menu items. Potential future tools might include:
- Stake account viewer
- Reward calculator
- Validator performance dashboard
- etc.

---

**Priority**: Get the visual design pixel-perfect first, then implement wallet functionality. The space aesthetic with interactive planets is the hero of this site.
