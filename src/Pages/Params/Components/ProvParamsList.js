import React from 'react';
import { Table, Content, Section, Accordion } from 'Components';
import { useNetwork } from 'redux/hooks';
import { isEmpty, capitalize } from 'utils';

// Function to generate a simple table
const getTable = (data, type, tableLoading) => {
  const title = capitalize(type);
  const tableHeaders = [
    { displayName: 'Param Name', dataName: 'param_name' },
    { displayName: 'Value', dataName: 'value' },
  ];
  const tableData = Object.keys(data[type]).map(item => {
    const tempObj = {};
    tempObj.value = data[type][item].toString();
    tempObj.param_name = item;
    return tempObj;
  });
  return (
    <Section key={title}>
      <Accordion title={title} showChevron={true}>
        <Table tableData={tableData} tableHeaders={tableHeaders} tableLoading={tableLoading} />
      </Accordion>
    </Section>
  );
};

const ProvParamsList = () => {
  const { provParams: provTableData, networkParamsLoading: tableLoading } = useNetwork();

  // Params fetch is done by CosmosParamsList

  const getProvTables = data => {
    const table = Object.keys(data).map(item => getTable(data, item, [], tableLoading));
    return table;
  };

  return (
    <Content title="Provenance Parameters">
      {!isEmpty(provTableData) && getProvTables(provTableData)}
    </Content>
  );
};

export default ProvParamsList;
