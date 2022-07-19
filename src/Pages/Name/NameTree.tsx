import React from 'react';
import { Section, Wrapper } from 'Components';
import { NameTreeChart, NameTreeFileFinder } from './Components';

export const NameTree = () => (
  <Wrapper noHeader>
      <NameTreeChart />
      {/* <NameTreeFileFinder /> */}
  </Wrapper>
);