import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useBlocks, useInterval } from '../../../redux/hooks';
import { Content } from '../../../Components';
import { formatDenom } from '../../../utils';
import { polling, breakpoints } from '../../../consts';

const Item = styled.div`
  justify-content: flex-end;
  margin-left: auto;
  font-weight: 500;
  font-size: 2.5rem;
  @media ${breakpoints.between('xs', 'sm', 'md')} {
    font-size: 1.8rem;
  }
`;

const AssetsAUM = () => {
  const { blockLatest, getBlockSpotlight, blockSpotlightFailed, blockSpotlightLoading } =
    useBlocks();
  const { totalAum = {} } = blockLatest;

  // Initial load, get most recent blocks
  useEffect(() => {
    getBlockSpotlight();
  }, [getBlockSpotlight]);

  // Poll the API for new AUM data every 1000s
  useInterval(
    () => !blockSpotlightLoading && getBlockSpotlight(),
    polling.totalAum,
    blockSpotlightFailed
  );

  // Format total AUM for Provenance
  const provenanceAUM = `$${formatDenom(totalAum.amount, totalAum.denom, {
    decimal: 2,
    minimumFractionDigits: 2,
  })}`;

  return (
    <Content
      icon="PROVENANCE"
      title="Chain Value"
      headerContent={<Item>{provenanceAUM}</Item>}
      headerMargin="0 0 0px"
    ></Content>
  );
};

export default AssetsAUM;
