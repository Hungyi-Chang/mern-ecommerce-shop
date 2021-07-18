import React from 'react';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  Logo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLink,
  IconContainer,
} from './NavbarElements';

const Navbar = ({ toggle }) => {
  /**
   * TODO : highlight button link after the url path changes
   */
  // const [currentPath, setCurrentPath] = useState();

  // const location = useLocation();

  // useEffect(() => {
  //   setCurrentPath(location);
  //   console.log(location.pathname);
  // }, [location]);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <Logo src="/favicon_io/android-chrome-192x192.png" />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLink to="/cart">
                <IconContainer>
                  <FaShoppingCart />
                </IconContainer>
                CART
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">
                <IconContainer>
                  <BsFillPersonFill />
                </IconContainer>
                SIGN IN
              </NavLink>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

Navbar.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Navbar;
