import React from 'react';
import PropTypes from 'prop-types';

import {
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalAction,
} from "carbon-components-react";
import { ArrowLeft20 } from "@carbon/icons-react";

const AppHeaderNavigation = (props) => {
  const { isCurrentPageUser, moveBack, navItems, path, moveToPage } = props;
  return (
    <HeaderNavigation aria-label="IBA">
      {isCurrentPageUser ? (
        <HeaderGlobalAction aria-label="Search" onClick={moveBack}>
          <ArrowLeft20 />
        </HeaderGlobalAction>
      ) : (
        navItems.map(({ name, route }) => (
          <HeaderMenuItem
            key={`${name}${route}`}
            isCurrentPage={route === path}
            onClick={() => moveToPage(route)}
          >
            {name}
          </HeaderMenuItem>
        ))
      )}
    </HeaderNavigation>
  );
}

export default AppHeaderNavigation;

AppHeaderNavigation.propTypes = {
  isCurrentPageUser: PropTypes.bool.isRequired,
  moveBack: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
  path: PropTypes.string.isRequired,
  moveToPage: PropTypes.func.isRequired,
};