import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { maxLength, isEmpty } from 'utils';
import { default as BaseSprite } from '../../Components/Sprite';

const BlockImageContainer = styled.div`
  display: flex;
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '5px')};
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme, color }) => (color ? color : theme.BACKGROUND_LIGHT)};
  height: ${({ sizeContainer }) => (sizeContainer ? `${sizeContainer}px` : '150px')};
  width: ${({ sizeContainer }) => (sizeContainer ? `${sizeContainer}px` : '150px')};
  overflow: hidden;
`;

const BlockImageLetter = styled.span`
  font-size: ${({ sizeText }) => (sizeText ? `${sizeText}px` : '7rem')};
  color: ${({ theme, color }) => (color ? color : theme.FONT_PRIMARY)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  text-transform: uppercase;
`;

const ImageElement = styled.img`
  width: 100%;
`;

const Sprite = styled(BaseSprite)`
  align-self: center;
  margin-left: ${({ spriteMargin }) => spriteMargin};
`;

const BlockImage = ({
  icon,
  spriteProps,
  spriteMargin,
  moniker,
  address,
  sizeText,
  marginRight,
  colorBackground,
  colorFont,
  fontWeight,
}) => (
  <BlockImageContainer
    sizeContainer={sizeText * 2}
    marginRight={marginRight}
    color={colorBackground}
    title={moniker ? moniker : address}
  >
    {!isEmpty(spriteProps) ? (
      <Sprite spriteMargin={spriteMargin} {...spriteProps} />
    ) : icon ? (
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
  spriteProps: PropTypes.object,
  spriteMargin: PropTypes.string,
  icon: PropTypes.string,
  moniker: PropTypes.string,
  address: PropTypes.string.isRequired,
  sizeText: PropTypes.number,
  marginRight: PropTypes.string,
  colorBackground: PropTypes.string,
  colorFont: PropTypes.string,
  fontWeight: PropTypes.string,
};

BlockImage.defaultProps = {
  spriteProps: {},
  spriteMargin: '',
  icon: null,
  moniker: null,
  sizeText: 0,
  marginRight: '',
  colorBackground: '',
  colorFont: '',
  fontWeight: '',
};

export default BlockImage;
