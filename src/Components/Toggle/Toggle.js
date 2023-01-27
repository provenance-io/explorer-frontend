import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Sprite } from '../';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.INPUT_BG_DARK};
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_DARK};
  position: relative;
  height: 26px;
  width: 52px;
  /*
  * the flex container sometimes messes with the width.
  * explicitly setting the min and max here fixes that.
  */
  min-width: 52px;
  max-width: 52px;
  overflow: hidden;
  margin-left: 10px;
  box-sizing: content-box;
`;
const OptionAContainer = styled.div`
  flex-basis: 50%;
  height: 100%;
`;
const OptionBContainer = styled.div`
  flex-basis: 50%;
  height: 100%;
`;
const OptionSpecialContainer = styled.div`
  flex-basis: 100%;
  height: 100%;
  margin-left: 24px;
  padding: 2px;
`;
const ToggleNotch = styled.div`
  border-radius: 100%;
  height: 26px;
  width: 26px;
  background: ${({ theme }) => theme.TOGGLE_NOTCH};
  border: 3px solid ${({ theme }) => theme.TOGGLE_BACKGROUND};
  position: absolute;
  top: 0px;
  transform: ${({ active }) => `translate(${active ? 'calc(100% - 1px)' : 0})`};
  transition: transform 0.5s ease-in-out;
  z-index: 100;
`;

const Toggle = ({ optionA, optionB, active, special }) => {
  // Will run as optionA = OFF, optionB = ON
  const [isOn, setIsOn] = useState(active);
  const [specialActive, setSpecialActive] = useState(special.active);
  const [specialCount, setSpecialCount] = useState(0);

  useEffect(() => {
    setIsOn(active);
  }, [active]);

  const { title: titleA, icon: iconA, iconColor: iconColorA, action: actionA } = optionA;
  const { title: titleB, icon: iconB, iconColor: iconColorB, action: actionB } = optionB;
  const {
    title: titleSpecial,
    icon: iconSpecial,
    iconColor: iconColorSpecial,
    action: actionSpecial,
    count,
  } = special;

  const toggle = () => {
    // Secret toggle, if clicked enough times
    if (special && !specialActive && count && specialCount + 1 === count) {
      setIsOn(false);
      setSpecialActive(true);
      actionSpecial();
    } else {
      specialCount > count ? setSpecialCount(0) : setSpecialCount(specialCount + 1);
      setSpecialActive(false);
      toggleOn();
    }
  };

  const toggleOn = () => {
    // If already on, switch off, vice versa
    const newIsOn = isOn ? false : true;
    setIsOn(newIsOn);
    // Perform action associated with switching the toggle
    // Will run as optionA = OFF, optionB = ON
    newIsOn ? actionB() : actionA();
  };

  return (
    <ToggleContainer data-testid="theme-switcher" onClick={toggle}>
      <ToggleNotch active={isOn} />
      {specialActive ? (
        <OptionSpecialContainer title={titleSpecial}>
          {iconSpecial && <Sprite icon={iconSpecial} color={iconColorSpecial} />}
        </OptionSpecialContainer>
      ) : (
        <>
          <OptionAContainer title={titleA}>
            {iconA && <Sprite icon={iconA} color={iconColorA} />}
          </OptionAContainer>
          <OptionBContainer title={titleB}>
            {iconB && <Sprite icon={iconB} color={iconColorB} />}
          </OptionBContainer>
        </>
      )}
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  active: PropTypes.bool,
  optionA: PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
  }).isRequired,
  optionB: PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
  }).isRequired,
  special: PropTypes.shape({
    title: PropTypes.string,
    action: PropTypes.func,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    count: PropTypes.number,
    active: PropTypes.bool,
  }),
};

Toggle.defaultProps = {
  active: false,
  special: null,
};

export default Toggle;
