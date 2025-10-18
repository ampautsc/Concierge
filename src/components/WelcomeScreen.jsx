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
    <div className="welcome-screen" style={{ backgroundImage: 'url(/ConservationCafe.png)' }}>
      <div className="welcome-container">
        <header className="welcome-header">
          <h1>🦋 Camp Monarch</h1>
          <p className="welcome-subtitle">Habitat Restoration Concierge</p>
        </header>

        <main className="welcome-main">
          <div className="concierge-image">
            <ConciergeAnimal />
          </div>

          <div className="welcome-content">
            <div className="welcome-message">
              <h2>Welcome to the Habitat Restoration Concierge</h2>
              <p>Your personal guide to restoring wildlife habitat</p>
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
                    {(error.includes('not configured') || error.includes('SETUP.md')) && (
                      <p className="setup-link">
                        📖 See <a href="https://github.com/ampautsc/Concierge/blob/main/SETUP.md" target="_blank" rel="noopener noreferrer">SETUP.md</a> for configuration instructions.
                      </p>
                    )}
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
          </div>
        </main>

        <footer className="welcome-footer">
          <p>&copy; 2025 Camp Monarch - Together, we restore habitat one space at a time 🦋</p>
        </footer>
      </div>
    </div>
  );
};

// Bear Concierge Image Component  
const ConciergeAnimal = ({ animate = false }) => {
  // Try PNG first, fallback to SVG placeholder
  // To use the actual image: Download from https://github.com/ampautsc/Concierge/issues/3
  // and save as public/images/bear-concierge.png
  const imageSrc = '/images/bear-concierge.png';
  const fallbackSrc = '/images/bear-concierge.svg';
  
  return (
    <img 
      src={imageSrc}
      onError={(e) => { 
        if (e.target.src.endsWith('.png')) {
          e.target.src = fallbackSrc;
        }
      }}
      alt="Bear Concierge"
      className={`concierge-animal ${animate ? 'bowing' : ''}`}
      style={{
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};

export default WelcomeScreen;
