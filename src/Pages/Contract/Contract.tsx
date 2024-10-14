import React, { useEffect, useState } from 'react';
import { Wrapper, Header, Section, MultiTable } from '../../Components';
import { breakpoints } from '../../consts';
import { maxLength } from '../../utils';
import { useParams } from 'react-router-dom';
import { useMediaQuery, useContracts } from '../../redux/hooks';
import { ContractDetails, ContractHistory, ContractTxs } from './Components';

interface ParamsProps {
  contractId: string;
}

const Contract = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));
  const { contractId } = useParams<ParamsProps>();
  const { 
    contractTxsTotal, 
    getContractDetails, 
    getContractHistory, 
    getContractTxs 
  } = useContracts();

  const [activeTableTab, setActiveTableTab] = useState(0);

  useEffect(() => {
    getContractDetails({ id: contractId });
    getContractHistory({ id: contractId });
    getContractTxs({ 
      id: contractId,
      page: 1,
      count: 30,
      status: '',
      fromDate: '',
      toDate: '',
    })
  }, [getContractDetails, getContractHistory, getContractTxs, contractId]);

  return (
    <Wrapper>
      <Header
        title={'Contract'}
        value={isMed ? maxLength(contractId, 12, '6') : contractId}
        copyTitle={`Copy Contract ID ${contractId}`}
        copyValue={contractId}
      />
      <Section header>
        <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
          <ContractDetails key="Details"/>
          <ContractHistory key="History" />
          <ContractTxs key={`Transactions (${contractTxsTotal})`} />
        </MultiTable>
      </Section>
    </Wrapper>
  );
};

export default Contract;
