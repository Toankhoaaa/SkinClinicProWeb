import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getProfile, updateProfile } from '../services/api/auth';
import { validateSignUpForm } from '../utils/validation';

/**
 * Auth Context for managing authentication state
 * Provides modal visibility, user form state, and user session management
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
  const [isLoading, setIsLoading] = useState(false);
  
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

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

  const [signInError, setSignInError] = useState('');
  const [signUpErrors, setSignUpErrors] = useState({});

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
    setSignUpErrors({});
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
    setSignUpErrors({});
  };

  const openProfile = async () => {
    setIsProfileOpen(true);
    setProfileLoading(true);
    setProfileError('');
    try {
      const response = await getProfile();
      console.log('[v0] Profile fetched:', response);
      setProfileData(response.data);
    } catch (error) {
      console.log('[v0] Profile fetch error:', error);
      setProfileError(error.message || 'Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setProfileData(null);
  };

  const openAppointments = () => setIsAppointmentsOpen(true);
  const closeAppointments = () => setIsAppointmentsOpen(false);

  // Switch between modals
  const switchToSignUp = () => {
    closeSignIn();
    openSignUp();
  };

  const switchToSignIn = () => {
    closeSignUp();
    openSignIn();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!signInData.username || !signInData.password) {
      setSignInError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(signInData);
      console.log('[v0] Login successful:', response);
      
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      closeSignIn();
    } catch (error) {
      console.log('[v0] Login error:', error);
      setSignInError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const errors = validateSignUpForm(signUpData);
    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    setIsLoading(true);
    setSignUpErrors({});

    try {
      // TODO: Uncomment when backend is ready for registration
      // const response = await registerUser(signUpData);
      // console.log('[v0] Registration successful:', response);
      console.log('[v0] SignUp data validated:', signUpData);
      closeSignUp();
    } catch (error) {
      console.log('[v0] Registration error:', error);
      setSignUpErrors({ form: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    setProfileLoading(true);
    setProfileError('');
    try {
      const response = await updateProfile(updatedData);
      console.log('[v0] Profile updated:', response);
      setProfileData(response.data);
      return { success: true };
    } catch (error) {
      console.log('[v0] Profile update error:', error);
      setProfileError(error.message || 'Failed to update profile');
      return { success: false, error: error.message };
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfileData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsProfileOpen(false);
    setIsAppointmentsOpen(false);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('[v0] Failed to parse user data:', error);
      }
    }
  }, []);

  const value = {
    // Modal state
    isSignInOpen,
    isSignUpOpen,
    isProfileOpen,
    isAppointmentsOpen,
    openSignIn,
    closeSignIn,
    openSignUp,
    closeSignUp,
    openProfile,
    closeProfile,
    openAppointments,
    closeAppointments,
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
    signUpErrors,
    setSignUpErrors,

    // Handlers
    handleSignIn,
    handleSignUp,
    handleLogout,
    handleUpdateProfile,
    
    // User state
    user,
    setUser,
    profileData,
    profileLoading,
    profileError,
    
    // Loading state
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
