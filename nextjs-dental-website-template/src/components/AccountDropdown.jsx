import React, { useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Account Dropdown Component
 * Displays user account menu with profile, appointments, and logout options
 */
const AccountDropdown = () => {
  const { user, openProfile, openAppointments, handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
  const userInitials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    openProfile();
  };

  const handleAppointmentsClick = () => {
    setIsDropdownOpen(false);
    openAppointments();
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    handleLogout();
  };

  return (
    <div className="account-dropdown position-relative dropdown" ref={dropdownRef}>
      {/* Account Avatar Button */}
      <button
        className="btn btn-sm d-flex align-items-center gap-2 text-dark"
        onClick={() => {
          console.log("Clicked!");
          setIsDropdownOpen(!isDropdownOpen)}}
        style={{
          background: '#f0f0f0',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#003366',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {userInitials}
        </div>
        <span className="text-truncate" style={{ maxWidth: '120px', fontSize: '14px' }}>
          {fullName}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="dropdown-menu show"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            minWidth: '200px',
            marginTop: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1050,
            display: 'block',
          }}
        >
          <div className="dropdown-header px-3 py-2 border-bottom">
            <p className="mb-0 fw-semibold" style={{ fontSize: '13px' }}>
              {fullName}
            </p>
            <small className="text-muted">{user.email}</small>
          </div>

          <button
            className="dropdown-item"
            onClick={handleProfileClick}
            style={{ padding: '10px 15px' }}
          >
            <i className="uil uil-user me-2" />
            View Profile
          </button>

          <button
            className="dropdown-item"
            onClick={handleAppointmentsClick}
            style={{ padding: '10px 15px' }}
          >
            <i className="uil uil-calendar-alt me-2" />
            My Appointments
          </button>

          <hr className="my-1" />

          <button
            className="dropdown-item text-danger"
            onClick={handleLogoutClick}
            style={{ padding: '10px 15px' }}
          >
            <i className="uil uil-sign-out-alt me-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
