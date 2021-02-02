import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content, Loading, Pagination as BasePagination } from 'Components';
import { Link, useParams } from 'react-router-dom';
import { useApp, useBlocks, useTxs } from 'redux/hooks';

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

const BlockTxs = () => {
  const [txsPage, setTxsPage] = useState(1);
  const { getTxsByBlock, txsByBlock, txsByBlockPages, txsByBlockLoading } = useTxs();
  const { blockHeight: globalBlockHeight } = useBlocks();
  const { blockHeight: pageBlockHeight } = useParams();
  const { tableCount } = useApp();

  // Get total amount of block txs, if we are on page 1 and have multiple results, just count the results
  const blockTxsPageByCount = txsByBlockPages * tableCount;
  const blockTxsTotal = blockTxsPageByCount > txsByBlock.length ? txsByBlock.length : blockTxsPageByCount;

  useEffect(() => {
    getTxsByBlock(pageBlockHeight);
  }, [getTxsByBlock, pageBlockHeight, tableCount, txsPage]);

  const blockHeightValid = pageBlockHeight <= globalBlockHeight;

  const buildTxRow = (tx, index) => {
    const { hash = '[N/A]', type = '[N/A]', fee = '[N/A]', signer = '[N/A]' } = tx;

    return (
      <GRow key={index}>
        <GTableData>{index * txsPage + 1}</GTableData>
        <GTableData>
          <Link to={`/tx/${hash}`}>{hash}</Link>
        </GTableData>
        <GTableData>{type}</GTableData>
        <GTableData>{fee}</GTableData>
        <GTableData>{signer}</GTableData>
      </GRow>
    );
  };

  const buildAllTxRows = () => txsByBlock.map((tx, index) => buildTxRow(tx, index));

  return (
    <Content size="100%" title="Block Transactions">
      {txsByBlockLoading && <Loading />}
      {!txsByBlockLoading && !blockHeightValid && <div>{`Block ${pageBlockHeight} does not exist`}</div>}
      {!txsByBlockLoading && blockHeightValid && blockTxsTotal === 0 && (
        <div>{`No transactions found for block ${pageBlockHeight}`}</div>
      )}
      {!txsByBlockLoading && blockHeightValid && blockTxsTotal > 0 && (
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
            numberOfItems={blockTxsTotal}
            pageNumber={txsPage}
            secondary
            totalPages={txsByBlockPages}
            onChange={(page) => setTxsPage(page)}
          />
        </>
      )}
    </Content>
  );
};

export default BlockTxs;
