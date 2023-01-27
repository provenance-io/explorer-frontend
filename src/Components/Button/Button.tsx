import React from 'react';
import styled from 'styled-components';
import { Sprite } from '../';

interface ButtonProps {
  className?: string;
  color?: string;
  icon?: string;
  iconSize?: string;
  iconColor?: string;
  iconOptions?: object; // see Components/Sprite for available options
  onClick?: (arg?: any) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const StyledButton = styled.button<ButtonProps>`
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

const Button = ({
  className,
  color = 'primary',
  icon,
  iconSize = '2.2rem',
  iconColor = 'ICON_WHITE',
  iconOptions,
  onClick = (arg?: any) => {},
  children,
  disabled = false,
  type,
}: ButtonProps) => (
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
    type={type}
  >
    <ButtonContent>{children}</ButtonContent>
    {icon && (
      <ButtonIcon>
        <Sprite {...iconOptions} icon={icon} size={iconSize} color={iconColor} />
      </ButtonIcon>
    )}
  </StyledButton>
);

export default Button;
