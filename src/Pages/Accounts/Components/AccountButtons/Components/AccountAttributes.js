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
      buttonTitle={`Attributes`}
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      hasLength={true}
      tableProps={{
        isLoading: accountInfoLoading,
        tableData,
        tableHeaders,
        title: `Attributes`,
        addButton: 'Hide',
        onButtonClick: handleButtonClick,
      }}
    />
  );
};

export default AccountAttributes;
