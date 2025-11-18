import React, { createContext, useContext, useState } from 'react';

/**
 * Auth Context for managing authentication state
 * Provides modal visibility and user form state management
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // SignIn form state
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });

  // SignUp form state
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });

  // Error states
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  // Toggle modal functions
  const openSignIn = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setSignInError('');
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
    setSignInData({ username: '', password: '' });
    setSignInError('');
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    setSignUpError('');
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
    setSignUpData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
    });
    setSignUpError('');
  };

  // Switch between modals
  const switchToSignUp = () => {
    closeSignIn();
    openSignUp();
  };

  const switchToSignIn = () => {
    closeSignUp();
    openSignIn();
  };

  // Form submission handlers
  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (!signInData.username || !signInData.password) {
      setSignInError('Please fill in all fields');
      return;
    }

    // TODO: Add your API call here for authentication
    console.log('[v0] SignIn:', signInData);
    // Example: await loginUser(signInData);
    
    closeSignIn();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (
      !signUpData.firstName ||
      !signUpData.lastName ||
      !signUpData.email ||
      !signUpData.username ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      setSignUpError('Please fill in all fields');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 8) {
      setSignUpError('Password must be at least 8 characters');
      return;
    }

    // TODO: Add your API call here for registration
    console.log('[v0] SignUp:', signUpData);
    // Example: await registerUser(signUpData);
    
    closeSignUp();
  };

  const value = {
    // Modal state
    isSignInOpen,
    isSignUpOpen,
    openSignIn,
    closeSignIn,
    openSignUp,
    closeSignUp,
    switchToSignUp,
    switchToSignIn,

    // Form data
    signInData,
    setSignInData,
    signUpData,
    setSignUpData,

    // Errors
    signInError,
    setSignInError,
    signUpError,
    setSignUpError,

    // Handlers
    handleSignIn,
    handleSignUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
