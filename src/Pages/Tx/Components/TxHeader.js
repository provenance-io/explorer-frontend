import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CopyValue } from 'Components';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';

const TxHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  user-select: none;
  @media ${breakpoints.down('lg')} {
    font-size: 1rem;
  }
`;

const TxHeader = ({ isMed }) => {
  const { txHash } = useParams();

  return (
    <TxHeaderContainer>
      <Value title={txHash}>{isMed ? maxLength(txHash, 12, 6) : txHash}</Value>
      <CopyValue value={txHash} title={`Copy Transaction Hash ${txHash}`} />
    </TxHeaderContainer>
  );
};

TxHeader.propTypes = {
  isMed: PropTypes.bool.isRequired,
};

export default TxHeader;
