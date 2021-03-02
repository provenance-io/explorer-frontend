import { Table } from 'Components';
import { useAccounts } from 'redux/hooks';

const AccountAssets = () => {
  // Spotlight pulls all account data including balances, no need to refetch in this Component
  const { accountInfoLoading: tableLoading, accountAssets: tableData } = useAccounts();

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'queryDenom' },
    { displayName: 'Total Balance', dataName: 'balances' },
  ];

  return <Table tableHeaders={tableHeaders} tableData={tableData} isLoading={tableLoading} title="Account Assets" />;
};

export default AccountAssets;
