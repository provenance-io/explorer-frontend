import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ICON_NAMES } from 'consts';

interface SvgProps {
  alt?: string;
  animate?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  secondaryColor?: string;
  size?: string;
  spin?: string | number;
}

interface SpriteTypes extends SvgProps {
  color?: string;
  height?: string;
  icon: string;
  width?: string;
  onClick?: () => void;
}

const Svg = styled.svg<SvgProps>`
  --secondaryColor: ${({ secondaryColor }) => secondaryColor};
  width: ${({ size, width }) => width || size};
  height: ${({ size, height }) => height || size};
  transform: ${({ flipX }) => flipX && `scaleX(-1)`} ${({ flipY }) => flipY && `scaleY(-1)`}
    ${({ spin }) => Boolean(spin) && `rotate(${spin}deg)`};
  transition: ${({ animate }) => animate && 'transform 150ms linear'};
`;

const Sprite = ({
  alt,
  animate = false,
  color = 'BLUE_PRIMARY',
  icon,
  secondaryColor = 'WHITE',
  size = '100%',
  spin = 0,
  onClick,
  ...svgIcons
}: SpriteTypes) => {
  const theme = useTheme();

  // Use the variable color name if it exists, else the actual color passed in, or else default color
  const colorValue = theme[color] ? theme[color] : color || theme.ICON_PRIMARY;
  const secondaryColorValue = theme[secondaryColor]
    ? theme[secondaryColor]
    : secondaryColor || theme.WHITE;

  return (
    <Svg
      {...svgIcons}
      alt={alt || `${icon} icon`}
      animate={animate}
      color={colorValue}
      size={size}
      spin={spin}
      secondaryColor={secondaryColorValue}
      onClick={onClick}
    >
      <use href={`#${icon}`} />
    </Svg>
  );
};

// Exposes Icon constant so it doesn't need to be imported separately when consuming component
Sprite.Icon = ICON_NAMES;

export default Sprite;
