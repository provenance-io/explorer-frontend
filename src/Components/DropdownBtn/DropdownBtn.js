import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
import useOnEscape from 'react-tiny-hooks/use-on-escape';
import useToggle from 'react-tiny-hooks/use-toggle';
import Sprite from '../Sprite';
import Button from '../Button';

const Container = styled.div`
  position: relative;
`;

const ButtonGroup = styled.div`
  position: relative;
`;

const SelectArrow = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -20px;
  top: 0;
  height: 100%;
  width: 26px;
  border: none;
  border-radius: 0px 4px 4px 0px;
  background: ${({ theme, $color }) => theme[`BUTTON_${$color}`]};
  cursor: pointer;

  &:focus {
    background: ${({ disabled, theme, $color }) => !disabled && theme[`BUTTON_${$color}_FOCUS`]};
    border-color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FOCUS`]};
  }
  &:hover {
    background: ${({ disabled, theme, $color }) => !disabled && theme[`BUTTON_${$color}_HOVER`]};
    border-color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FOCUS`]};
  }
  &:active {
    background: ${({ disabled, theme, $color }) => !disabled && theme[`BUTTON_${$color}_ACTIVE`]};
    border-color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FOCUS`]};
  }
  &:disabled {
    background: ${({ theme }) => theme.BUTTON_DISABLED};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.BUTTON_DISABLED};
  }
`;

const DropdownList = styled.ul`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  right: -20px;
  margin: 10px 0 0;
  padding: 0;
  border-radius: 4px;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  list-style: none;
  z-index: 1;
`;

const ListItem = styled.li`
  margin: 5px 0;
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FONT`]};
    background: ${({ disabled, theme, $color }) => !disabled && theme[`BUTTON_${$color}_HOVER`]};
    border-color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FOCUS`]};
  }
`;

const DropdownBtn = ({ color, initial, onClick, options }) => {
  const $color = color.toUpperCase();
  const [showDropdown, toggleDropdown, , deactivateDropdown] = useToggle();
  const containerRef = useOnClickOutside(deactivateDropdown);
  const [action, setAction] = useState(initial);
  const [list, setList] = useState(options);
  const theme = useTheme();

  useOnEscape(deactivateDropdown);

  useEffect(() => {
    setList(options.filter((o) => o !== action));
  }, [options, action]);

  const handleAction = () => {
    deactivateDropdown();
    onClick(action.toLowerCase().replace(' ', ''));
  };

  const handleSelectAction = (action) => {
    deactivateDropdown();
    setAction(action);
  };

  return (
    <Container ref={containerRef}>
      <ButtonGroup>
        <Button color={color} onClick={handleAction}>
          {action}
        </Button>
        <SelectArrow $color={$color} onClick={toggleDropdown}>
          <Sprite icon="CARET" size="0.9rem" color={theme[`BUTTON_${$color}_FONT`]} />
        </SelectArrow>
      </ButtonGroup>
      <DropdownList show={showDropdown}>
        {list.map((li) => (
          <ListItem $color={$color} key={li} onClick={() => handleSelectAction(li)}>
            {li}
          </ListItem>
        ))}
      </DropdownList>
    </Container>
  );
};

DropdownBtn.propTypes = {
  color: PropTypes.string,
  initial: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

DropdownBtn.defaultProps = {
  color: 'primary',
};

export default DropdownBtn;
