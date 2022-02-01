import React, { useEffect } from 'react';
import { Wrapper, Header, Section } from 'Components';
import { useMediaQuery, useTxs } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { useParams } from 'react-router-dom';
import { TxInformation, TxMsgs, TxFees, TxJSON } from './Components';

const handleResize = chartArray => {
  chartArray.forEach(chart => {
    chart.resize();
  });
};

const Tx = () => {
  const { matches: isMed } = useMediaQuery(breakpoints.down('lg'));
  const { getTxInfo } = useTxs();
  const { txHash } = useParams();

  useEffect(() => {
    getTxInfo(txHash);
  }, [txHash, getTxInfo]);

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
      <Header
        title={isMed ? 'Tx Details' : 'Transaction Details'}
        value={isMed ? maxLength(txHash, 12, 6) : txHash}
        copyTitle={`Copy Transaction Hash ${txHash}`}
        copyValue={txHash}
      />
      <Section header>
        <TxInformation />
        <TxFees />
      </Section>
      <Section>
        <TxJSON />
      </Section>
      <Section>
        <TxMsgs />
      </Section>
    </Wrapper>
  );
};

export default Tx;
