import React from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import ProfileModal from './ProfileModal';
import AppointmentsModal from './AppointmentsModal';
import useSticky from 'hooks/useSticky';

/**
 * Header component with sticky behavior.
 * Includes Topbar and Navbar with scroll-based stickiness.
 * Also renders Auth modals for SignIn, SignUp, Profile, and Appointments.
 */
const Header = () => {
  const isSticky = useSticky(350);

  return (
    <>
      <header
        className={`sticky-wrapper${isSticky ? ' is-sticky' : ''}`}
      >
        <Topbar />
        <Navbar />
      </header>
      <SignInModal />
      <SignUpModal />
      <ProfileModal />
      <AppointmentsModal />
    </>
  );
};

export default Header;
