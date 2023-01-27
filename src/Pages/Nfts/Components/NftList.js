import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNft } from '../../../redux/hooks';
import { Table } from '../../../Components';

const NftList = () => {
  const { addr } = useParams();
  const {
    getNftsByOwner,
    nftByOwner: tableData,
    nftByOwnerLoading: tableLoading,
    nftByOwnerPages: tablePages,
  } = useNft();
  const [tableCurrentPage, setTableCurrentPage] = useState(1);

  useEffect(() => {
    if (addr) {
      getNftsByOwner({ addr, page: tableCurrentPage });
    }
  }, [addr, getNftsByOwner, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Scope Address', dataName: 'scopeAddr' },
    { displayName: 'Spec Name', dataName: 'specName' },
    { displayName: 'Spec Address', dataName: 'specAddr' },
    { displayName: 'Last Updated', dataName: 'lastUpdated' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="NFT List"
    />
  );
};

export default NftList;
