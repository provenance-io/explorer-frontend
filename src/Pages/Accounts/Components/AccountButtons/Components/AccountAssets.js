import React, { useState } from 'react';
import { useAccounts, useAssets } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountAssets = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);
  // Spotlight pulls all account data including balances, no need to refetch in this Component
  const { accountInfoLoading: tableLoading, accountAssets } = useAccounts();
  const { assetMetadata } = useAssets();

  const tableData = accountAssets.map(a => ({
    ...a,
    displayDenom: assetMetadata.find(md => md.base === a.denom)?.display,
  }));

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'denom' },
    { displayName: 'Price', dataName: 'pricePerToken' },
    { displayName: 'Total Balance', dataName: 'balances' },
    { displayName: 'Total Value', dataName: 'totalBalancePrice' },
  ];

  const handleButtonClick = () => {
    setShowButton(!showButton); // Show/hide main button
    setShowContent(!showContent); // Show/hide content
  };

  return (
    <ButtonTables
      buttonTitle="Assets"
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      hasLength={[...accountAssets]?.length > 0}
      isLoading={tableLoading || false}
      tableData={tableData}
      tableHeaders={tableHeaders}
      tableTitle="Account Assets"
      addButtonTitle="Hide"
    />
  );
};

export default AccountAssets;
