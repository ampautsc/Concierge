import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../config/firebase';
import { msalInstance, loginRequest, initializeMsal } from '../config/azure';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authProvider, setAuthProvider] = useState(null); // 'firebase', 'azure', or null

  useEffect(() => {
    const initAuth = async () => {
      // Initialize MSAL first
      await initializeMsal();
      
      // Check for Azure AD session
      const activeAccount = msalInstance.getActiveAccount();
      if (activeAccount) {
        setUser({
          displayName: activeAccount.name,
          email: activeAccount.username,
          uid: activeAccount.localAccountId,
          provider: 'azure'
        });
        setAuthProvider('azure');
        setLoading(false);
        return;
      }

      // Check for Firebase session
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            ...firebaseUser,
            provider: 'firebase'
          });
          setAuthProvider('firebase');
        } else if (!activeAccount) {
          setUser(null);
          setAuthProvider(null);
        }
        setLoading(false);
      });

      return unsubscribe;
    };

    let unsubscribe;
    initAuth().then(unsub => {
      if (unsub) unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setAuthProvider('firebase');
      return result.user;
    } catch (error) {
      let errorMessage = error.message;
      
      // Provide helpful setup instructions for common Firebase errors
      if (error.code === 'auth/internal-error' || error.message.includes('internal-error')) {
        errorMessage = 'Firebase authentication is not configured. Please follow the setup instructions in SETUP.md to configure Firebase Authentication with your project credentials.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      }
      
      setError(errorMessage);
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, appleProvider);
      setAuthProvider('firebase');
      return result.user;
    } catch (error) {
      let errorMessage = error.message;
      
      // Provide helpful setup instructions for common Firebase errors
      if (error.code === 'auth/internal-error' || error.message.includes('internal-error')) {
        errorMessage = 'Firebase authentication is not configured. Please follow the setup instructions in SETUP.md to configure Firebase Authentication with your project credentials.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      }
      
      setError(errorMessage);
      console.error('Apple sign-in error:', error);
      throw error;
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      setError(null);
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      msalInstance.setActiveAccount(loginResponse.account);
      
      const msUser = {
        displayName: loginResponse.account.name,
        email: loginResponse.account.username,
        uid: loginResponse.account.localAccountId,
        provider: 'azure'
      };
      
      setUser(msUser);
      setAuthProvider('azure');
      return msUser;
    } catch (error) {
      let errorMessage = error.message || 'Microsoft sign-in failed';
      
      // Provide helpful setup instructions for common Azure AD errors
      if (error.errorCode === 'invalid_client' || errorMessage.includes('AADSTS')) {
        errorMessage = 'Azure AD authentication is not configured. Please follow the setup instructions in SETUP.md to configure Microsoft sign-in with your Azure AD credentials.';
      } else if (error.errorCode === 'popup_window_error') {
        errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      } else if (error.errorCode === 'user_cancelled') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      }
      
      setError(errorMessage);
      console.error('Microsoft sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      
      if (authProvider === 'azure') {
        const activeAccount = msalInstance.getActiveAccount();
        if (activeAccount) {
          await msalInstance.logoutPopup({
            account: activeAccount,
          });
        }
      } else if (authProvider === 'firebase') {
        await firebaseSignOut(auth);
      }
      
      setUser(null);
      setAuthProvider(null);
    } catch (error) {
      setError(error.message);
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    authProvider,
    signInWithGoogle,
    signInWithApple,
    signInWithMicrosoft,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
