import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * SignUp Modal Component
 * Displays registration form with full user details and validation
 */
const SignUpModal = () => {
  const {
    isSignUpOpen,
    closeSignUp,
    signUpData,
    setSignUpData,
    signUpErrors,
    handleSignUp,
    switchToSignIn,
    isLoading,
  } = useAuth();

  if (!isSignUpOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={() => !isLoading && closeSignUp()}
        style={{ display: 'block' }}
      />

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signUpModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header bg-color p-3 text-white border-0" style={{ borderRadius: '6px 10px 0 0' }}>
              <h5 className="modal-title text-white" id="signUpModalLabel">
                Create Account
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeSignUp}
                disabled={isLoading}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <form onSubmit={handleSignUp}>
                {/* Form Error Message */}
                {signUpErrors.form && (
                  <div className="alert alert-danger" role="alert">
                    {signUpErrors.form}
                  </div>
                )}

                {/* First Name & Last Name Row */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpFirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${signUpErrors.firstName ? 'is-invalid' : ''}`}
                      id="signUpFirstName"
                      placeholder="First name"
                      value={signUpData.firstName}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          firstName: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                    {signUpErrors.firstName && (
                      <small className="text-danger">{signUpErrors.firstName}</small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${signUpErrors.lastName ? 'is-invalid' : ''}`}
                      id="signUpLastName"
                      placeholder="Last name"
                      value={signUpData.lastName}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, lastName: e.target.value })
                      }
                      disabled={isLoading}
                    />
                    {signUpErrors.lastName && (
                      <small className="text-danger">{signUpErrors.lastName}</small>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="signUpEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${signUpErrors.email ? 'is-invalid' : ''}`}
                    id="signUpEmail"
                    placeholder="your@email.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  {signUpErrors.email && (
                    <small className="text-danger">{signUpErrors.email}</small>
                  )}
                </div>

                {/* Username Field */}
                <div className="mb-3">
                  <label htmlFor="signUpUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`form-control ${signUpErrors.username ? 'is-invalid' : ''}`}
                    id="signUpUsername"
                    placeholder="Choose a username"
                    value={signUpData.username}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, username: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  {signUpErrors.username && (
                    <small className="text-danger">{signUpErrors.username}</small>
                  )}
                </div>

                {/* Password & Confirm Password Row */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${signUpErrors.password ? 'is-invalid' : ''}`}
                      id="signUpPassword"
                      placeholder="Min. 6 characters, not all numbers"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                    {signUpErrors.password && (
                      <small className="text-danger">{signUpErrors.password}</small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpConfirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${signUpErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="signUpConfirmPassword"
                      placeholder="Confirm password"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          confirmPassword: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                    {signUpErrors.confirmPassword && (
                      <small className="text-danger">{signUpErrors.confirmPassword}</small>
                    )}
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mb-3">
                  <label htmlFor="signUpRole" className="form-label">
                    Select Role
                  </label>
                  <select
                    className="form-select"
                    id="signUpRole"
                    value={signUpData.role}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, role: e.target.value })
                    }
                    disabled={isLoading}
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn bg-color text-white w-100 mb-3 rounded border-0"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>
              </form>

              {/* Switch to SignIn */}
              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={switchToSignIn}
                    disabled={isLoading}
                    style={{ color: '#003366', fontWeight: 'bold' }}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
