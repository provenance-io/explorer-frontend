import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper, Notification } from 'Components';
import {
  BlockSpotlight,
  TopValidators,
  TxHistory,
  RecentBlocks,
  RecentTxs,
  PriceHistory,
  HashDashboard,
} from './Components';

const handleResize = chartArray => {
  chartArray.forEach(chart => {
    chart.resize();
  });
};

const Dashboard = () => {
  useEffect(() => {
    // Resize all charts in the dashboard component by building window.allCharts array.
    // Note that each component with echarts pushes to window.allCharts, defined here.
    window.allCharts = [];
    window.onresize = () => {
      handleResize(window.allCharts);
    };

    return () => {
      // Delete the allCharts array
      window.allCharts.length = 0;
      // Remove the event listener
      window.removeEventListener('resize', handleResize(window.allCharts));
    };
  });

  return (
    <Wrapper noHeader>
      <Helmet>
        <title>Provenance Blockchain Explorer - Dashboard</title>
      </Helmet>
      <Notification />
      <Section>
        <BlockSpotlight />
      </Section>
      <Section>
        <HashDashboard />
        <PriceHistory />
      </Section>
      <Section>
        <TopValidators />
        <TxHistory />
      </Section>
      <Section>
        <RecentBlocks />
        <RecentTxs />
      </Section>
    </Wrapper>
  );
};

export default Dashboard;
