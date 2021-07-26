import React from 'react';
import styled from "styled-components";

const AppErrorMessage = () => <ErrorMessage>Sorry, the service is unavailable</ErrorMessage>;

const ErrorMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: maroon;
  font-size: 22px;
`;

export default AppErrorMessage;
