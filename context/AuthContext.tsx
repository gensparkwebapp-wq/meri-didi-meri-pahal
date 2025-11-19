
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  lastUsedEmail: string;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 Days in milliseconds

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Lazy Initialization: Read from storage BEFORE initial render to prevent session break on refresh
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('desididi_user');
      const expiry = localStorage.getItem('desididi_session_expiry');
      
      // Validate session expiry
      if (storedUser && expiry) {
        if (Date.now() < parseInt(expiry)) {
          return JSON.parse(storedUser);
        } else {
          // Session expired
          localStorage.removeItem('desididi_user');
          localStorage.removeItem('desididi_session_expiry');
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to retrieve user from storage:", error);
      return null;
    }
  });

  // 2. Store last used email separately for "Login Once" feature (persists even after logout)
  const [lastUsedEmail, setLastUsedEmail] = useState<string>(() => {
    return localStorage.getItem('desididi_last_email') || '';
  });

  const login = (userData: User) => {
    setUser(userData);
    setLastUsedEmail(userData.email);
    
    // Persist session
    localStorage.setItem('desididi_user', JSON.stringify(userData));
    localStorage.setItem('desididi_session_expiry', (Date.now() + SESSION_DURATION).toString());
    localStorage.setItem('desididi_last_email', userData.email);
    
    // Simulate setting a secure token (In a real backend, this matches the Set-Cookie logic)
    console.log('Session created. Valid for 30 days.');
  };

  const logout = () => {
    setUser(null);
    // Destroy session data explicitly
    localStorage.removeItem('desididi_user');
    localStorage.removeItem('desididi_session_expiry');
    // We intentionally keep 'desididi_last_email' to support easy re-login
    console.log('Session destroyed.');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('desididi_user', JSON.stringify(updatedUser));
      // If email changes, update the last known email too
      if (updates.email) {
        setLastUsedEmail(updates.email);
        localStorage.setItem('desididi_last_email', updates.email);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      lastUsedEmail,
      login, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
