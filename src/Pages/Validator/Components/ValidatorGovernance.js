import React, { Fragment, useState } from 'react';
import { VALIDATOR_GOV_OPTIONS } from 'consts';
import { Filters } from 'Components';
import ValidatorGovernanceTxTable from './ValidatorGovernanceTxTable';
import ValidatorVoteTable from './ValidatorVoteTable';

const ValidatorGovernanceTxs = () => {
  const [filterStatus, setFilterStatus] = useState('txs');

  const filterData = [
    {
      title: '',
      type: 'dropdown',
      options: VALIDATOR_GOV_OPTIONS,
      action: setFilterStatus,
    },
  ];

  return (
    <Fragment>
      <Filters filterData={filterData} />
      {filterStatus === 'txs' && <ValidatorGovernanceTxTable />}
      {filterStatus === 'votes' && <ValidatorVoteTable />}
    </Fragment>
  );
};

export default ValidatorGovernanceTxs;
