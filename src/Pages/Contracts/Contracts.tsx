import React, { useState } from 'react';
import { Wrapper, Section, Header, MultiTable } from 'Components';
import { useContracts } from 'redux/hooks';
import { ContractsList, CodesList } from './Components';

const Contracts = () => {
  const { contractsTotal, codesTotal } = useContracts();
  const [activeTableTab, setActiveTableTab] = useState(0);

  return (
    <Wrapper>
      {activeTableTab === 0 ? (
        <Header title="Contract List" value={`${contractsTotal} total`} />
      ) : (
        <Header title="Codes List" value={`${codesTotal} total`} />
      )}
      <Section header>
        <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
          <ContractsList key="Contracts"/>
          <CodesList key="Codes" />
        </MultiTable>
      </Section>
    </Wrapper>
  );
};

export default Contracts;
