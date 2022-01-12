import React, { useEffect } from 'react';
import { useBlocks, useInterval } from 'redux/hooks';
import { Content } from 'Components';
import { formatDenom } from 'utils';
import { polling, breakpoints } from 'consts';
import styled from 'styled-components';

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

  // Initial load, get most recent blocks
  useEffect(() => {
    getBlockSpotlight();
  }, [getBlockSpotlight]);

  // Poll the API for new data every 5s
  useInterval(
    () => !blockSpotlightLoading && getBlockSpotlight(),
    polling.blockSpotlight,
    blockSpotlightFailed
  );

  // Dropping in '--' to know which values are missing from the tendermintRPC and need to be added by a BE API
  const { totalAum = {} } = blockLatest;
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
