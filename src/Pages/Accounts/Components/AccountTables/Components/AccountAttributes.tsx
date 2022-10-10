import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import { Table } from 'Components';

export const AccountAttributes = () => {
  const { accountInfo, accountInfoLoading: tableLoading, getAccountInfo } = useAccounts();

  const { addressId } = useParams<{ addressId: string }>();

  useEffect(() => {
    getAccountInfo(addressId);
  }, [getAccountInfo, addressId]);

  const { attributes: tableData } = accountInfo;

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Attribute', dataName: 'attribute' },
    { displayName: 'Data', dataName: 'data' },
  ];

  return (
    <Table
      isLoading={tableLoading}
      tableData={tableData}
      tableHeaders={tableHeaders}
      title={`Total Attributes: ${tableData ? tableData.length : '0'}`}
    />
  );
};
