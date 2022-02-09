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

const AccountDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages: tablePages,
    accountDelegationsTotal: { amount, denom },
    getAccountDelegations,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams();

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators();
    getAccountDelegations({ address: addressId });
  }, [addressId, getAllValidators, getAccountDelegations]);

  useEffect(() => {
    setTableData(
      accountDelegations.map(d => {
        const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
        return { ...validator, ...d };
      })
    );

    setTableCurrentPage(1);
  }, [allValidators, accountDelegations, setTableData]);

  const tableHeaders = [
    //{ displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
  ];

  const totalAmount = formatDenom(amount, denom, { decimal: 2 });

  return (
    <ButtonWrapper>
      <Accordion
        showChevron
        title={`Delegations (${totalAmount})`}
        titleFont={`font-weight: bold; font-size: 1.4rem`}
      >
        <Table
          changePage={setTableCurrentPage}
          currentPage={tableCurrentPage}
          isLoading={accountDelegationsLoading || allValidatorsLoading}
          tableData={tableData}
          tableHeaders={tableHeaders}
          totalPages={tablePages}
        />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountDelegations;
