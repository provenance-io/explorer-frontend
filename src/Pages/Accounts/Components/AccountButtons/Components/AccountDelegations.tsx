import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidators, useAccounts } from 'redux/hooks';
import { Table } from 'Components';

export const AccountDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages: tablePages,
    getAccountDelegations,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();
  const tableCount = 5;

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators({});
    getAccountDelegations({ address: addressId, page: tableCurrentPage, count: tableCount });
  }, [addressId, getAllValidators, getAccountDelegations, tableCurrentPage]);

  useEffect(() => {
    setTableData(
      accountDelegations.map((d) => {
        const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
        return { ...validator, ...d };
      })
    );
  }, [allValidators, accountDelegations, setTableData]);

  const tableHeaders = [
    //{ displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
  ];

  return (
    <Table
      changePage={setTableCurrentPage}
      currentPage={tableCurrentPage}
      isLoading={accountDelegationsLoading || allValidatorsLoading}
      tableData={tableData}
      tableHeaders={tableHeaders}
      totalPages={tablePages}
    />
  );
};
