import React from 'react';
import { Table, Content, Section, Accordion } from 'Components';
import { useNetwork } from 'redux/hooks';
import { isEmpty, capitalize, formatDenom } from 'utils';

// Function to generate a simple table
const getTable = (data, type, tableLoading) => {
  const title = capitalize(type);
  const tableHeaders = [
    { displayName: 'Param Name', dataName: 'param_name' },
    { displayName: 'Value', dataName: 'value' },
  ];
  const tableData = Object.keys(data[type]).map(item => {
    const tempObj = {};
    if (item === 'max_total_supply') {
      tempObj.value = formatDenom(data[type][item], '', { decimal: 0 });
    } else if (item === 'unrestricted_denom_regex') {
      tempObj.value = JSON.stringify(data[type][item]);
    } else if (item === 'floor_gas_price') {
      const amount = data[type][item].amount;
      const denom = data[type][item].denom;
      tempObj.value = formatDenom(amount, denom, { decimal: 10 });
    } else {
      tempObj.value = data[type][item].toString();
    }
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
