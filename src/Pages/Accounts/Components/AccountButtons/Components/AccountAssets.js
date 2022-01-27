import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccounts, useAssets } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountAssets = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { addressId } = useParams();
  const {
    accountAssets,
    accountAssetsTotal,
    accountAssetsPages: tablePages,
    getAccountAssets: getTableData,
    accountAssetsLoading: tableLoading,
  } = useAccounts();

  const { assetMetadata } = useAssets();

  // Build table data
  const tableData = accountAssets.map(a => ({
    ...a,
    displayDenom: assetMetadata.find(md => md.base === a.denom)?.display,
  }));

  useEffect(() => {
    getTableData({
      address: addressId,
      page: tableCurrentPage,
      count: 10,
    });
  }, [getTableData, tableCurrentPage, addressId]);

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
      buttonTitle={`Assets (${accountAssetsTotal})`}
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      hasLength={[...accountAssets]?.length > 0}
      size="100%"
      iconPercent="76%"
      tableProps={{
        changePage: setTableCurrentPage,
        currentPage: tableCurrentPage,
        isLoading: tableLoading,
        tableData,
        tableHeaders,
        title: `Assets (${accountAssetsTotal})`,
        totalPages: tablePages,
        addButton: 'Hide',
        onButtonClick: handleButtonClick,
      }}
    />
  );
};

export default AccountAssets;
