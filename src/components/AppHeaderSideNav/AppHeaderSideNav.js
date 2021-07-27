import React from 'react';
import PropTypes from "prop-types";

import {
  HeaderMenuItem,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "carbon-components-react";

const AppHeaderSideNav = (props) => {
  const { navItems, path, sideBarMoveToPage } = props;

  return (
    <SideNav aria-label="Side navigation" expanded={true} isPersistent={false}>
      <SideNavItems>
        <HeaderSideNavItems>
          {navItems.map(({ name, route }) => (
            <HeaderMenuItem
              key={`${name}${route}`}
              isCurrentPage={route === path}
              onClick={() => sideBarMoveToPage(route)}
            >
              {name}
            </HeaderMenuItem>
          ))}
        </HeaderSideNavItems>
      </SideNavItems>
    </SideNav>
  );
}

export default AppHeaderSideNav;

AppHeaderSideNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
  path: PropTypes.string.isRequired,
  sideBarMoveToPage: PropTypes.func.isRequired,
};