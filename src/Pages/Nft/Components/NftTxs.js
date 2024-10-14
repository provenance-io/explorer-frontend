import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTxs } from '../../../redux/hooks';
import { Table } from '../../../Components';

const NftTxs = () => {
  const { addr } = useParams();
  const {
    getTxsByNft,
    txByNft: tableData,
    txByNftLoading: tableLoading,
    txByNftPages: tablePages,
  } = useTxs();
  const [tableCurrentPage, setTableCurrentPage] = useState(1);

  useEffect(() => {
    if (addr) {
      getTxsByNft({ addr, page: tableCurrentPage });
    }
  }, [addr, getTxsByNft, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Msg Type', dataName: 'type' },
    { displayName: 'Signers', dataName: 'signers' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Time', dataName: 'time' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Transactions"
    />
  );
};

export default NftTxs;
