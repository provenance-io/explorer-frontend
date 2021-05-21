import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { Content, CopyValue, PopupNote, Sprite, Loading } from 'Components';
import { capitalize, getFormattedDate, maxLength, numberFormat } from 'utils';

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  margin: auto;
  height: 150px;
  width: 150px;
  overflow: hidden;
`;
const ImageLetter = styled.span`
  font-size: 7rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
  text-transform: uppercase;
`;
const Row = styled.div`
  flex-basis: 100%;
  margin-bottom: 10px;
`;
const Half = styled.div`
  text-align: center;
  flex-basis: 50%;
`;
const SpotlightContainer = styled.div`
  margin-right: 60px;
  border-right: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
`;
const DataRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  text-align: left;
`;
const DataTitle = styled.div`
  min-width: ${({ size }) => (size ? size : '200px')};
  color: ${({ theme }) => theme.FONT_PRIMARY};
`;
const DataValue = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  display: flex;
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
    image,
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

  return (
    <Content>
      {validatorSpotlightLoading ? (
        <Loading />
      ) : (
        <>
          <Half>
            <SpotlightContainer>
              <ImageContainer>
                {image ? <img src={image} alt={moniker} title={moniker} /> : <ImageLetter>{moniker ? moniker[0] : '?'}</ImageLetter>}
              </ImageContainer>
              <Row>
                <Title title={moniker}>{maxLength(moniker, 18)}</Title>
              </Row>
              {url && (
                <Row title={moniker}>
                  <a href={url} title={`${maxLength(moniker, 18)} url link`} target="_blank" rel="noopener noreferrer">
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
                  <NoteContainer onMouseEnter={() => setShowNote(true)} onMouseLeave={() => setShowNote(false)}>
                    <PopupNote show={showNote} position="below">
                      <NoteText>The address you used to create a validator, delegate, withdraw delegator reward, etc</NoteText>
                    </PopupNote>
                    <Sprite icon="HELP_OUTLINE" size="1.7rem" onClick={() => setShowNote(!showNote)} />
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
                <Link to={`/accounts/${withdrawalAddress}`}>{maxLength(withdrawalAddress, 11, 3)}</Link>
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
                  <DataValue>{getFormattedDate(new Date(jailedUntil.millis), 'yyyy/MM/dd HH:mm:ss')}</DataValue>
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
