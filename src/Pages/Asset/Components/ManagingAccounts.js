import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Content, Loading, Summary, Table as OgTable } from '../../../Components';
import { useAssets } from '../../../redux/hooks';
import { capitalize } from '../../../utils';

const Table = styled(OgTable)`
  & > div {
    padding: 20px 0;
    border: none;
  }
`;

const ManagingAccounts = () => {
  const {
    assetInfo: { managingAccounts: { allowGovControl, managers = {} } = {} } = {},
    assetInfoLoading: tableLoading,
  } = useAssets();

  const summaryData = [
    {
      title: 'Allow Governance',
      value: capitalize(`${allowGovControl}`),
    },
  ];

  const tableHeaders = [
    { displayName: 'Address', dataName: 'manager' },
    { displayName: 'Permissions', dataName: 'permissions' },
  ];

  const tableData = Object.keys(managers || {}).reduce(
    (acc, curr) => [
      ...acc,
      {
        manager: curr,
        permissions: managers[curr],
      },
    ],
    []
  );

  return (
    <Content title="Managing Accounts">
      {tableLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Summary data={summaryData} />

          <Table tableHeaders={tableHeaders} tableData={tableData} isLoading={tableLoading} />
        </Fragment>
      )}
    </Content>
  );
};

export default ManagingAccounts;
