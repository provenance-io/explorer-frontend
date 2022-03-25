import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { formatDenom } from 'utils';
import { useValidators, useAccounts } from 'redux/hooks';
import { Accordion, Table } from 'Components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const AccountUnbondings = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountRedelegations,
    accountRedelegationsTotal: { amount: rAmount },
    accountRedelegationsLoading,
    accountUnbonding,
    accountUnbondingLoading,
    accountUnbondingTotal: { amount: uAmount, denom: uDenom },
    getAccountRedelegations,
    getAccountUnbonding,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams();

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators();
    getAccountUnbonding(addressId);
    getAccountRedelegations(addressId);
  }, [addressId, getAllValidators, getAccountUnbonding, getAccountRedelegations]);

  useEffect(() => {
    setTableData(
      [...accountRedelegations, ...accountUnbonding]
        .map(d => {
          const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
          return { ...validator, ...d };
          // Sort from earliest to latest end date
        })
        .sort((a, b) => a.endTime.millis - b.endTime.millis)
    );

    setTableCurrentPage(1);
  }, [allValidators, accountRedelegations, accountUnbonding, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  const totalAmount = formatDenom(parseFloat(rAmount) + parseFloat(uAmount), uDenom, {
    decimal: 2,
  });

  return (
    <ButtonWrapper>
      <Accordion
        showChevron
        title={`Unbondings/Redelegations (${totalAmount})`}
        titleFont={`font-weight: bold; font-size: 1.4rem`}
      >
        <Table
          changePage={setTableCurrentPage}
          currentPage={tableCurrentPage}
          isLoading={accountRedelegationsLoading || accountUnbondingLoading || allValidatorsLoading}
          tableData={tableData}
          tableHeaders={tableHeaders}
          totalPages={1}
        />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountUnbondings;
