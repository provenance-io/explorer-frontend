import React, { useEffect } from 'react';
import { Table, Content, Section, Accordion } from 'Components';
import { useNetwork } from 'redux/hooks';
import { isEmpty, capitalize, formatDenom } from 'utils';

// Function to generate a simple table
const getTable = (data, type, tableData = [], tableLoading) => {
  const title = capitalize(type);
  const tableHeaders = [
    { displayName: 'Param Name', dataName: 'param_name' },
    { displayName: 'Value', dataName: 'value' },
  ];
  if (tableData.length === 0) {
    tableData = Object.keys(data[type]).map(item => {
      const tempObj = {};
      tempObj.value = data[type][item].toString();
      tempObj.param_name = item;
      return tempObj;
    });
  }
  return (
    <Section key={title}>
      <Accordion title={title} showChevron={true}>
        <Table tableData={tableData} tableHeaders={tableHeaders} tableLoading={tableLoading} />
      </Accordion>
    </Section>
  );
};

const CosmosParamsList = () => {
  const {
    cosmosParams: cosmosTableData,
    getNetworkParams,
    networkParamsLoading: tableLoading,
  } = useNetwork();

  // Initial Fetch of params
  useEffect(() => {
    getNetworkParams();
  }, [getNetworkParams]);

  // Function to get special case data for cosmos
  // assuming we are already at gov/ibc level
  const getTableData = data => {
    const tableData = [];
    data.forEach(item => {
      Object.keys(item).forEach(subItem => {
        const tempObj = {};
        if (subItem !== 'minDeposit' && subItem !== 'allowedClients') {
          tempObj.value = item[subItem].toString();
        } else {
          if (subItem === 'minDeposit') {
            const amount = item[subItem][0].amount;
            const denom = item[subItem][0].denom;
            tempObj.value = formatDenom(amount, denom, { decimal: 2 });
          } else if (subItem === 'allowedClients') {
            tempObj.value = item[subItem].toString();
          }
        }
        tempObj.param_name = subItem;
        tableData.push(tempObj);
      });
    });
    return tableData;
  };

  // Generate tables from cosmosTableData
  const getCosmosTables = data => {
    const table = Object.keys(data).map(item => {
      // special cases
      if (item !== 'gov' && item !== 'ibc') {
        return getTable(data, item, [], tableLoading);
      } else {
        const subData = Object.keys(data[item]).map(subItem => data[item][subItem]);
        return getTable(data, item, getTableData(subData), tableLoading);
      }
    });
    return table;
  };

  return (
    <Content title="Cosmos Parameters">
      {!isEmpty(cosmosTableData) && getCosmosTables(cosmosTableData)}
    </Content>
  );
};

export default CosmosParamsList;
