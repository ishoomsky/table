import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
  top: 0;
  left: ${containerPosX}px;
`;

export default function Notification({ notification, setNotification }) {
  const [rootElement, setRootElement] = useState(null);

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

  useEffect(() => {
    setRootElement(document.getElementById("notifications-root"));
  }, []);

  const notificationsModal =
    rootElement && notification
      ? ReactDOM.createPortal(
          <Container>
            <InlineNotification
              key={notification?.id}
              kind={notification?.kind}
              title={notification?.title}
              onClose={() => setNotification(null)}
            />
          </Container>,
          rootElement
        )
      : null;

  return notificationsModal;
}

Notification.defaultProps = {
  kind: "",
  title: "",
  id: "",
};

Notification.propTypes = {
  kind: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  setNotification: PropTypes.func.isRequired,
};
