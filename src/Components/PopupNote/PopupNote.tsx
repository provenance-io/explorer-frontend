import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Sprite from '../Sprite';

const PopupContainer = styled.div<{
  minWidth?: string;
  position?: 'above' | 'below' | 'left' | 'right';
  zIndex?: string;
  delay?: number;
}>`
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
  font-size: 0.75rem;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: ${({ delay }) => `opacity ${delay}ms ease-in-out`};
  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }
  z-index: ${({ zIndex }) => zIndex && zIndex};
`;
const Caret = styled(Sprite)<{ position?: 'above' | 'below' | 'left' | 'right' }>`
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

interface PopupNoteProps {
  show?: boolean;
  children?: any;
  position?: 'above' | 'below' | 'left' | 'right';
  carat?: boolean;
  delay?: number;
  className?: string;
  minWidth?: string;
  zIndex?: string;
}

export const PopupNote = ({
  show = false,
  children = null,
  position = 'below',
  carat = true,
  delay = 250,
  className = '',
  minWidth = '',
  zIndex = '',
}: PopupNoteProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [timeoutInstance, setTimeoutInstance] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const changed = showPopup !== show;
    if (changed && show && !fadingIn) {
      clearTimeout(timeoutInstance as unknown as number);
      setFadingIn(true);
      setFadingOut(false);
      const visibilityTimeout = setTimeout(() => {
        setShowPopup(true);
      }, delay);
      setTimeoutInstance(visibilityTimeout);
    } else if (changed && !show && !fadingOut) {
      clearTimeout(timeoutInstance as unknown as number);
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
      clearTimeout(timeoutInstance as unknown as number);
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
      {carat ? <Caret icon="CARET" size="1.125rem" position={position} /> : null}
      {children}
    </PopupContainer>
  ) : null;
};
