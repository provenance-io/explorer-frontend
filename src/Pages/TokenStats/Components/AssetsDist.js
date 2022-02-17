import React, { useEffect } from 'react';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetsDist = () => {
  const {
    assetsDist: tableData,
    assetsDistLoading: tableLoading,
    getAssetsDist: getTableData,
  } = useAssets();

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const tableHeaders = [
    { displayName: 'Range', dataName: 'range' },
    { displayName: 'Amount', dataName: 'amountHash' },
    { displayName: 'Percent', dataName: 'percentTotal' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      isLoading={tableLoading}
      title="Asset Distribution"
    />
  );
};

export default AssetsDist;
