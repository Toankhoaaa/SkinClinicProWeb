import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Profile Modal Component
 * Displays and allows editing of user profile information
 */
const ProfileModal = () => {
  const { isProfileOpen, closeProfile, user, profileData, profileLoading, profileError, handleUpdateProfile } = useAuth();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone: '',
    gender: '',
    address: '',
  });
  const [updateError, setUpdateError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isProfileOpen || !user) return null;

  const handleEditClick = () => {
    if (profileData?.user) {
      setEditFormData({
        phone: profileData.user.phone || '',
        gender: profileData.user.gender || '',
        address: profileData.user.address || '',
      });
    }
    setIsEditMode(true);
    setUpdateError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');
  
    // Lọc ra chỉ những trường thay đổi
    const updatedFields = {};
    Object.keys(editFormData).forEach((key) => {
      if (editFormData[key] !== displayData[key]) {
        updatedFields[key] = editFormData[key];
      }
    });
  
    if (Object.keys(updatedFields).length === 0) {
      // Không có gì thay đổi
      setIsEditMode(false);
      setIsUpdating(false);
      return;
    }
  
    try {
      const result = await handleUpdateProfile(updatedFields); // PATCH với các trường thay đổi
      if (result.success) {
        setIsEditMode(false);
      } else {
        setUpdateError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setUpdateError(err.message || 'Failed to update profile');
    }
  
    setIsUpdating(false);
  };

  const displayData = profileData?.user || user;
  const roleMap = {
    3: 'Patient',
    2: 'Doctor',
    1: 'Admin'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={closeProfile}
        style={{ display: 'block' }}
      />

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="profileModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header p-3 bg-color text-white border-0" style={{ borderRadius: '6px 10px 0 0' }}>
              <h5 className="modal-title text-white" id="profileModalLabel">
                {isEditMode ? 'Edit Profile' : 'My Profile'}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => (isEditMode ? setIsEditMode(false) : closeProfile())}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              {profileLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : profileError ? (
                <div className="alert alert-danger" role="alert">
                  {profileError}
                </div>
              ) : (
                <>
                  {/* User Header */}
                  <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#003366',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                      }}
                    >
                      {`${displayData?.first_name?.[0] || ''}${displayData?.last_name?.[0] || ''}`}
                    </div>
                    <div>
                      <h5 className="mb-1">{`${displayData?.first_name} ${displayData?.last_name}`}</h5>
                      {(roleMap[displayData?.role] || 'Unknown').toUpperCase()}
                    </div>
                  </div>

                  {/* Error Messages */}
                  {updateError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {updateError}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setUpdateError('')}
                        aria-label="Close"
                      />
                    </div>
                  )}

                  {/* Profile Information */}
                  {isEditMode ? (
                    <form onSubmit={handleSaveProfile}>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={displayData?.email || ''}
                            disabled
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Gender</label>
                          <select
                            name="gender"
                            className="form-select"
                            value={editFormData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Date Joined</label>
                          <input
                            type="text"
                            className="form-control"
                            value={displayData?.date_joined ? new Date(displayData.date_joined).toLocaleDateString() : ''}
                            disabled
                          />
                        </div>

                        <div className="col-12 mb-3">
                          <label className="form-label fw-semibold">Address</label>
                          <textarea
                            name="address"
                            className="form-control"
                            rows="3"
                            value={editFormData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn bg-color text-white flex-grow-1 rounded border-0"
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary flex-grow-1 rounded border-0"
                          onClick={() => setIsEditMode(false)}
                          disabled={isUpdating}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold text-muted" style={{ fontSize: '12px' }}>
                            Email
                          </label>
                          <p className="form-control-plaintext">{displayData?.email || 'N/A'}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold text-muted" style={{ fontSize: '12px' }}>
                            Phone
                          </label>
                          <p className="form-control-plaintext">{displayData?.phone || 'Not provided'}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold text-muted" style={{ fontSize: '12px' }}>
                            Gender
                          </label>
                          <p className="form-control-plaintext">{displayData?.gender || 'Not specified'}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold text-muted" style={{ fontSize: '12px' }}>
                            Date Joined
                          </label>
                          <p className="form-control-plaintext">
                            {displayData?.date_joined ? new Date(displayData.date_joined).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>

                        <div className="col-12 mb-3">
                          <label className="form-label fw-semibold text-muted" style={{ fontSize: '12px' }}>
                            Address
                          </label>
                          <p className="form-control-plaintext">{displayData?.address || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-dark flex-grow-1 rounded border-0"
                          onClick={handleEditClick}
                        >
                          Edit Profile
                        </button>
                        <button
                          className="btn btn-outline-secondary flex-grow-1 rounded border-0"
                          onClick={closeProfile}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
