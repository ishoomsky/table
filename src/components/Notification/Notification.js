import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";
import { InlineNotification } from "carbon-components-react";
import styled from "styled-components";

import getWindowDimensions from "../../functions/getWindowDimensions";

const { width: windowWidth } = getWindowDimensions();

const containerWidth = 500;
const containerPosX = windowWidth / 2 - containerWidth / 2;

const Container = styled.div`
  position: fixed;
  width: ${containerWidth}px;
  left: ${containerPosX}px;
`;

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (notification) {
      const intervalId = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => {
        clearTimeout(intervalId);
      };
    }
  }, [notification]);

  return (
    <Container>
      <InlineNotification
        key={notification?.id}
        kind={notification?.kind}
        title={notification?.title}
        onClose={() => setNotification(null)}
      />
    </Container>
  );
};

export default Notification;

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
};
