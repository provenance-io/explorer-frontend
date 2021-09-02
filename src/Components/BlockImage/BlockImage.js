import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { maxLength } from 'utils';

const BlockImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  height: 150px;
  width: 150px;
  overflow: hidden;
`;

const BlockImageLetter = styled.span`
  font-size: 7rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
`;

const ImageElement = styled.img`
  width: 100%;
`;

const BlockImage = ({ icon, moniker, address }) => (
  <BlockImageContainer title={moniker ? moniker : address}>
    {icon ? (
      <ImageElement
        src={icon}
        alt={moniker ? maxLength(moniker, 16) : '?'}
        title={moniker ? maxLength(moniker, 16) : '?'}
      />
    ) : (
      <BlockImageLetter>{moniker ? moniker[0] : `${address}`[0]}</BlockImageLetter>
    )}
  </BlockImageContainer>
);

BlockImage.propTypes = {
  icon: PropTypes.string,
  moniker: PropTypes.string,
  address: PropTypes.string.isRequired,
};

BlockImage.defaultProps = {
  icon: null,
  moniker: null,
};

export default BlockImage;
