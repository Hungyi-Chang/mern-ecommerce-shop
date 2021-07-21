import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        {userInfo ? (
          <SidebarMenu>
            <SidebarLink to="/cart">CART</SidebarLink>
            <SidebarLink to="/" onClick={logoutHandler}>
              LOGOUT
            </SidebarLink>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarLink to="/cart">CART</SidebarLink>
            <SidebarLink to="/login">SIGN IN</SidebarLink>
          </SidebarMenu>
        )}
      </SidebarWrapper>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
