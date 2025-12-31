# Settings App Prototype

A clickable prototype for a Settings app in a web-based Desktop UI that behaves like an operating system.

## Features

- **Complete IA Implementation**: All pages from the information architecture are implemented
- **Interactive Navigation**: Clickable sidebar navigation that switches content in-place
- **Search Functionality**: Real-time search to filter settings pages (⌘K / Ctrl+K)
- **Keyboard Navigation**: Full keyboard support with arrow keys and shortcuts
- **OS-like Design**: Clean, minimal design following system settings app principles
- **Responsive Components**: Forms, toggles, tables, and interactive elements
- **Admin Indicators**: Visual separation for admin-only sections
- **Enhanced Notifications**: Toast notification system with different types (success, error, warning, info)
- **Smooth Animations**: Page transitions, hover effects, and loading states
- **Accessibility**: Keyboard navigation, focus management, and ARIA labels

## File Structure

```
├── index.html      # Main HTML structure with all pages
├── styles.css      # Complete styling following OS-like design
├── script.js       # Interactive navigation and component behaviors
└── README.md       # This file
```

## How to Use

1. Open `index.html` in a modern web browser
2. Click on any item in the left sidebar to navigate to different settings pages
3. Interact with form elements, toggles, and buttons to see prototype behaviors

## Pages Implemented

### Account
- **Profile**: Read-only user information fields
- **Session**: Active sessions table with force logout functionality
- **Access & Role**: Read-only role and membership information

### Desktop & UI
- **Language**: Radio button selection (English/Korean) with immediate apply
- **Theme**: Radio button selection (System/Light/Dark)
- **Window Behavior**: Checkbox list for window preferences

### Notifications
- **Global Preferences**: Checkbox list for notification channels
- **App-level Matrix**: Interactive toggle matrix for app/severity combinations
- **Notification History**: Read-only table of recent notifications

### AI Assistant
- **General**: Toggle switches for AI Assistant features
- **Model & Capability**: Dropdown and radio group for model configuration
- **Command Scope**: Admin-only checkbox list for command permissions

### Security
- **Authentication**: Read-only authentication method and MFA status
- **Active Sessions**: Table showing all user sessions (admin view)
- **Audit Log**: Read-only audit log table

### Integrations
- **External Tools**: Empty state with add integration button
- **API / Token**: Admin-only token management table with revoke functionality

### About
- **System Info**: Version, build, and environment information
- **License / Legal**: License and OSS notice links

## Interactive Features

### Navigation
- **Sidebar Navigation**: Click any menu item to switch pages
- **Search**: Type in the search bar to filter settings pages in real-time
- **Keyboard Navigation**: 
  - `⌘K` / `Ctrl+K`: Focus search
  - `↑` / `↓`: Navigate between menu items
  - `Enter` / `Space`: Activate selected item
  - `Esc`: Clear search
  - `?`: Show keyboard shortcuts

### Settings Interactions
- **Language Selection**: Changes trigger success notification (would reload UI in production)
- **Theme Selection**: Changes trigger success notification
- **Window Behavior**: Checkbox preferences with immediate feedback
- **Force Logout**: Confirmation dialog with smooth row removal animation
- **Token Revoke**: Confirmation dialog with smooth row removal animation
- **Notification Matrix**: Toggle switches for each app/severity combination
- **AI Assistant Toggles**: Interactive switches with confirmation for dangerous actions

### Feedback System
- **Toast Notifications**: 
  - Success (green) for completed actions
  - Error (red) for failures
  - Warning (orange) for cautionary messages
  - Info (blue) for informational messages
- **Loading States**: Visual feedback during async operations
- **Keyboard Hints**: Contextual help for keyboard shortcuts

## Design Notes

- **Color Scheme**: Uses system-like colors (#007aff for primary, #f5f5f7 for backgrounds)
- **Typography**: System font stack for native OS feel
- **Spacing**: Consistent 8px grid system
- **Components**: OS-style form controls, buttons, and tables
- **Read-only Fields**: Visually disabled with gray background
- **Admin Sections**: Badge indicators and visual separation

## Browser Compatibility

Tested and works in:
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Focus search bar |
| `↑` / `↓` | Navigate menu items |
| `Enter` / `Space` | Activate selected item |
| `Esc` | Clear search / Close dialogs |
| `?` | Show keyboard shortcuts help |

## Next Steps for Production

- Connect to actual backend APIs
- Implement real authentication checks
- Add form validation
- Implement actual theme switching
- Add loading states for API calls
- Implement proper error handling
- Add more comprehensive ARIA labels
- Add unit tests
- Implement undo/redo for settings changes
- Add settings export/import functionality
- Add settings history/versioning

