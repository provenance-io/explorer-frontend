import React, { useEffect } from 'react';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetsDist = () => {
  const {
    assetsDist,
    assetsDistLoading: tableLoading,
    getAssetsDist: getTableData,
  } = useAssets();

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const tableData = JSON.parse(JSON.stringify(assetsDist));

  const tableHeaders = [
    { displayName: 'Range', dataName: 'range' },
    { displayName: 'Amount', dataName: 'amountHash' },
    { displayName: 'Percent', dataName: 'percentTotal' },
  ];

  interface RangeProps {
    range: string;
  }

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData.sort((a: RangeProps, b: RangeProps) =>
        Number(a.range.match(/(?:\d+\.)?\d+/g)![0] || 0) - Number(b.range.match(/(?:\d+\.)?\d+/g)![0])
      )}
      isLoading={tableLoading}
      title="Asset Distribution"
    />
  );
};

export default AssetsDist;
