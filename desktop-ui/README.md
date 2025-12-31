# Settings App Prototype

A clickable prototype for a Settings app in a web-based Desktop UI that behaves like an operating system.

## Features

* **Complete IA Implementation**: All pages from the information architecture are implemented
* **Interactive Navigation**: Clickable sidebar navigation that switches content in-place
* **Search Functionality**: Real-time search to filter settings pages (⌘K / Ctrl+K)
* **Keyboard Navigation**: Full keyboard support with arrow keys and shortcuts
* **OS-like Design**: Clean, minimal design following system settings app principles
* **Responsive Components**: Forms, toggles, tables, and interactive elements
* **Admin Indicators**: Visual separation for admin-only sections
* **Enhanced Notifications**: Toast notification system with different types (success, error, warning, info)
* **Smooth Animations**: Page transitions, hover effects, and loading states
* **Accessibility**: Keyboard navigation, focus management, and ARIA labels

## File Structure

```
├── index.html      # Main HTML structure with all pages
├── styles.css      # Complete styling following OS-like design
├── script.js       # Interactive navigation and component behaviors
├── package.json    # Project dependencies
└── README.md       # This file

```

## How to Use

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser to `http://localhost:3000`
4. Click on any item in the left sidebar to navigate to different settings pages
5. Interact with form elements, toggles, and buttons to see prototype behaviors

## Pages Implemented

### General
* **Theme**: System/Light/Dark theme selection
* **Language**: English/Korean language selection
* **Time Zone**: Time zone configuration with auto-detection

### Account
* **Account Information**: Read-only user information fields
* **Authentication**: Password and MFA management
* **Activity**: Account activity log table

### Security
* **SSH Keys**: SSH key management table
* **Certificates**: Certificate management table

### Notifications
* **Notification Preferences**: Channel and severity configuration

### Information
* **Version**: Product and system version information
* **Terms**: Legal documents and policies
* **Support**: Help and resource links

## Interactive Features

### Navigation

* **Sidebar Navigation**: Click any menu item to switch pages
* **Search**: Type in the search bar to filter settings pages in real-time
* **Keyboard Navigation**:  
   * `⌘K` / `Ctrl+K`: Focus search  
   * `↑` / `↓`: Navigate between menu items  
   * `Enter` / `Space`: Activate selected item  
   * `Esc`: Clear search  
   * `?`: Show keyboard shortcuts

### Settings Interactions

* **Theme Selection**: Changes trigger success notification
* **Language Selection**: Changes trigger success notification (would reload UI in production)
* **Toggle Switches**: Interactive switches with immediate feedback
* **Form Fields**: Input validation and feedback

### Feedback System

* **Toast Notifications**:  
   * Success (green) for completed actions  
   * Error (red) for failures  
   * Warning (orange) for cautionary messages  
   * Info (blue) for informational messages
* **Loading States**: Visual feedback during async operations
* **Keyboard Hints**: Contextual help for keyboard shortcuts

## Design Notes

* **Design System**: Follows Thaki Design System (TDS) guidelines
* **Color Scheme**: Uses system-like colors (#007aff for primary, #f5f5f7 for backgrounds)
* **Typography**: Mona Sans font family, system font stack fallback
* **Spacing**: Consistent 8px grid system
* **Components**: OS-style form controls, buttons, and tables
* **Icons**: Uses TDS Iconography system

## Browser Compatibility

Tested and works in:

* Chrome/Edge (latest)
* Safari (latest)
* Firefox (latest)

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
npm install
npm run dev
```

### Build
This is a static site, no build step required. Files can be deployed directly.

## Deployment

See `DEPLOY.md` for deployment instructions.

## Next Steps for Production

* Connect to actual backend APIs
* Implement real authentication checks
* Add form validation
* Implement actual theme switching
* Add loading states for API calls
* Implement proper error handling
* Add more comprehensive ARIA labels
* Add unit tests
* Implement undo/redo for settings changes
* Add settings export/import functionality
* Add settings history/versioning

