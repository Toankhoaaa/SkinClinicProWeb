import React from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import useSticky from 'hooks/useSticky';

/**
 * Header component with sticky behavior.
 * Includes Topbar and Navbar with scroll-based stickiness.
 * Also renders Auth modals for SignIn and SignUp.
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
    </>
  );
};

export default Header;
