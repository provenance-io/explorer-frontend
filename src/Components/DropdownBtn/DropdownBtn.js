import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
import useOnEscape from 'react-tiny-hooks/use-on-escape';
import useToggle from 'react-tiny-hooks/use-toggle';
import Sprite from '../Sprite';
import OgButton from '../Button';

const Container = styled.div`
  position: relative;
`;

const ButtonGroup = styled.div`
  position: relative;
  padding-right: 1rem;
`;

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

const SelectArrow = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
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
  right: 0;
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
  text-transform: capitalize;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FONT`]};
    background: ${({ disabled, theme, $color }) => !disabled && theme[`BUTTON_${$color}_HOVER`]};
    border-color: ${({ theme, $color }) => theme[`BUTTON_${$color}_FOCUS`]};
  }
`;

const DropdownBtn = ({ className, color, initial, onClick, options, type }) => {
  const $color = color.toUpperCase();
  const [showDropdown, toggleDropdown, , deactivateDropdown] = useToggle();
  const containerRef = useOnClickOutside(deactivateDropdown);
  const [list, setList] = useState(options);
  const theme = useTheme();

  useOnEscape(deactivateDropdown);

  useEffect(() => {
    setList(options.filter((o) => o !== initial));
  }, [options, initial]);

  const handleAction = (e) => {
    deactivateDropdown();
    onClick(initial.toLowerCase(), e);
  };

  const handleSelectAction = (action, e) => {
    deactivateDropdown();
    onClick(action.toLowerCase(), e);
  };

  return (
    <Container className={className} ref={containerRef}>
      <ButtonGroup>
        <Button color={color} onClick={handleAction} type={type}>
          {initial}
        </Button>
        <SelectArrow $color={$color} onClick={toggleDropdown} type={type}>
          <Sprite icon="CARET" size="0.563rem" color={theme[`BUTTON_${$color}_FONT`]} />
        </SelectArrow>
      </ButtonGroup>
      <DropdownList show={showDropdown}>
        {list.map((li) => (
          <ListItem $color={$color} key={li} onClick={(e) => handleSelectAction(li, e)}>
            {li}
          </ListItem>
        ))}
      </DropdownList>
    </Container>
  );
};

DropdownBtn.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  initial: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
};

DropdownBtn.defaultProps = {
  className: null,
  color: 'primary',
};

export default DropdownBtn;
