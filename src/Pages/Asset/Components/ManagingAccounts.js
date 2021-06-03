import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const ManagingAccounts = () => {
  const {
    assetInfo: { managingAccounts: { managers = {} } = {} } = {},
    assetInfoLoading: tableLoading,
  } = useAssets();

  const tableHeaders = [
    { displayName: 'Address', dataName: 'manager' },
    { displayName: 'Permissions', dataName: 'permissions' },
  ];

  const tableData = Object.keys(managers || {}).reduce(
    (acc, curr) => [
      ...acc,
      {
        manager: curr,
        permissions: managers[curr],
      },
    ],
    []
  );

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      isLoading={tableLoading}
      title="Managing Accounts"
    />
  );
};

export default ManagingAccounts;
