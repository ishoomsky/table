import React from 'react';
import styled from "styled-components";
import { Grid } from "carbon-components-react";

import AppHeader from "../AppHeader";

const AppPage = ({ children }) => {
  return (
    <Grid>
      <AppHeader />
      <ContentContainer>
        {children}
      </ContentContainer>
    </Grid>
  );
};

export default AppPage;

const ContentContainer = styled.div`
  margin-top: 50px;
`;