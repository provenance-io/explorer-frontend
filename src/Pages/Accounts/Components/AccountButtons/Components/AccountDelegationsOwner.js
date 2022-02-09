import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatDenom } from 'utils';
import { useValidators, useApp, useAccounts, useStaking } from 'redux/hooks';
import { Accordion, Table } from 'Components';
import ManageStakingModal from '../../../../Validators/Components/ManageStakingModal';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const AccountDelegationsOwner = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages: tablePages,
    accountDelegationsTotal: { amount, denom },
  } = useAccounts();
  const { handleStaking, isDelegate, ManageStakingBtn, modalFns, validator } = useStaking();
  const { isLoggedIn } = useApp();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn) getAllValidators();
  }, [isLoggedIn, getAllValidators]);

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
    { displayName: 'Staking', dataName: 'manageStaking' },
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
          ManageStakingBtn={ManageStakingBtn}
          tableData={tableData}
          tableHeaders={tableHeaders}
          totalPages={tablePages}
        />
        <ManageStakingModal
          isDelegate={isDelegate}
          isLoggedIn={isLoggedIn}
          modalOpen={modalFns.modalOpen}
          onClose={modalFns.deactivateModalOpen}
          onStaking={handleStaking}
          validator={validator || {}}
        />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountDelegationsOwner;
