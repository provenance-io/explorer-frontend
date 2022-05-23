import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sprite from '../Sprite';

const PopupContainer = styled.div`
  position: absolute;
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`};
  left: -30px;
  ${({ position }) => {
    switch (position) {
      case 'above':
        return 'bottom: 150%;';
      case 'below':
        return 'top: 150%;';
      case 'left':
        return 'right: -35%; left: auto; top: 125%;';
      case 'right':
        return 'left: -35%; top: 125%;';
      default:
        return '';
    }
  }}
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
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
`;
const Caret = styled(Sprite)`
  position: absolute;
  left: 30px;
  ${({ position }) => {
    switch (position) {
      case 'above':
        return `
        bottom: -13px;
      `;
      case 'below':
        return `
        top: -13px;
        transform: rotate(180deg);
      `;
      case 'right':
        return `
        top: -13px;
        left: 10px;
        transform: rotate(180deg);
      `;
      case 'left':
        return `
        top: -13px;
        right: 10px;
        left: auto;
        transform: rotate(180deg);
      `;
      default:
        return '';
    }
  }}
`;

const PopupNote = ({ show, children, position, carat, delay, className, minWidth, zIndex }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [timeoutInstance, setTimeoutInstance] = useState(null);

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
    <PopupContainer
      delay={delay}
      position={position}
      className={`${className} ${show ? 'show' : 'hide'}`}
      minWidth={minWidth}
      zIndex={zIndex}
    >
      {carat ? <Caret icon="CARET" size="1.8rem" position={position} /> : null}
      {children}
    </PopupContainer>
  ) : null;
};

PopupNote.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  position: PropTypes.string,
  carat: PropTypes.bool,
  delay: PropTypes.number,
  className: PropTypes.string,
  minWidth: PropTypes.string,
  zIndex: PropTypes.string,
};

PopupNote.defaultProps = {
  show: false,
  children: null,
  position: 'below',
  carat: true,
  delay: 250,
  className: '',
  minWidth: '',
  zIndex: '',
};

export default PopupNote;
