# Nebula Node - Solana Staking Website

## Overview
Nebula Node is an immersive Solana staking platform featuring a space-themed interface with interactive planets for navigation. Users can stake and unstake SOL with the Nebula Node validator.

## Recent Changes
- 2026-01-05: Initial MVP implementation with:
  - Space-themed UI with animated star field and parallax effects
  - Four interactive planets: Stake, Unstake, Security, Tools
  - Wallet connection via Phantom/Solflare
  - Staking and unstaking modals with input validation
  - Security information modal with validator public keys
  - Buffer polyfill for Solana web3.js compatibility

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── StarField.tsx      # Animated background with stars and shooting stars
│   ├── Planet.tsx         # Interactive planet component with hover effects
│   ├── Header.tsx         # Logo and wallet button
│   ├── Footer.tsx         # Copyright footer
│   ├── Modal.tsx          # Base modal component
│   ├── StakeModal.tsx     # Staking interface
│   ├── UnstakeModal.tsx   # Unstaking interface
│   ├── SecurityModal.tsx  # Security information display
│   ├── ToolsDropdown.tsx  # Tools menu (coming soon)
│   └── WalletButton.tsx   # Connect/disconnect wallet
├── hooks/
│   ├── useWallet.ts       # Wallet connection and balance management
│   └── useStaking.ts      # Staking/unstaking operations
├── lib/
│   ├── constants.ts       # Validator config and helper functions
│   └── queryClient.ts     # React Query setup
├── pages/
│   └── Home.tsx           # Main page with all components
├── App.tsx                # App root with routing
└── main.tsx               # Entry point with Buffer polyfill
```

### Tech Stack
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- @solana/web3.js for blockchain interactions
- @solana/wallet-adapter for wallet connections

### Validator Information
- Name: Nebula Node
- Identity Public Key: nebu15XQKGpxzhhckADBX9PgvGN5qk9RRJCFLKc118w
- Vote Public Key: nebu1WnZBrFZz5X7sfPWuEqyb8LBSsrXpxaesnK9CRE

### Design System
- Background: Pure black (#000000)
- Primary accent: Pink-to-orange gradient (#FF3366 → #FFB366)
- Font families: Space Grotesk (sans), Space Mono (mono)
- Dark mode only (space theme)

## Running the Project
The application runs via `npm run dev` which starts an Express server for the backend and Vite for the frontend on port 5000.

## User Preferences
- Space/cosmic theme with immersive animations
- Parallax effects on mouse movement
- Wallet integration with Phantom and other Solana wallets
