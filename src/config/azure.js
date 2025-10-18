import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'demo-client-id',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || 'common'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add scopes for user read
export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};

// Initialize MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL (lazy initialization - will be called before use)
let initializationPromise = null;

export const initializeMsal = async () => {
  if (!initializationPromise) {
    initializationPromise = msalInstance.initialize().then(() => {
      // Set active account if available
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    });
  }
  return initializationPromise;
};

export default msalInstance;
