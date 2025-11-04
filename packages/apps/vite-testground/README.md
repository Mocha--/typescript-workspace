# Parcel Tracking Status Page

A modern, mobile-first React application for tracking parcel delivery status. Built with React, TypeScript, CSS Modules, and Vite.

## Features

- **Timeline/Wizard View**: Visual representation of parcel status through all stages
- **Status Tracking**: Tracks five stages: Order Placed → Processing → Shipped → Out for Delivery → Delivered
- **Delay Detection**: Automatically highlights packages that have been in the same status for more than 2 days
- **Timeframe Estimates**: Shows anticipated timeframe for each stage
- **Mobile-First Design**: Optimized for mobile devices with responsive desktop support
- **Dark Theme**: Modern dark color scheme
- **Accessibility**: Full keyboard navigation, screen reader support, and ARIA labels
- **Animations**: Smooth page entry animations and loading spinners

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Usage

1. Enter a tracking number in the input field
2. Click "Track" or press Enter to search
3. View the tracking status timeline with all stages

### Mock Tracking Numbers

For testing, use these mock tracking numbers:
- `TRACK001` - Delivered package
- `TRACK002` - Out for delivery (delayed - 3 days in status)
- `TRACK003` - Processing (delayed - 3 days in status)

## Project Structure

```
src/
├── components/          # React components (one component per file)
│   ├── LoadingSpinner/  # Loading spinner component
│   ├── TrackingInput/   # Input form for tracking numbers
│   └── TrackingStatus/  # Timeline/wizard status display
├── context/             # React Context for state management
│   └── TrackingContext.tsx
├── services/            # Mock data service
│   └── mockTrackingService.ts
├── types/               # TypeScript type definitions
│   └── tracking.ts
├── App.tsx              # Main app component
├── App.module.css       # App-level styles
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Key Design Decisions

### 1. Component Architecture
- **One file = one component**: Each component is self-contained in its own directory with its CSS module
- **Separation of concerns**: Types, services, and context are separated from UI components
- **Reusability**: Components are designed to be independent and reusable

### 2. State Management
- **React Context API**: Used instead of external libraries to minimize bundle size
- **Centralized state**: All tracking state is managed in `TrackingContext`
- **Async handling**: Proper error and loading state management

### 3. Styling Approach
- **CSS Modules**: Scoped styling to prevent conflicts, no external CSS-in-JS dependencies
- **Dark theme**: Modern dark color scheme with good contrast ratios
- **Mobile-first**: Styles designed for mobile, enhanced for desktop
- **Animations**: CSS-based animations for performance (respects `prefers-reduced-motion`)

### 4. Accessibility
- **ARIA labels**: All interactive elements have proper ARIA labels
- **Keyboard navigation**: Full keyboard support including Escape key to clear
- **Screen reader support**: Semantic HTML and proper role attributes
- **Focus management**: Visible focus indicators for keyboard users

### 5. User Experience
- **Loading states**: Visual feedback during API calls (simulated 1.5s delay)
- **Error handling**: Clear error messages for invalid tracking numbers
- **Delay highlighting**: Visual indicators (pulsing animation) when package is delayed
- **Timeline visualization**: Easy-to-understand wizard/timeline format showing all stages

### 6. Performance
- **Minimal dependencies**: Only React, React-DOM, and TypeScript (no external state management libraries)
- **CSS animations**: Hardware-accelerated CSS animations instead of JavaScript
- **Lazy rendering**: Components only render when needed
- **Optimized bundle**: CSS Modules help with tree-shaking unused styles

## Technical Stack

- **React 19**: Latest React version
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **CSS Modules**: Scoped component styling
- **React Context**: State management (no Redux/Zustand needed)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

## Future Enhancements

Potential improvements:
- Real API integration
- Push notifications for status updates
- Multiple package tracking
- Export tracking history
- Internationalization (i18n)
