import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAccounts } from 'redux/hooks';
import { Accordion, Table } from 'Components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const AccountAttributes = () => {
  const { accountInfo, accountInfoLoading: tableLoading, getAccountInfo } = useAccounts();

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

  return (
    <ButtonWrapper>
      <Accordion
        showChevron
        title={`Attributes (${tableData ? tableData.length : 0})`}
        titleFont={`font-weight: bold; font-size: 1.4rem`}
      >
        <Table isLoading={tableLoading} tableData={tableData} tableHeaders={tableHeaders} />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountAttributes;
