import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Loading } from "carbon-components-react";
import styled from "styled-components";
import AppPage from "../../components/AppPage";

const UserPage = () => {
  const { params: { userId } } = useRouteMatch();
  const { users, loaded: usersLoaded, error: usersError } = useSelector((state) => state.users);
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(()=>{
    const currentUser = users.find((user) => user.id === userId);
    setCurrentUser(currentUser);
  }, [users])

  if (!currentUser) return <Loading active />;

  return (
    <AppPage>
      <TitleContainer>
        <h1 className="bx--type-expressive-heading-06 ibm-pb-10 ibm-mb-4">
          {currentUser.name}
        </h1>
      </TitleContainer>
      <ContentContainer>
        <ParameterSpan>Group: {currentUser.group}</ParameterSpan>
        <ParameterSpan>Balance: {currentUser.balance}</ParameterSpan>
        <ParameterSpan>Status: {currentUser.status}</ParameterSpan>
        <ParameterSpan>
          Note: {currentUser.note} {!currentUser.note && "no info"}
        </ParameterSpan>
      </ContentContainer>
    </AppPage>
  );
}

export default UserPage;

const TitleContainer = styled.div`
  height: 15vh;
  display: flex;
  align-items: flex-end;
  padding: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const ParameterSpan = styled.span`
  font-size: 16px;
`;