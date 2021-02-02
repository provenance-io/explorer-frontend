import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { Content, CopyValue, PopupNote, Sprite } from 'Components';
import { maxLength } from 'utils';

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
  color: ${({ theme }) => theme.FONT_BLACK};
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
  background: ${({ theme }) => theme.BACKGROUND_THEME};
  color: ${({ theme }) => theme.FONT_WHITE};
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
`;

const ValidatorSpotlight = () => {
  const [showNote, setShowNote] = useState(false);
  const { getvalidatorSpotlight, validatorSpotlight } = useValidators();
  const { validatorId } = useParams();

  useEffect(() => {
    getvalidatorSpotlight(validatorId);
  }, [getvalidatorSpotlight, validatorId]);

  const {
    image,
    moniker,
    description,
    url,
    votingPower,
    uptime,
    consensusPubKey,
    bondHeight = '[N/A]',
    missedBlocks = '[N/A]',
    totalBlocks = '[N/A]',
  } = validatorSpotlight;

  return (
    <Content>
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
          <Status>Active</Status>
        </DataRow>
        <DataRow>
          <DataTitle>
            <ValueRow>
              Operator Address:
              <NoteContainer onMouseEnter={() => setShowNote(true)} onMouseLeave={() => setShowNote(false)}>
                <PopupNote show={showNote} position="below">
                  <NoteText>The address you used to create a validator, delegate, withdraw delegator reward, etc</NoteText>
                </PopupNote>
                <Sprite icon="HELP" size="1.7rem" onClick={() => setShowNote(!showNote)} />
              </NoteContainer>
            </ValueRow>
          </DataTitle>
          <DataValue title={validatorId}>
            {maxLength(validatorId, 11, 3)}
            <CopyValue title="Copy Operator Address" value={validatorId} />
          </DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Owner Address:</DataTitle>
          <DataValue title={validatorId}>
            <Link to={`/address/${validatorId}`}>{maxLength(validatorId, 11, 3)}</Link>
            <CopyValue title="Copy Owner Address" value={validatorId} />
          </DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Withdraw Address:</DataTitle>
          <DataValue title={validatorId}>
            <Link to={`/address/${validatorId}`}>{maxLength(validatorId, 11, 3)}</Link>
            <CopyValue title="Copy Withdraw Address" value={validatorId} />
          </DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Voting Power:</DataTitle>
          <DataValue>{votingPower}</DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Uptime:</DataTitle>
          <DataValue>{uptime}</DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Missed Blocks:</DataTitle>
          <DataValue>
            {missedBlocks} in {totalBlocks}
          </DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Bond Height:</DataTitle>
          <DataValue>{bondHeight}</DataValue>
        </DataRow>
        <DataRow>
          <DataTitle>Consensus Pubkey:</DataTitle>
          <DataValue title={consensusPubKey}>
            {maxLength(consensusPubKey, 11, 3)}
            <CopyValue title="Copy Consensus Pubkey" value={consensusPubKey} />
          </DataValue>
        </DataRow>
      </Half>
    </Content>
  );
};

export default ValidatorSpotlight;
