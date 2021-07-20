import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const Nav = styled.nav`
  background: #3e4b59;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
  align-items: center;
`;

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  margin-left: 24px;
`;

export const Logo = styled.img`
  width: 55px;
  height: 55px;
  @media screen and (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    color: #fff;
    position: absolute;
    top: 0;
    right: 15px;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;

  list-style: none;
  text-align: center;
  margin-top: 8px;
  margin-right: 5px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLink = styled(LinkR)`
  color: #ffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  ${'' /* margin-top: 5px; */}

  &:hover {
    color: #d6f7f8;
  }
`;

export const IconContainer = styled.div`
  margin-right: 8px;
  align-items: center;
  margin-top: -5px;
`;
