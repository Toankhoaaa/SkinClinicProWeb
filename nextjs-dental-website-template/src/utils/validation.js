/**
 * Validation utilities for form fields
 */

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password is entirely numeric
export const isNumericPassword = (password) => {
  return /^\d+$/.test(password);
};

// Validate password strength
export const isStrongPassword = (password) => {
  // Password must be at least 6 characters
  if (password.length < 6) {
    return false;
  }
  
  // Password must contain at least one letter or special character
  // (not entirely numeric as per requirement)
  return !isNumericPassword(password);
};

// General validation function
export const validateSignUpForm = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.username?.trim()) {
    errors.username = 'Username is required';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (isNumericPassword(formData.password)) {
    errors.password = 'Password cannot be entirely numeric';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
