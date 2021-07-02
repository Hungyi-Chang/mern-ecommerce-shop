import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';

export const SidebarContainer = styled.aside`
 position fixed;
 z-index: 999;
 width: 100%;
 height: 100%;
 background: #D6F7F8;
 display: grid;
 align-items: center;
 top: 0;
 left: 0;
 transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => {
    return isOpen ? '100%' : '0';
  }}; 
 top: ${({ isOpen }) => {
   return isOpen ? '0' : '-100%';
 }}; 
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;

  &:hover {
    color: #87939e;
    transition: 0.2s ease-in-out;
  }
`;

export const Icon = styled.div`
  display: block;
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;

export const SidebarMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 80px);
  text-align: center;
  justify-items: center;
  align-items: center;
  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(2, 60px);
  }
`;

export const SidebarLink = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #87939e;
    transition: 0.2s ease-in-out;
  }
`;
