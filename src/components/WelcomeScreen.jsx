import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const { user, loading, error, signInWithGoogle, signInWithApple, signInWithMicrosoft } = useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleMemberLogin = () => {
    setShowLoginOptions(true);
  };

  const handleSignIn = async (signInMethod) => {
    setSigningIn(true);
    try {
      await signInMethod();
      // Show transition message
      setShowTransition(true);
      // Wait for transition animation
      setTimeout(() => {
        setShowTransition(false);
      }, 2500);
    } catch (error) {
      console.error('Login failed:', error);
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (showTransition) {
    return (
      <div className="transition-screen">
        <div className="transition-content">
          <div className="concierge-bow">
            <ConciergeAnimal animate={true} />
          </div>
          <h2 className="transition-message">Right this way, sir.</h2>
          <div className="door-animation">
            <div className="door-left"></div>
            <div className="door-right"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <header className="welcome-header">
          <h1>🌿 Conservation Cafe</h1>
          <p className="welcome-subtitle">Your Gateway to Habitat Restoration</p>
        </header>

        <main className="welcome-main">
          <div className="concierge-desk">
            <ConciergeAnimal />
            <div className="desk"></div>
          </div>

          <div className="welcome-message">
            <h2>Welcome to the Conservation Cafe</h2>
            <p>Where nature lovers gather to restore wildlife habitat</p>
          </div>

          {!showLoginOptions ? (
            <button 
              className="member-button"
              onClick={handleMemberLogin}
            >
              I'm a Member
            </button>
          ) : (
            <div className="login-options">
              <h3>Please sign in to continue</h3>
              <div className="login-buttons">
                <button 
                  onClick={() => handleSignIn(signInWithMicrosoft)} 
                  disabled={signingIn}
                  className="login-btn microsoft-btn"
                >
                  <svg className="btn-icon" viewBox="0 0 23 23" fill="none">
                    <path fill="#f25022" d="M0 0h11v11H0z"/>
                    <path fill="#00a4ef" d="M12 0h11v11H12z"/>
                    <path fill="#7fba00" d="M0 12h11v11H0z"/>
                    <path fill="#ffb900" d="M12 12h11v11H12z"/>
                  </svg>
                  {signingIn ? 'Signing in...' : 'Sign in with Microsoft'}
                </button>

                <button 
                  onClick={() => handleSignIn(signInWithGoogle)} 
                  disabled={signingIn}
                  className="login-btn google-btn"
                >
                  <svg className="btn-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {signingIn ? 'Signing in...' : 'Sign in with Google'}
                </button>

                <button 
                  onClick={() => handleSignIn(signInWithApple)} 
                  disabled={signingIn}
                  className="login-btn apple-btn"
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  {signingIn ? 'Signing in...' : 'Sign in with Apple'}
                </button>
              </div>

              {error && (
                <div className="error-message">
                  <p>⚠️ {error}</p>
                </div>
              )}

              <button 
                className="back-button"
                onClick={() => setShowLoginOptions(false)}
              >
                ← Back
              </button>
            </div>
          )}
        </main>

        <footer className="welcome-footer">
          <p>&copy; 2025 Conservation Cafe - Where every visit helps restore habitat 🌿</p>
        </footer>
      </div>
    </div>
  );
};

// Friendly Gecko Doorman Component
const ConciergeAnimal = ({ animate = false }) => {
  return (
    <svg 
      className={`concierge-animal ${animate ? 'bowing' : ''}`}
      viewBox="0 0 200 250" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gecko head */}
      <ellipse cx="100" cy="85" rx="50" ry="45" fill="#7CB342"/>
      
      {/* Eyes - large and friendly */}
      <g>
        {/* Left eye */}
        <ellipse cx="80" cy="75" rx="18" ry="20" fill="#FFF9C4"/>
        <ellipse cx="80" cy="75" rx="12" ry="14" fill="#2C3E50"/>
        <circle cx="82" cy="72" r="5" fill="white"/>
        
        {/* Right eye */}
        <ellipse cx="120" cy="75" rx="18" ry="20" fill="#FFF9C4"/>
        <ellipse cx="120" cy="75" rx="12" ry="14" fill="#2C3E50"/>
        <circle cx="122" cy="72" r="5" fill="white"/>
      </g>
      
      {/* Nostril dots */}
      <circle cx="90" cy="95" r="3" fill="#558B2F"/>
      <circle cx="110" cy="95" r="3" fill="#558B2F"/>
      
      {/* Friendly smile */}
      <path 
        d="M 80 100 Q 100 110 120 100" 
        stroke="#558B2F" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Neck/body */}
      <ellipse cx="100" cy="140" rx="40" ry="35" fill="#7CB342"/>
      
      {/* Spots on head for character */}
      <circle cx="65" cy="80" r="6" fill="#558B2F" opacity="0.6"/>
      <circle cx="135" cy="80" r="6" fill="#558B2F" opacity="0.6"/>
      <circle cx="100" cy="60" r="5" fill="#558B2F" opacity="0.6"/>
      
      {/* Doorman vest */}
      <path 
        d="M 70 125 L 65 145 L 75 170 L 100 175 L 125 170 L 135 145 L 130 125 L 100 130 Z" 
        fill="#8D6E63"
      />
      
      {/* Vest lapels */}
      <path 
        d="M 70 125 L 80 130 L 85 145 L 75 170" 
        fill="#6D4C41"
        opacity="0.5"
      />
      <path 
        d="M 130 125 L 120 130 L 115 145 L 125 170" 
        fill="#6D4C41"
        opacity="0.5"
      />
      
      {/* Name tag */}
      <rect x="85" y="145" width="30" height="15" fill="#FFF9C4" rx="2"/>
      <text x="100" y="155" fontSize="8" fill="#2C3E50" textAnchor="middle" fontWeight="bold">HOST</text>
      
      {/* Bow tie */}
      <path 
        d="M 80 120 L 75 125 L 80 130 L 90 125 Z" 
        fill="#D32F2F"
      />
      <path 
        d="M 120 120 L 125 125 L 120 130 L 110 125 Z" 
        fill="#D32F2F"
      />
      <rect x="88" y="123" width="24" height="4" fill="#D32F2F" rx="2"/>
      
      {/* Front legs/arms */}
      <ellipse cx="60" cy="160" rx="15" ry="25" fill="#7CB342" transform="rotate(-15 60 160)"/>
      <ellipse cx="140" cy="160" rx="15" ry="25" fill="#7CB342" transform="rotate(15 140 160)"/>
      
      {/* Gecko toes on front legs */}
      <g opacity="0.7">
        <circle cx="55" cy="180" r="4" fill="#558B2F"/>
        <circle cx="50" cy="185" r="4" fill="#558B2F"/>
        <circle cx="145" cy="180" r="4" fill="#558B2F"/>
        <circle cx="150" cy="185" r="4" fill="#558B2F"/>
      </g>
      
      {/* Vest buttons */}
      <circle cx="100" cy="145" r="3" fill="#FFD54F"/>
      <circle cx="100" cy="155" r="3" fill="#FFD54F"/>
      <circle cx="100" cy="165" r="3" fill="#FFD54F"/>
      
      {/* Tail visible behind (adds character) */}
      <path 
        d="M 95 175 Q 85 190 80 210 Q 78 220 85 225" 
        stroke="#7CB342" 
        strokeWidth="12" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WelcomeScreen;
