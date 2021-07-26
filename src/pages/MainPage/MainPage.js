import React from 'react';
import AppPage from "../../components/AppPage";
import styled from "styled-components";

const MainPage = () => {
  return (
    <AppPage>
      <WelcomeContainer>
        <h1 className="bx--type-expressive-heading-06 ibm-pb-10 ibm-mb-4">
          Hello, everybody!
        </h1>
      </WelcomeContainer>
    </AppPage>
  );
};

export default MainPage;

const WelcomeContainer = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
`;