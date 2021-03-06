/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
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

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

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

            {userInfo ? (
              <NavDropdown
                title={<span className="text-white">{userInfo.name}</span>}
                id="username"
                className="my-auto"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item className="menuItem">
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item className="menuItem" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavItem>
                <NavLink to="/login">
                  <IconContainer>
                    <BsFillPersonFill />
                  </IconContainer>
                  SIGN IN
                </NavLink>
              </NavItem>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title={<span className="text-white">Admin</span>}
                id="adminmenu"
                className="my-auto"
              >
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item className="menuItem">
                    Users
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item className="menuItem">
                    Products
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item className="menuItem">
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
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
