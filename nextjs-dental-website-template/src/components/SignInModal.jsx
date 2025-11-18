import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * SignIn Modal Component
 * Displays login form with username and password fields
 */
const SignInModal = () => {
  const {
    isSignInOpen,
    closeSignIn,
    signInData,
    setSignInData,
    signInError,
    handleSignIn,
    switchToSignUp,
    isLoading,
  } = useAuth();

  if (!isSignInOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={() => !isLoading && closeSignIn()}
        style={{ display: 'block' }}
      />

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signInModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header p-3 bg-color text-white border-0" style={{ borderRadius: '6px 10px 0 0' }}>
              <h5 className="modal-title text-white" id="signInModalLabel">
                Sign In
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeSignIn}
                disabled={isLoading}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <form onSubmit={handleSignIn}>
                {/* Error Message */}
                {signInError && (
                  <div className="alert alert-danger" role="alert">
                    {signInError}
                  </div>
                )}

                {/* Username Field */}
                <div className="mb-3">
                  <label htmlFor="signInUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signInUsername"
                    placeholder="Enter your username"
                    value={signInData.username}
                    onChange={(e) =>
                      setSignInData({ ...signInData, username: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="signInPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    placeholder="Enter your password"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn bg-color text-white w-100 mb-3 rounded border-0"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Switch to SignUp */}
              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={switchToSignUp}
                    disabled={isLoading}
                    style={{ color: '#003366', fontWeight: 'bold' }}
                  >
                    Sign Up
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

export default SignInModal;
