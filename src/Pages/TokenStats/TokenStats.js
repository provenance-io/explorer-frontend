import React from 'react';
import { Wrapper } from '../../Components';
import { TokenStatsChart, AssetsDist } from './Components';

const TokenStats = () => (
  <Wrapper>
    <TokenStatsChart />
    <AssetsDist />
  </Wrapper>
);

export default TokenStats;
