import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBlocks, useInterval } from 'redux/hooks';
import { Link as BaseLink } from 'react-router-dom';
import { Content, Loading, Sprite as BaseSprite, PopupNote } from 'Components';
import { maxLength, getUTCTime } from 'utils';
import { polling, breakpoints } from 'consts';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-basis: ${({ size }) => size || 'auto'};
`;
const BlockPreviewLine = styled.div`
  text-align: center;
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
`;
const BlockImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  height: 150px;
  width: 150px;
  overflow: hidden;
`;
const BlockImageLetter = styled.span`
  font-size: 7rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
`;
const BlockDataCard = styled.div`
  min-width: 50%;
  @media ${breakpoints.down('sm')} {
    min-width: 100%;
  }
`;
const BlockDataContent = styled.div`
  border: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  @media ${breakpoints.down('md')} {
    font-size: 1.2rem;
  }
`;
const BlockItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-basis: 100%;
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ isTitle }) => isTitle && `margin: 0 0 30px 0;`}
  @media ${breakpoints.down('sm')} {
    ${({ isTitle }) => isTitle && `margin: 0 0 10px 0;`}
  }
`;
const Sprite = styled(BaseSprite)`
  margin-right: 8px;
`;
const Link = styled(BaseLink)`
  font-size: ${({ size }) => (size ? size : 'inherit')};
  ${({ weight }) => weight && `font-weight: ${weight};`}
`;
const PopupContainer = styled.div`
  display: inline-block;
  position: relative;
  height: 16px;
`;

const BlockSpotlight = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [blockLoading, setBlockLoading] = useState(false);
  const [showBondedInfo, setShowBondedInfo] = useState(false);
  const { blockLatest, getBlockSpotlight, avgBlockTime } = useBlocks();

  // Initial load, get most recent blocks
  useEffect(() => {
    if (initialLoad) {
      setBlockLoading(true);
      setInitialLoad(false);
      // Get initial blocks
      getBlockSpotlight()
        .then(() => setBlockLoading(false))
        .catch(() => setBlockLoading(false));
    }
  }, [getBlockSpotlight, initialLoad]);

  // Poll the API for new data every 5s
  useInterval(() => getBlockSpotlight(), polling.blockSpotlight);

  // Dropping in '[N/A]' to know which values are missing from the tendermintRPC and need to be added by a BE API
  const {
    height,
    time,
    proposerAddress,
    moniker,
    icon,
    votingPower,
    numValidators,
    txNum,
    bondedTokenPercent,
    bondedTokenAmount,
    bondedTokenTotal,
  } = blockLatest;
  const utcTime = time ? getUTCTime(time) : 'N/A';

  return (
    <Content justify="center">
      {blockLoading ? (
        <Loading />
      ) : (
        <>
          <Group size="30%">
            <BlockPreviewLine>
              <Sprite icon="CUBES" size="1.8rem" /> Block Height
            </BlockPreviewLine>
            <BlockPreviewLine>
              <Link to={`/block/${height}`} size="2rem" weight="900">
                {height}
              </Link>
            </BlockPreviewLine>
            <BlockPreviewLine>
              <BlockImageContainer title={moniker ? moniker : proposerAddress}>
                {icon ? (
                  <img src={icon} alt={moniker ? maxLength(moniker, 16) : '?'} title={moniker ? maxLength(moniker, 16) : '?'} />
                ) : (
                  <BlockImageLetter>{moniker ? moniker[0] : `${proposerAddress}`[0]}</BlockImageLetter>
                )}
              </BlockImageContainer>
            </BlockPreviewLine>
            <BlockPreviewLine title={moniker ? moniker : proposerAddress}>
              <Link to={`/validator/${proposerAddress}`}>{moniker ? maxLength(moniker, 16) : maxLength(proposerAddress, 16, 5)}</Link>
            </BlockPreviewLine>
          </Group>
          <Group>
            <BlockDataCard>
              <BlockDataContent>
                <BlockItem isTitle>
                  <Sprite icon="ADMIN" size="1.8rem" /> Transactions
                </BlockItem>
                <BlockItem size="1.8rem" weight="500">
                  <Link to="/txs">{txNum} K</Link>
                </BlockItem>
                <BlockItem>{utcTime}+UTC</BlockItem>
              </BlockDataContent>
            </BlockDataCard>
            <BlockDataCard>
              <BlockDataContent>
                <BlockItem isTitle>
                  <Sprite icon="PARTICIPATION" size="1.8rem" /> Voting Power
                </BlockItem>
                <BlockItem size="1.8rem" weight="500">
                  {!isNaN(votingPower) ? votingPower : '[N/A]'}
                </BlockItem>
                <BlockItem>
                  <Link to={`/validators`}>{numValidators} Validators</Link>
                </BlockItem>
              </BlockDataContent>
            </BlockDataCard>
            <BlockDataCard>
              <BlockDataContent>
                <BlockItem isTitle>
                  <Sprite icon="PENDING" size="1.8rem" /> Avg Block Time
                </BlockItem>
                <BlockItem size="1.8rem" weight="500">
                  {avgBlockTime} s
                </BlockItem>
                <BlockItem>Last 100 Blocks</BlockItem>
              </BlockDataContent>
            </BlockDataCard>
            <BlockDataCard>
              <BlockDataContent>
                <BlockItem isTitle>
                  <Sprite icon="SHARED_POOLS" size="1.8rem" /> Bonded Tokens
                </BlockItem>
                <BlockItem size="1.8rem" weight="500">
                  {bondedTokenPercent} %
                </BlockItem>
                <BlockItem>
                  <PopupContainer onMouseEnter={() => setShowBondedInfo(true)} onMouseLeave={() => setShowBondedInfo(false)}>
                    <PopupNote show={showBondedInfo} position="above">
                      <div>Amount: {bondedTokenAmount}</div>
                      <div>Total: {bondedTokenTotal}</div>
                    </PopupNote>
                    <Sprite icon="HELP" size="1.7rem" onClick={() => setShowBondedInfo(!showBondedInfo)} />
                  </PopupContainer>
                </BlockItem>
              </BlockDataContent>
            </BlockDataCard>
          </Group>
        </>
      )}
    </Content>
  );
};

export default BlockSpotlight;
