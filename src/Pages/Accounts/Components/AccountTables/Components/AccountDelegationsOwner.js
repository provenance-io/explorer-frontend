import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidators, useApp, useAccounts, useStaking } from '../../../../../redux/hooks';
import { Table } from '../../../../../Components';
import { formatDenom } from '../../../../../utils';
import { ManageStakingModal } from '../../../../Validators/Components/ManageStakingModal';

export const AccountDelegationsOwner = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountDelegations,
    accountDelegationsTotal: { amount, denom },
    accountDelegationsLoading,
    accountDelegationsPages: tablePages,
    getAccountDelegations,
  } = useAccounts();
  const { addressId } = useParams();
  const { handleStaking, isDelegate, ManageStakingBtn, modalFns, validator } = useStaking();
  const { isLoggedIn } = useApp();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const tableCount = 5;

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn) getAllValidators({});
    getAccountDelegations({ address: addressId, page: tableCurrentPage, count: tableCount });
  }, [isLoggedIn, addressId, getAllValidators, getAccountDelegations, tableCurrentPage]);

  useEffect(() => {
    setTableData(
      accountDelegations.map((d) => {
        const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
        return { ...validator, ...d };
      })
    );
  }, [allValidators, accountDelegations, setTableData]);

  const totalDelegations = formatDenom(Number(amount), denom, { decimal: 2 });

  const tableHeaders = [
    { displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
  ];

  return (
    <>
      <Table
        changePage={setTableCurrentPage}
        currentPage={tableCurrentPage}
        isLoading={accountDelegationsLoading || allValidatorsLoading}
        ManageStakingBtn={ManageStakingBtn}
        tableData={tableData}
        tableHeaders={tableHeaders}
        totalPages={tablePages}
        title={`Total Delegations: ${totalDelegations}`}
      />
      <ManageStakingModal
        isDelegate={isDelegate}
        isLoggedIn={isLoggedIn}
        modalOpen={modalFns.modalOpen}
        onClose={modalFns.deactivateModalOpen}
        onStaking={handleStaking}
        validator={validator || {}}
      />
    </>
  );
};
