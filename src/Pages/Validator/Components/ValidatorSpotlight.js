import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import {
  BlockImage,
  Content,
  CopyValue,
  DataRow,
  DataTitle,
  DataValue,
  PopupNote,
  Sprite,
  Loading,
} from 'Components';
import { capitalize, getFormattedDate, maxLength, numberFormat } from 'utils';
import { breakpoints } from 'consts';

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  flex-basis: 100%;
  margin-bottom: 10px;
`;

const Half = styled.div`
  flex-basis: 100%;

  @media ${breakpoints.up('sm')} {
    text-align: center;
    flex-basis: 50%;
  }
`;

const SpotlightContainer = styled.div`
  text-align: center;

  @media ${breakpoints.up('sm')} {
    margin-right: 60px;
    border-right: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  }
`;

const ValueRow = styled.div`
  display: flex;
`;

const NoteContainer = styled.div`
  position: relative;
  margin-left: 3px;
`;

const NoteText = styled.div`
  min-width: 200px;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 10px 0;
  font-size: 1.7rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 10px;
`;

const Status = styled.div`
  background: ${({ theme, status }) => theme[`CHIP_${status?.toUpperCase()}`]};
  color: ${({ theme }) => theme.FONT_WHITE};
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
`;

const ValidatorSpotlight = () => {
  const [showNote, setShowNote] = useState(false);
  const { getValidatorSpotlight, validatorSpotlight, validatorSpotlightLoading } = useValidators();
  const { validatorId } = useParams();

  useEffect(() => {
    getValidatorSpotlight(validatorId);
  }, [getValidatorSpotlight, validatorId]);

  const {
    blockCount = {},
    bondHeight = '--',
    consensusPubKey,
    description,
    imgUrl,
    jailedUntil,
    moniker,
    ownerAddress,
    operatorAddress,
    status,
    unbondingHeight,
    uptime,
    url,
    votingPower, // defaults to null, so the default here doesn't work
    withdrawalAddress,
  } = validatorSpotlight;

  const isJailed = status === 'jailed';
  const { count: votingPowerCount, total: votingPowerTotal } = votingPower || {};
  const votingPowerPercent = numberFormat((votingPowerCount / votingPowerTotal) * 100, 2);
  const { count: missedBlocksCount, total: missedBlocksTotal } = blockCount;

  // TODO: Refactor to use Summary component

  return (
    <Content>
      {validatorSpotlightLoading ? (
        <Loading />
      ) : (
        <>
          <Half>
            <SpotlightContainer>
              <ImageContainer>
                <BlockImage icon={imgUrl} moniker={moniker} address={operatorAddress} />
              </ImageContainer>
              <Row>
                <Title title={moniker}>{maxLength(moniker, 18)}</Title>
              </Row>
              {url && (
                <Row title={moniker}>
                  <a
                    href={url}
                    title={`${maxLength(moniker, 18)} url link`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url}
                  </a>
                </Row>
              )}
              {description && (
                <Row>
                  <Description>{description}</Description>
                </Row>
              )}
            </SpotlightContainer>
          </Half>
          <Half>
            <DataRow>
              <Status status={status}>{capitalize(status)}</Status>
            </DataRow>
            <DataRow>
              <DataTitle>
                <ValueRow>
                  Operator Address:
                  <NoteContainer
                    onMouseEnter={() => setShowNote(true)}
                    onMouseLeave={() => setShowNote(false)}
                  >
                    <PopupNote show={showNote} position="below">
                      <NoteText>
                        The address you used to create a validator, delegate, withdraw delegator
                        reward, etc
                      </NoteText>
                    </PopupNote>
                    <Sprite
                      icon="HELP_OUTLINE"
                      size="1.7rem"
                      onClick={() => setShowNote(!showNote)}
                    />
                  </NoteContainer>
                </ValueRow>
              </DataTitle>
              <DataValue title={operatorAddress}>
                {maxLength(operatorAddress, 11, 3)}
                <CopyValue title="Copy Operator Address" value={operatorAddress} />
              </DataValue>
            </DataRow>
            <DataRow>
              <DataTitle>Owner Address:</DataTitle>
              <DataValue title={ownerAddress}>
                <Link to={`/accounts/${ownerAddress}`}>{maxLength(ownerAddress, 11, 3)}</Link>
                <CopyValue title="Copy Owner Address" value={ownerAddress} />
              </DataValue>
            </DataRow>
            <DataRow>
              <DataTitle>Withdraw Address:</DataTitle>
              <DataValue title={withdrawalAddress}>
                <Link to={`/accounts/${withdrawalAddress}`}>
                  {maxLength(withdrawalAddress, 11, 3)}
                </Link>
                <CopyValue title="Copy Withdraw Address" value={withdrawalAddress} />
              </DataValue>
            </DataRow>
            {!isJailed && (
              <>
                <DataRow>
                  <DataTitle>Voting Power:</DataTitle>
                  <DataValue>{votingPowerPercent}%</DataValue>
                </DataRow>
                <DataRow>
                  <DataTitle>Uptime:</DataTitle>
                  <DataValue>{numberFormat(uptime, 2)}%</DataValue>
                </DataRow>
                <DataRow>
                  <DataTitle>Missed Blocks:</DataTitle>
                  <DataValue>
                    {numberFormat(missedBlocksCount)} in {numberFormat(missedBlocksTotal)}
                  </DataValue>
                </DataRow>
                <DataRow>
                  <DataTitle>Bond Height:</DataTitle>
                  <DataValue>{numberFormat(bondHeight)}</DataValue>
                </DataRow>
              </>
            )}
            {isJailed && (
              <DataRow>
                <DataTitle>Unbonding Height:</DataTitle>
                <DataValue>{unbondingHeight}</DataValue>
              </DataRow>
            )}
            <DataRow>
              <DataTitle>Consensus Pubkey:</DataTitle>
              <DataValue title={consensusPubKey}>
                {maxLength(consensusPubKey, 11, 3)}
                <CopyValue title="Copy Consensus Pubkey" value={consensusPubKey} />
              </DataValue>
            </DataRow>
            {isJailed && (
              <>
                <DataRow>
                  <DataTitle>Jailed Until:</DataTitle>
                  <DataValue>
                    {jailedUntil ? getFormattedDate(new Date(jailedUntil)) : 'unknown'}
                  </DataValue>
                </DataRow>
              </>
            )}
          </Half>
        </>
      )}
    </Content>
  );
};

export default ValidatorSpotlight;
