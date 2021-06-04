import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sprite from 'Components/Sprite';

const StyledButton = styled.button`
  text-align: left;
  display: flex;
  align-items: center;
  color: ${({ theme, color }) => theme[`BUTTON_${color}_FONT`]};
  background: ${({ theme, color }) => theme[`BUTTON_${color}`]};
  border-radius: 4px;
  border: 1px solid ${({ theme, color }) => theme[`BUTTON_${color}`]};
  padding: 6px 12px;
  cursor: pointer;
  &:focus {
    background: ${({ disabled, theme, color }) => !disabled && theme[`BUTTON_${color}_FOCUS`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:hover {
    background: ${({ disabled, theme, color }) => !disabled && theme[`BUTTON_${color}_HOVER`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:active {
    background: ${({ disabled, theme, color }) => !disabled && theme[`BUTTON_${color}_ACTIVE`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:disabled {
    background: ${({ theme }) => theme.BUTTON_DISABLED};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.BUTTON_DISABLED};
  }
`;
const ButtonContent = styled.div`
  font-size: 1.4rem;
`;
const ButtonIcon = styled.div`
  margin-left: 10px;
  display: flex;
`;

const Button = ({ className, color, icon, iconSize, iconColor, iconOptions, onClick, children, disabled }) => (
  <StyledButton
    className={className}
    onClick={onClick}
    color={color.toUpperCase()}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        onClick();
      }
    }}
    disabled={disabled}
  >
    <ButtonContent>{children}</ButtonContent>
    {icon && (
      <ButtonIcon>
        <Sprite {...iconOptions} icon={icon} size={iconSize} color={iconColor} />
      </ButtonIcon>
    )}
  </StyledButton>
);

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  iconOptions: PropTypes.object, // see Components/Sprite for available options
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  className: '',
  color: 'primary',
  icon: '',
  iconSize: '2.2rem',
  iconColor: 'ICON_WHITE',
  iconOptions: null,
  onClick: () => {},
  disabled: false,
};

export default Button;
