import { useState } from 'react';
import { Section, Wrapper, Header, MultiTable } from 'Components';
import { NameTreeChart, NameTreeFileFinder } from './Components';

export const NameTree = () => {
  const [activeTableTab, setActiveTableTab] = useState(0);

  return (
    <Wrapper>
      <Header title="Name Tree" />
      <Section header>
        <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
          <NameTreeChart key="Chart" />
          <NameTreeFileFinder key="File View" />
        </MultiTable>
      </Section>
    </Wrapper>
  );
};
