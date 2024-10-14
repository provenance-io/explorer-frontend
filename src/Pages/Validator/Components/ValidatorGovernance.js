import React, { useState } from 'react';
import { MultiTable } from '../../../Components';
import ValidatorGovernanceTxTable from './ValidatorGovernanceTxTable';
import ValidatorVoteTable from './ValidatorVoteTable';

const ValidatorGovernanceTxs = () => {
  const [activeTableTab, setActiveTableTab] = useState(0);

  return (
    <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
      <ValidatorGovernanceTxTable key="Gov Txs" />
      <ValidatorVoteTable key="Voted Proposals" />
    </MultiTable>
  );
};

export default ValidatorGovernanceTxs;
