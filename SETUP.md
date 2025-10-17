# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- Firebase account (free tier)
- Google Cloud Console access (for Google Sign-In)
- Apple Developer account (optional, for Apple Sign-In)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project" and follow the wizard
3. Once created, click on "Web" icon to add a web app
4. Register your app with a nickname (e.g., "Concierge")
5. Copy the Firebase configuration object

### 3. Enable Authentication Providers

#### Google Sign-In:
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Add your project support email
5. Click **Save**

#### Apple Sign-In (Optional):
1. Requires Apple Developer account ($99/year)
2. Configure in Apple Developer Console first
3. Then enable in Firebase Console
4. Follow Firebase's Apple Sign-In documentation

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 5. Configure Authorized Domains (for production)

In Firebase Console:
1. Go to **Authentication** > **Settings** > **Authorized domains**
2. Add your production domain (e.g., `your-app.netlify.app`)
3. `localhost` is already authorized for development

### 6. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

### 7. Test Authentication

1. Click "Continue with Google"
2. Select your Google account
3. You should be redirected to the dashboard

## Building for Production

```bash
npm run build
```

The `dist/` folder will contain your production-ready files.

## Deployment Options

### Netlify
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Troubleshooting

### "Firebase not configured" error
- Check that `.env` file exists and has correct values
- Restart dev server after changing `.env`

### Google Sign-In popup blocked
- Check browser popup blocker settings
- Make sure domain is in Firebase authorized domains

### Apple Sign-In not working
- Requires Apple Developer account
- Must configure service ID in Apple Developer Console
- Follow Firebase documentation for Apple Sign-In setup

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (should be 18+)

## Security Notes

- Never commit `.env` file
- Keep Firebase API keys in environment variables
- Configure Firebase security rules in console
- Use Firebase App Check for production apps

## Support

- Firebase Auth Docs: https://firebase.google.com/docs/auth
- Vite Docs: https://vitejs.dev/
- React Docs: https://react.dev/

For project-specific issues, see the main README.md file.
