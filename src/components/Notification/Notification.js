import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { InlineNotification } from "carbon-components-react";
import styled from "styled-components";

import { getWindowDimensions } from "../../functions/utilities";

const { width: windowWidth } = getWindowDimensions();

const containerWidth = 500;
const containerPosX = windowWidth / 2 - containerWidth / 2;

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
      <InlineNotification key={notification.id} kind={notification.kind} title={notification.title} onClose={() => setNotification(null)} />
    </Container>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  setNotification: PropTypes.func.isRequired,
};

const Container = styled.div`
  z-index: 9999;
  top: 0;
  position: fixed;
  width: ${containerWidth}px;
  left: ${containerPosX}px;
`;

export default Notification;
