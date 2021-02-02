import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Content as BaseContent, Loading, Pagination as BasePagination } from 'Components';
import { Link, useParams } from 'react-router-dom';
import { useApp, useTxs } from 'redux/hooks';

const Content = styled(BaseContent)`
  margin-top: 20px;
`;
const TableContainer = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
`;
const GridTable = styled.table`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 0;
`;
const GTableHead = styled.thead`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  text-align: left;
`;
const GHeadRow = styled.tr``;
const GRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
  }
`;
const GTableBody = styled.tbody``;
const GTableHeadData = styled.th`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  padding: 10px 20px;
`;
const GTableData = styled.td`
  padding: 10px 20px;
  text-align: left;
  border: none;
`;
const Pagination = styled(BasePagination)`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;

const AddressTxs = () => {
  const {
    getTxsByAddress,
    txsByAddress,
    txsByAddressPages,
    txsByAddressLoading,
    txsByAddressCurrentPage,
    setTxsByAddressCurrentPage,
  } = useTxs();
  const { addressId: walletAddress } = useParams();
  const { tableCount } = useApp();

  // Get total amount of block txs, if we are on page 1 and have multiple results, just count the results
  const addressTxsPageByCount = txsByAddressPages * tableCount;
  const addressTxsTotal = addressTxsPageByCount > txsByAddress.length ? txsByAddress.length : addressTxsPageByCount;

  useEffect(() => {
    getTxsByAddress(walletAddress);
  }, [getTxsByAddress, walletAddress, tableCount, txsByAddressPages, txsByAddressCurrentPage]);

  const buildTxRow = (tx, index) => {
    const { hash = '[N/A]', type = '[N/A]', fee = '[N/A]', signer = '[N/A]' } = tx;

    return (
      <GRow key={index}>
        <GTableData>{index * txsByAddressCurrentPage + 1}</GTableData>
        <GTableData>
          <Link to={`/tx/${hash}`}>{hash}</Link>
        </GTableData>
        <GTableData>{type}</GTableData>
        <GTableData>{fee}</GTableData>
        <GTableData>{signer}</GTableData>
      </GRow>
    );
  };

  const buildAllTxRows = () => txsByAddress.map((tx, index) => buildTxRow(tx, index));

  return (
    <Content size="100%" title="Address Transactions">
      {txsByAddressLoading && <Loading />}
      {!txsByAddressLoading && addressTxsTotal === 0 && <div>{`No transactions found for address ${walletAddress}`}</div>}
      {!txsByAddressLoading && addressTxsTotal > 0 && (
        <>
          <TableContainer>
            <GridTable>
              <GTableHead>
                <GHeadRow>
                  <GTableHeadData>#</GTableHeadData>
                  <GTableHeadData>Tx Hash</GTableHeadData>
                  <GTableHeadData>TxType</GTableHeadData>
                  <GTableHeadData>Fee</GTableHeadData>
                  <GTableHeadData>Signer</GTableHeadData>
                </GHeadRow>
              </GTableHead>
              <GTableBody>{buildAllTxRows()}</GTableBody>
            </GridTable>
          </TableContainer>
          <Pagination
            numberOfItems={addressTxsTotal}
            pageNumber={txsByAddressCurrentPage}
            secondary
            totalPages={txsByAddressPages}
            onChange={(page) => setTxsByAddressCurrentPage(page)}
          />
        </>
      )}
    </Content>
  );
};

export default AddressTxs;
