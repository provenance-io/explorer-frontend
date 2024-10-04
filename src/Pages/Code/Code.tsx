import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper, Header, Section, MultiTable } from '../../Components';
import { useContracts } from '../../redux/hooks';
import { CodeDetails, CodeContracts, CodeTxs } from './Components';

interface ParamsProps {
  codeId: string;
}

const Code = () => {
  const { 
    getContractCode, 
    getContractsByCode, 
    contractsByCodeTotal, 
    codeTxsTotal,
    getCodeTxs,
  } = useContracts();
  const { codeId } = useParams<ParamsProps>();

  const [activeTableTab, setActiveTableTab] = useState(0);

  useEffect(() => {
    getContractCode({ id: codeId });
    getContractsByCode({ id: codeId, page: 1, count: 30 });
    getCodeTxs({
      id: codeId,
      page: 1,
      count: 30,
      status: '',
      fromDate: '',
      toDate: '',
    });
  }, [codeId, getContractCode, getContractsByCode, getCodeTxs]);

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
          <CodeTxs key={`Transactions (${codeTxsTotal})`} />
        </MultiTable>
      </Section>
    </Wrapper>
  );
};

export default Code;
