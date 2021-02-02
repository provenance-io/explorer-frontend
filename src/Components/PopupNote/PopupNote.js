import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sprite from '../Sprite';

const PopupContainer = styled.div`
  position: absolute;
  ${({ positionAbove }) => (positionAbove ? 'bottom: 150%;' : 'top: 150%;')}
  left: -30px;
  padding: 10px 16px;
  border-radius: 5px;
  background: ${({ theme }) => theme.BACKGROUND_THEME};
  color: ${({ theme }) => theme.FONT_WHITE};
  font-size: 1.2rem;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: ${({ delay }) => `opacity ${delay}ms ease-in-out`};
  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }
`;
const Caret = styled(Sprite)`
  position: absolute;
  ${({ arrowPointUp }) => (arrowPointUp ? 'top: -14px;' : 'bottom: -14px;')}
  left: 30px;
`;

const PopupNote = ({ show, children, position, delay, className }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [timeoutInstance, setTimeoutInstance] = useState(null);
  const positionAbove = position === 'above';
  // When the message is above, the arrow points down, when msg above, points down (into origination)
  const arrowPointUp = !positionAbove;

  useEffect(() => {
    const changed = showPopup !== show;
    if (changed && show && !fadingIn) {
      clearTimeout(timeoutInstance);
      setFadingIn(true);
      setFadingOut(false);
      const visibilityTimeout = setTimeout(() => {
        setShowPopup(true);
      }, delay);
      setTimeoutInstance(visibilityTimeout);
    } else if (changed && !show && !fadingOut) {
      clearTimeout(timeoutInstance);
      setFadingOut(true);
      setFadingIn(false);
      const visibilityTimeout = setTimeout(() => {
        setShowPopup(false);
      }, delay);
      setTimeoutInstance(visibilityTimeout);
    }
  }, [show, delay, timeoutInstance, showPopup, fadingIn, fadingOut]);

  // Cleanup timer
  useEffect(
    () => () => {
      clearTimeout(timeoutInstance);
    },
    [timeoutInstance]
  );

  return showPopup ? (
    <PopupContainer delay={delay} positionAbove={positionAbove} className={`${className} ${show ? 'show' : 'hide'}`}>
      {arrowPointUp && <Caret icon="CARET" size="1.8rem" flipY arrowPointUp={arrowPointUp} />}
      {children}
      {!arrowPointUp && <Caret icon="CARET" size="1.8rem" flipY={false} />}
    </PopupContainer>
  ) : null;
};

PopupNote.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  position: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string,
};

PopupNote.defaultProps = {
  show: false,
  children: null,
  position: 'below',
  delay: 250,
  className: '',
};

export default PopupNote;
