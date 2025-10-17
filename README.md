# Habitat Restoration Concierge 🦋

Camp Monarch's personal organizer for habitat restoration. Start restoring habitat—right where you live.

## Overview

The Habitat Restoration Concierge is a React-based web application that helps individuals organize their habitat restoration journey. It provides curated links to trusted resources, helps track personal goals, and connects users with local events and opportunities—without storing plant data or conservation information directly.

**Key Philosophy**: This concierge points you to the right resources and helps you stay organized. It knows *where* to find information and *when* to get started, but doesn't replace comprehensive databases like the Planeteer Handbook.

## Features

### 🔐 Secure Authentication
- Sign in with Google or Apple
- Powered by Firebase Authentication
- Secure, industry-standard authentication flow

### 📚 Resource Hub
Curated links to trusted resources:
- **Planeteer Handbook** - Complete restoration guide
- **Native Plant Databases** (NWF, Audubon, Xerces)
- **Funding Opportunities** - Grants, rebates, and programs
- **Educational Resources** - Expert organizations and guides

### 📅 Event Discovery
- Find local workshops and planting days
- Discover native plant societies
- Connect with local conservation groups
- Schedule reminders for important events

### 🎯 Personal Goal Tracking
- Set and track restoration goals
- Mark goals as complete
- Stay motivated with progress tracking
- Celebrate your wins

### 🤝 Community Connections
Links to find:
- Local native plant societies
- Master gardener programs
- Conservation volunteers
- Habitat restoration mentors

## Technology Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Authentication**: Firebase Auth (Google & Apple Sign-In)
- **Styling**: Custom CSS
- **Deployment Ready**: Static build output

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier works fine)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ampautsc/Concierge.git
   cd Concierge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase Authentication**

   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project or use an existing one
   
   c. Enable Authentication:
      - Go to Authentication > Sign-in method
      - Enable Google provider
      - Enable Apple provider (optional, requires Apple Developer account)
   
   d. Get your Firebase configuration:
      - Go to Project Settings > General
      - Scroll down to "Your apps"
      - Click "Web app" icon to register a new web app
      - Copy the configuration values

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service (Netlify, Vercel, Firebase Hosting, etc.).

## Project Structure

```
Concierge/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard with tabs
│   │   ├── Dashboard.css
│   │   ├── Login.jsx           # Authentication page
│   │   └── Login.css
│   ├── contexts/
│   │   └── AuthContext.jsx     # Firebase auth context
│   ├── config/
│   │   └── firebase.js         # Firebase configuration
│   ├── App.jsx                 # Root component
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## How It Works

### Authentication Flow
1. User visits the app and sees the login page
2. Clicks "Continue with Google" or "Continue with Apple"
3. Redirected to provider's authentication page
4. Upon successful authentication, user is signed in
5. Dashboard becomes accessible with personalized features

### Dashboard Sections

#### 🏠 Home
- Quick overview of key features
- Direct links to main resources
- Getting started guidance

#### 📚 Resources
- Curated external links to:
  - Plant databases and selection guides
  - Funding opportunities and grants
  - Educational resources and organizations
  - Conservation programs

#### 📅 Events
- Guide to finding local events
- Tips for discovering workshops and volunteer opportunities
- Reminders and scheduling suggestions

#### 🎯 My Goals
- Create personal restoration goals
- Track progress with checkboxes
- Delete completed or obsolete goals
- Goal-setting tips and encouragement

## Customization

### Adding More Resources

Edit `src/components/Dashboard.jsx` in the `ResourcesSection` component to add new resource links.

### Styling

All CSS is in separate files:
- `src/index.css` - Global styles and CSS variables
- `src/App.css` - App-level styles
- `src/components/Login.css` - Login page styles
- `src/components/Dashboard.css` - Dashboard styles

Modify CSS variables in `src/index.css` to change the color scheme:
```css
:root {
  --primary-green: #4a7c2c;
  --primary-green-dark: #3a6622;
  --success: #2d5016;
  /* ... */
}
```

## Deployment

### Firebase Hosting

```bash
npm install -g firebase-tools
npm run build
firebase login
firebase init hosting
firebase deploy
```

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel

```bash
npm install -g vercel
npm run build
vercel
```

## Security Notes

- Never commit `.env` file with real credentials
- Firebase security rules should be configured in Firebase Console
- Keep your Firebase API keys in environment variables
- Regularly update dependencies for security patches

## Contributing

This project helps people restore habitat. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Open source - help us restore habitat one space at a time! 🦋

## Support

For issues or questions:
- Check the Firebase Authentication documentation
- Review Vite documentation for build issues
- Open an issue in this repository

## About Camp Monarch

Camp Monarch is dedicated to habitat restoration and wildlife conservation, with a special focus on monarch butterflies and pollinators.

---

**Together, we restore habitat one space at a time!** 🦋
