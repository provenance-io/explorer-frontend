import React, { useState } from 'react';
import styled from 'styled-components';
import { Sprite, Wrapper } from 'Components';
import { breakpoints, ICON_NAMES } from 'consts';
import { Colors as Color } from 'theme/Colors/Colors';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;

  @media ${breakpoints.up('sm')} {
    gap: 5%;
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  width: 100%;

  @media ${breakpoints.up('sm')} {
    flex-basis: 20%;
    width: 20%;
  }
`;

const FlexContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  min-height: 15rem;
  border-radius: 4px;
  text-align: center;
  background-color: lightgray;
`;

const Label = styled.span`
  width: 150px;
`;

const Icons = () => {
  const [color, setColor] = useState('BLUE_PRIMARY');
  const [secondaryColor, setSecondaryColor] = useState('WHITE');
  const [size, setSize] = useState(100);
  const [spin, setSpin] = useState(0);

  return (
    <Wrapper>
      <Form>
        <FormItem>
          <label htmlFor="iconColor">Icon Color</label>
          <select id="iconColor" onChange={(e) => setColor(e.target.value)} defaultValue={color}>
            {Object.keys(Color).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormItem>

        <FormItem>
          <label htmlFor="secondaryColor">Secondary Color</label>
          <select
            id="secondaryColor"
            onChange={(e) => setSecondaryColor(e.target.value)}
            defaultValue={secondaryColor}
          >
            {Object.keys(Color).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormItem>

        <FormItem>
          <label htmlFor="size">Icon Size</label>
          <input id="size" type="number" onChange={(e) => setSize(e.target.value)} value={size} />
        </FormItem>

        <FormItem>
          <label htmlFor="spin">Icon Rotation</label>
          <input id="spin" type="number" onChange={(e) => setSpin(e.target.value)} value={spin} />
        </FormItem>
      </Form>

      <FlexContainer>
        {Object.values(ICON_NAMES).map((icon) => (
          <IconWrapper key={icon}>
            <Label>{icon}</Label>
            <Sprite
              icon={icon}
              color={color}
              secondaryColor={secondaryColor}
              size={`${size}px`}
              spin={spin}
            />
          </IconWrapper>
        ))}
      </FlexContainer>
    </Wrapper>
  );
};
export default Icons;
