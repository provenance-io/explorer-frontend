import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountAttributes = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(true);
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

  const handleButtonClick = () => {
    setShowButton(!showButton); // Show/hide main button
    setShowContent(!showContent); // Show/hide content
  };

  return (
    <ButtonTables
      buttonTitle={`Attributes (${tableData ? tableData.length : 0})`}
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      hasLength={(tableData ? tableData.length : 0) > 0}
      tableProps={{
        isLoading: accountInfoLoading,
        tableData,
        tableHeaders,
        title: `Attributes (${tableData ? tableData.length : 0})`,
        addButton: 'Hide',
        onButtonClick: handleButtonClick,
      }}
    />
  );
};

export default AccountAttributes;
