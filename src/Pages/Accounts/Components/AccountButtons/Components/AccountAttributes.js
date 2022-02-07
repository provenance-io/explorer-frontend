import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import { ButtonTables } from 'Components';

const AccountAttributes = () => {
  const { accountInfo, accountInfoLoading, getAccountInfo } = useAccounts();

  const { addressId } = useParams();

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
    <ButtonTables
      buttonTitle={`Attributes (${tableData ? tableData.length : 0})`}
      size="100%"
      iconPercent="76%"
      spinIcon={true}
      tableProps={{
        isLoading: accountInfoLoading,
        tableData,
        tableHeaders,
        contentBorder: false,
      }}
    />
  );
};

export default AccountAttributes;
