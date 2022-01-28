import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { maxLength } from 'utils';

const BlockImageContainer = styled.div`
  display: flex;
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '5px')};
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme, color }) => (color ? color : theme.BACKGROUND_LIGHT)};
  height: ${({ sizeContainer }) => (sizeContainer ? sizeContainer : '150px')};
  width: ${({ sizeContainer }) => (sizeContainer ? sizeContainer : '150px')};
  overflow: hidden;
`;

const BlockImageLetter = styled.span`
  font-size: ${({ sizeText }) => (sizeText ? sizeText : '7rem')};
  color: ${({ theme, color }) => (color ? color : theme.FONT_PRIMARY)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
`;

const ImageElement = styled.img`
  width: 100%;
`;

const BlockImage = ({
  icon,
  moniker,
  address,
  sizeText,
  sizeContainer,
  marginRight,
  colorBackground,
  colorFont,
  fontWeight,
}) => (
  <BlockImageContainer
    sizeContainer={sizeContainer}
    marginRight={marginRight}
    color={colorBackground}
    title={moniker ? moniker : address}
  >
    {icon ? (
      <ImageElement
        src={icon}
        alt={moniker ? maxLength(moniker, 16) : '?'}
        title={moniker ? maxLength(moniker, 16) : '?'}
      />
    ) : (
      <BlockImageLetter sizeText={sizeText} color={colorFont} fontWeight={fontWeight}>
        {moniker ? moniker[0] : `${address}`[0]}
      </BlockImageLetter>
    )}
  </BlockImageContainer>
);

BlockImage.propTypes = {
  icon: PropTypes.string,
  moniker: PropTypes.string,
  address: PropTypes.string.isRequired,
  sizeText: PropTypes.string,
  sizeContainer: PropTypes.string,
  marginRight: PropTypes.string,
  colorBackground: PropTypes.string,
  colorFont: PropTypes.string,
  fontWeight: PropTypes.string,
};

BlockImage.defaultProps = {
  icon: null,
  moniker: null,
  sizeText: '',
  sizeContainer: '',
  marginRight: '',
  colorBackground: '',
  colorFont: '',
  fontWeight: '',
};

export default BlockImage;
