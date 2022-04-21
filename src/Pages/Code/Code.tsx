import React, { useEffect, useState } from 'react';
import { Wrapper, Header, Section, MultiTable } from 'Components';
import { useContracts } from 'redux/hooks';
// @ts-ignore
import { useParams } from 'react-router-dom';
import { CodeDetails, CodeContracts } from './Components';

const Code = () => {
  const { getContractCode, getContractsByCode, contractsByCodeTotal } = useContracts();
  const { codeId } = useParams();

  const [activeTableTab, setActiveTableTab] = useState(0);

  useEffect(() => {
    getContractCode({ id: codeId });
    getContractsByCode({ id: codeId, page: 1, count: 30 });
  }, [codeId, getContractCode, getContractsByCode]);

  return (
    <Wrapper>
      <Header
        title={'Code'}
        value={codeId}
      />
      <Section header>
        <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
          <CodeDetails key="Details"/>
          <CodeContracts key={`Contracts (${contractsByCodeTotal})`} />
        </MultiTable>
      </Section>
    </Wrapper>
  );
};

export default Code;
