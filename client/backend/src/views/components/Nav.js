import React from "react";
import { NavLink } from "react-router-dom";
import styled from '@emotion/styled';
import StyleConst from '../style/constants';
import Menu from './Menu.js';

const MenuContainer = styled('nav')`
  display: flex;
  align-items: center;
  height: ${StyleConst.menuHeight};
  border-bottom: 1px solid #b3b3b3;
  box-sizing: border-box;
  
  @media (max-width: ${StyleConst.xs}) and (max-height: ${StyleConst.xs}) {
    height: ${StyleConst.menuHeightSlim};
  }
`;

const MenuLink = styled(NavLink)`
  padding: 0.8rem 1rem;
  margin: 0.5rem;
  color: #000;
  text-decoration: none;
  font-size: 18px;
  text-transform: uppercase;
  user-select: none;
  
  &.active {
    color: #a52a2a;
  }
  
  &:hover:not(.active),
  &:active:not(.active) {
    color: #b57b7b;
  }
`;

const Nav = () => {
    return (
        <MenuContainer>
            <Menu linkComponent={({ path, title }) => (
                <MenuLink
                    key={path}
                    to={path}>
                    {title}
                </MenuLink>
            )} />
        </MenuContainer>
    )
};

export default Nav;