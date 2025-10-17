import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../config/firebase';
import { msalInstance, loginRequest } from '../config/azure';

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
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setAuthProvider('firebase');
      return result.user;
    } catch (error) {
      setError(error.message);
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
      setError(error.message);
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
      setError(error.message || 'Microsoft sign-in failed');
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
