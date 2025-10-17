# Habitat Restoration Concierge 🦋

Camp Monarch's personal organizer for habitat restoration. Start restoring habitat—right where you live.

## Overview

The Habitat Restoration Concierge is a React-based web application that helps individuals organize their habitat restoration journey. Featuring a friendly concierge experience, the app welcomes users with a cartoon bear guide and provides curated links to trusted resources, helps track personal goals, and connects users with local events and opportunities—without storing plant data or conservation information directly.

**Key Philosophy**: This concierge points you to the right resources and helps you stay organized. It knows *where* to find information and *when* to get started, but doesn't replace comprehensive databases like the Planeteer Handbook.

## Features

### 🔐 Secure Authentication
- Sign in with Microsoft (Azure AD), Google, or Apple
- Powered by Azure AD and Firebase Authentication
- Secure, industry-standard authentication flow
- Friendly concierge welcome screen with "I'm a member" button

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
- **Authentication**: 
  - Azure AD (Microsoft Entra ID) with MSAL
  - Firebase Auth (Google & Apple Sign-In)
- **Styling**: Custom CSS with SVG illustrations
- **Hosting**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier works fine)
- Azure account (for Azure AD authentication and deployment)

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

3. **Set up Authentication**

   **Firebase Authentication:**
   
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

   **Azure AD Authentication (Microsoft Sign-In):**
   
   a. Go to [Azure Portal](https://portal.azure.com)
   
   b. Navigate to Azure Active Directory > App registrations > New registration
   
   c. Configure your app:
      - Name: Habitat Restoration Concierge
      - Supported account types: Accounts in any organizational directory and personal Microsoft accounts
      - Redirect URI: Single-page application (SPA) - http://localhost:5173
   
   d. Note your Application (client) ID and Directory (tenant) ID
   
   e. Configure API permissions:
      - Add Microsoft Graph > Delegated permissions
      - Add: User.Read, openid, profile, email

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```
   # Firebase
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Azure AD
   VITE_AZURE_CLIENT_ID=your_azure_client_id
   VITE_AZURE_TENANT_ID=your_azure_tenant_id
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
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # Azure deployment
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard with tabs
│   │   ├── Dashboard.css
│   │   ├── WelcomeScreen.jsx   # Concierge welcome screen
│   │   ├── WelcomeScreen.css
│   │   ├── Login.jsx           # Legacy authentication page
│   │   └── Login.css
│   ├── contexts/
│   │   └── AuthContext.jsx     # Multi-provider auth context
│   ├── config/
│   │   ├── firebase.js         # Firebase configuration
│   │   └── azure.js            # Azure AD/MSAL configuration
│   ├── App.jsx                 # Root component
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.js
├── staticwebapp.config.json    # Azure Static Web Apps config
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── AZURE_DEPLOYMENT.md         # Azure deployment guide
```

## How It Works

### Authentication Flow
1. User visits the app and sees the welcome screen with a friendly bear concierge
2. Clicks "I'm a member" button to access login options
3. Chooses from Microsoft, Google, or Apple sign-in
4. Redirected to provider's authentication page
5. Upon successful authentication, sees "Right this way, sir." transition message
6. Doors open animation leads to the dashboard (members lounge)
7. Dashboard becomes accessible with personalized features

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

### Azure Static Web Apps (Recommended)

The app is configured for Azure Static Web Apps with automatic deployment via GitHub Actions.

**Quick Setup:**
1. Create Azure Static Web App in Azure Portal
2. Connect to your GitHub repository
3. Configure GitHub Secrets (see `AZURE_DEPLOYMENT.md` for details)
4. Push to main branch - automatic deployment!

**Full Guide:** See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for complete instructions.

### Alternative Hosting Options

#### Firebase Hosting

```bash
npm install -g firebase-tools
npm run build
firebase login
firebase init hosting
firebase deploy
```

#### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Vercel

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
