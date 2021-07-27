import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalAction,
} from "carbon-components-react";
import { ArrowLeft20 } from "@carbon/icons-react";
import styled from "styled-components";

import * as routes from '../../navigation/routes';
import AppHeaderNavigation from "../AppHeaderNavigation";
import AppHeaderSideNav from '../AppHeaderSideNav';

const navItems = [
  { name: routes.BASE_ROUTE_NAME, route: routes.BASE_ROUTE, }, 
  { name: routes.TABLE_NAME, route: routes.TABLE },
];

const AppHeader = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
  const [isCurrentPageUser, setCurrentPageUser] = useState(false);

  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    if (routes.USER === path) {
      setCurrentPageUser(true);
    }
  }, [url]);

  const moveToPage = (route) => {
    history.push(route);
  };
  const sideBarMoveToPage = (route) => {
    setSideBarExpanded(false);
    history.push(route);
  };
  const moveBack = () => {
    window.close();
  }

  return (
    <Header aria-label="IBA">
      {isCurrentPageUser ? (
        <NavButtonWrapper>
          <HeaderGlobalAction aria-label="Search" onClick={moveBack}>
            <ArrowLeft20 />
          </HeaderGlobalAction>
        </NavButtonWrapper>
      ) : (
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={() => setSideBarExpanded(!sideBarExpanded)}
        />
      )}

      <HeaderName prefix="Simple">Table</HeaderName>
      <AppHeaderNavigation
        isCurrentPageUser={isCurrentPageUser}
        moveBack={moveBack}
        navItems={navItems}
        path={path}
        moveToPage={moveToPage}
      />

      {sideBarExpanded && (
        <AppHeaderSideNav
          navItems={navItems}
          path={path}
          sideBarMoveToPage={sideBarMoveToPage}
        />
      )}
    </Header>
  );
}

export default AppHeader;

const NavButtonWrapper = styled.div`
  @media (min-width: 1055px) {
    display: none;
  }
`;
