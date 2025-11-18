import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * SignUp Modal Component
 * Displays registration form with full user details
 */
const SignUpModal = () => {
  const {
    isSignUpOpen,
    closeSignUp,
    signUpData,
    setSignUpData,
    signUpError,
    handleSignUp,
    switchToSignIn,
  } = useAuth();

  if (!isSignUpOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={closeSignUp}
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
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <form onSubmit={handleSignUp}>
                {/* Error Message */}
                {signUpError && (
                  <div className="alert alert-danger" role="alert">
                    {signUpError}
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
                      className="form-control"
                      id="signUpFirstName"
                      placeholder="First name"
                      value={signUpData.firstName}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="signUpLastName"
                      placeholder="Last name"
                      value={signUpData.lastName}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="signUpEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    placeholder="your@email.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                  />
                </div>

                {/* Username Field */}
                <div className="mb-3">
                  <label htmlFor="signUpUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signUpUsername"
                    placeholder="Choose a username"
                    value={signUpData.username}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, username: e.target.value })
                    }
                  />
                </div>

                {/* Password & Confirm Password Row */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="signUpPassword"
                      placeholder="Min. 6 characters"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="signUpConfirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="signUpConfirmPassword"
                      placeholder="Confirm password"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
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
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn bg-color text-white w-100 mb-3 rounded border-0"
                >
                  Sign Up
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
