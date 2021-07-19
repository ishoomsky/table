import React from 'react';
import styled from "styled-components";

function AppErrorMessage(props) {
  return (
      <ErrorMessage>
        <h1>Sorry, the service is unavailable</h1>
      </ErrorMessage>
  );
}

const ErrorMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: maroon;
`;

export default AppErrorMessage;