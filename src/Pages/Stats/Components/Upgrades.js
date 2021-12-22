import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'Components';
import { useStats } from 'redux/hooks';

const UpgradesListContainer = styled.div`
  width: 100%;
`;

const Upgrades = () => {
  const {
    upgradeInfo: tableData,
    getUpgradeInfo: getTableData,
    upgradeInfoLoading: tableLoading,
  } = useStats();

  // Initial Fetch of upgrades
  useEffect(() => {
    getTableData();
  }, [getTableData]);

  // Iterate through tableData to combine skipped/scheduled data into one column
  tableData.forEach(element => {
    element.notes = { text: null, hoverText: null };
    if (element.scheduled) {
      element['notes'] = {
        text: 'scheduled',
        hoverText: `Not yet applied - will be applied at upgrade height ${element.upgradeHeight}`,
      };
    }
    if (element.upgradeName === 'eigengrau') {
      element['notes'] = {
        text: 'skipped',
        hoverText:
          'Skipped due to a migration error. Start `provenanced` with the `--unsafe-skip-upgrades=3417970` to bypass',
      };
    }
  });

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Upgrade Height', dataName: 'upgradeHeight' },
    { displayName: 'Upgrade Name', dataName: 'upgradeName' },
    { displayName: 'Recommended Version', dataName: 'currentVersion' },
    { displayName: 'Events', dataName: 'notes' },
  ];

  return (
    <UpgradesListContainer>
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        isLoading={tableLoading}
        title="Version History"
      />
    </UpgradesListContainer>
  );
};

export default Upgrades;
