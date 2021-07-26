import React, { useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderGlobalAction,
} from "carbon-components-react";
import { ArrowLeft20 } from "@carbon/icons-react";
import styled from "styled-components";

import * as routes from '../../navigation/routes';

const AppHeader = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();

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

  const isCurrentPageHome = url === "/";
  const isCurrentPageTable = /^\/table$/.test(url);
  const isCurrentPageUser = /^\/table\//.test(url);

  return (
    <Header aria-label="IBA">
      {!isCurrentPageUser && (
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={() => setSideBarExpanded(!sideBarExpanded)}
        />
      )}

      {isCurrentPageUser && (
        <NavButtonWrapper>
          <HeaderGlobalAction aria-label="Search" onClick={moveBack}>
            <ArrowLeft20 />
          </HeaderGlobalAction>
        </NavButtonWrapper>
      )}
      <HeaderName prefix="Simple">Table</HeaderName>
      <HeaderNavigation aria-label="IBA">
        {isCurrentPageUser && (
          <HeaderGlobalAction aria-label="Search" onClick={moveBack}>
            <ArrowLeft20 />
          </HeaderGlobalAction>
        )}
        {!isCurrentPageUser && (
          <>
            <HeaderMenuItem
              isCurrentPage={isCurrentPageHome}
              onClick={() => moveToPage(routes.BASE_ROUTE)}
            >
              Home
            </HeaderMenuItem>
            <HeaderMenuItem
              isCurrentPage={isCurrentPageTable}
              onClick={() => moveToPage(routes.TABLE)}
            >
              Table
            </HeaderMenuItem>
          </>
        )}
      </HeaderNavigation>

      {sideBarExpanded && (
        <SideNav
          aria-label="Side navigation"
          expanded={true}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem
                isCurrentPage={isCurrentPageHome}
                onClick={() => sideBarMoveToPage(routes.BASE_ROUTE)}
              >
                Home
              </HeaderMenuItem>
              <HeaderMenuItem
                isCurrentPage={isCurrentPageTable}
                onClick={() => sideBarMoveToPage(routes.TABLE)}
              >
                Table
              </HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
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