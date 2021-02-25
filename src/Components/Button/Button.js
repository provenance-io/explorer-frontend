import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sprite from 'Components/Sprite';

const StyledButton = styled.button`
  text-align: left;
  display: flex;
  align-items: center;
  color: ${({ theme, type }) => theme[`BUTTON_${type}_FONT`]};
  background: ${({ theme, type }) => theme[`BUTTON_${type}`]};
  border-radius: 5px;
  border: 1px solid ${({ theme, type }) => theme[`BUTTON_${type}`]};
  padding: 6px 12px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  &:focus {
    background: ${({ disabled, theme, type }) => !disabled && theme[`BUTTON_${type}_FOCUS`]};
  }
  &:hover {
    background: ${({ disabled, theme, type }) => !disabled && theme[`BUTTON_${type}_HOVER`]};
  }
  &:active {
    background: ${({ disabled, theme, type }) => !disabled && theme[`BUTTON_${type}_ACTIVE`]};
  }
  &:disabled {
    background: ${({ theme }) => theme.BUTTON_DISABLED};
    cursor: not-allowed;
  }
`;
const ButtonText = styled.span`
  font-size: 1.4rem;
  min-width: 93px;
`;
const ButtonIcon = styled.div`
  margin-left: 4px;
  display: flex;
`;

const Button = ({ className, type, icon, iconSize, iconColor, onClick, children, isDisabled }) => (
  <StyledButton
    className={className}
    onClick={onClick}
    type={type.toUpperCase()}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        onClick();
      }
    }}
    disabled={isDisabled}
  >
    <ButtonText>{children}</ButtonText>
    {icon && (
      <ButtonIcon>
        <Sprite icon={icon} size={iconSize} color={iconColor} />
      </ButtonIcon>
    )}
  </StyledButton>
);

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
};
Button.defaultProps = {
  className: '',
  type: 'primary',
  icon: '',
  iconSize: '2.2rem',
  iconColor: 'ICON_WHITE',
  onClick: () => {},
  isDisabled: false,
};

export default Button;
