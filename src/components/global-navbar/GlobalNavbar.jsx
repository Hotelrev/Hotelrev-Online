import logo from 'assests/logos/HotelRev.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'components/hamburger-menu/HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import NavbarItems from 'components/navbar-items/NavbarItems';

const GlobalNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const onHamburgerMenuToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex flex-wrap justify-between items-center px-4 py-2 md:px-12 global-navbar__container bg-brand brand-divider-bottom">
      <div className="flex">
        <Link to="/">
          <img src={logo} alt="site logo" className="site-logo__img lg:w-[170px] w-[100px]" />
        </Link>
      </div>
      <ul className="list-none hidden md:flex">
        <NavbarItems isAuthenticated={isAuthenticated} />
      </ul>
      <FontAwesomeIcon
        data-testid="menu-toggle__button"
        icon={faBars}
        // size="2x"
        color="#fff"
        className="block md:hidden"
        onClick={onHamburgerMenuToggle}
      />
      <HamburgerMenu
        isVisible={isVisible}
        onHamburgerMenuToggle={onHamburgerMenuToggle}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default GlobalNavbar;
