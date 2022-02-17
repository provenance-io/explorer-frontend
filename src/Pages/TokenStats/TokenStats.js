import React, { useEffect } from 'react';
import { Wrapper } from 'Components';
import { TokenStatsChart, AssetsDist } from './Components';

const handleResize = chartArray => {
  chartArray.forEach(chart => {
    chart.resize();
  });
};

const TokenStats = () => {
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
    <Wrapper>
      <TokenStatsChart />
      <AssetsDist />
    </Wrapper>
  );
};

export default TokenStats;
