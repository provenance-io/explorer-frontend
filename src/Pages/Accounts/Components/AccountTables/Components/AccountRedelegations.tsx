import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidators, useAccounts, useFrontendPagination } from 'redux/hooks';
import { Table } from 'Components';
import { formatDenom } from 'utils';

export const AccountRedelegations = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    accountRedelegations,
    accountRedelegationsLoading,
    getAccountRedelegations,
    accountRedelegationsTotal: { amount, denom },
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();

  // Add frontend-enabled Pagination
  const {
    tableData: paginatedTableData,
    currentPage,
    changePage,
    totalPages,
  } = useFrontendPagination({ data: tableData, count: 5 });

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators({});
    getAccountRedelegations(addressId);
  }, [addressId, getAllValidators, getAccountRedelegations]);

  useEffect(() => {
    setTableData(
      accountRedelegations
        .map((d) => {
          const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
          return { ...validator, ...d };
          // Sort from earliest to latest end date
        })
        .sort((a, b) => Number(a.endTime.millis) - Number(b.endTime.millis))
    );
  }, [allValidators, accountRedelegations, setTableData]);

  const totalRedelegations = formatDenom(parseFloat(amount || '0'), denom, {
    decimal: 2,
  });

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  return (
    <Table
      isLoading={accountRedelegationsLoading || allValidatorsLoading}
      tableData={paginatedTableData}
      tableHeaders={tableHeaders}
      changePage={changePage}
      currentPage={currentPage}
      totalPages={totalPages}
      title={`Total Redelegations (${totalRedelegations})`}
    />
  );
};
