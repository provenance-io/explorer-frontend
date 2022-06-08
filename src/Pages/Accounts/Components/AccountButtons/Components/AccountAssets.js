import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAssets, useAccounts } from 'redux/hooks';
import { Accordion, Table } from 'Components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const AccountAssets = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { addressId } = useParams();
  const {
    accountAssets,
    accountAssetsTotal,
    accountAssetsPages: tablePages,
    getAccountAssets: getTableData,
    accountAssetsLoading: tableLoading,
  } = useAccounts();

  const { assetMetadata, getAssetMetadata } = useAssets();

  useEffect(() => {
    getTableData({
      address: addressId,
      page: tableCurrentPage,
      count: 10,
    });
    getAssetMetadata();
  }, [getTableData, tableCurrentPage, addressId, getAssetMetadata]);

  // Build table data
  const tableData = accountAssets.map((a) => ({
    ...a,
    displayDenom: assetMetadata.find((md) => md.base === a.denom)?.display,
    exponent: assetMetadata.find((md) => md.base === a.denom)?.denomUnits[1].exponent,
  }));

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'denom' },
    { displayName: 'Total Balance', dataName: 'balances' },
    { displayName: 'Price Per Unit', dataName: 'pricePerToken' },
    { displayName: 'Total Value', dataName: 'totalBalancePrice.amount' },
  ];

  return (
    <ButtonWrapper>
      <Accordion
        showChevron
        title={`Assets (${accountAssetsTotal})`}
        titleFont={`font-weight: bold; font-size: 1.4rem`}
        startOpen={true}
        dontDrop={true}
      >
        <Table
          changePage={setTableCurrentPage}
          currentPage={tableCurrentPage}
          isLoading={tableLoading}
          tableData={tableData}
          tableHeaders={tableHeaders}
          totalPages={tablePages}
        />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountAssets;
