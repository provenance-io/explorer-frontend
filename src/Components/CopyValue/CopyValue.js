import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Sprite from '../Sprite';

const CopyButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;
const CopiedNotice = styled.div`
  background: ${({ theme }) => theme.BACKGROUND_THEME};
  color: ${({ theme }) => theme.FONT_WHITE};
  position: absolute;
  padding: 8px;
  border-radius: 5px;
  bottom: -50px;
  left: -8px;
  min-width: 75px;
`;
const Caret = styled(Sprite)`
  position: absolute;
  top: -14px;
`;

const CopyValue = ({ value, className, size, icon, title }) => {
  const [justCopied, setJustCopied] = useState(false);
  const [timeoutInstance, setTimeoutInstance] = useState(null);

  // Kill any times when unmounted (prevent memory leaks w/running timers)
  useEffect(
    () => () => {
      timeoutInstance && clearTimeout(timeoutInstance);
    },
    [timeoutInstance]
  );

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      clearTimeout(timeoutInstance);
      setJustCopied(true);
      const newTimeoutInstance = setTimeout(() => {
        setJustCopied(false);
      }, 1000);
      setTimeoutInstance(newTimeoutInstance);
    });
  };

  return (
    <CopyButton title={title} onClick={handleCopyClick} className={className}>
      <Sprite size={size} icon={icon} />
      {justCopied && (
        <CopiedNotice>
          <Caret icon="CARET" size="1.8rem" flipY />
          Copied!
        </CopiedNotice>
      )}
    </CopyButton>
  );
};

CopyValue.propTypes = {
  value: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
};
CopyValue.defaultProps = {
  className: '',
  size: '1.8rem',
  icon: 'REPORTS',
  title: 'Copy Text',
  value: '',
};

export default CopyValue;
