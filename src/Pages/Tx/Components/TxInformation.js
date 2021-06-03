import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { maxLength, getUTCTime, capitalize, numberFormat, formatNhash } from 'utils';
import { Section, Content, Loading, Summary } from 'Components';
import { useTxs } from 'redux/hooks';

const DataRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  word-break: ${({ nobreak }) => (nobreak ? 'normal' : 'break-all')};
  align-items: flex-start;
`;
const DataTitle = styled.div`
  min-width: ${({ size }) => (size ? size : '200px')};
  color: ${({ color, theme }) => (color ? color : theme.FONT_TITLE_INFO)};
`;
const FullTxInfoContainer = styled.div`
  color: ${({ theme }) => theme.FONT_LINK};
  margin-top: 20px;
  font-style: italic;
  cursor: pointer;
  font-size: 1.2rem;
`;
const FullJSONWrapper = styled.div`
  padding: 18px;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  width: 100%;
  font-size: 1.2rem;
`;
const FullJSON = styled.div`
  color: ${({ theme }) => theme.FONT_PRIMARY};
  font-family: ${({ theme }) => theme.CODE_FONT};
  font-style: normal;
  width: 100%;
  max-width: 100%;
  max-height: 700px;
  overflow: scroll;
`;
const RetryJSON = styled.div`
  color: ${({ theme }) => theme.FONT_LINK};
  margin-top: 10px;
  font-style: italic;
  cursor: pointer;
`;

const TxInformation = () => {
  const [showFullJSON, setShowFullJSON] = useState(false);
  const { getTxInfo, txInfo, txInfoLoading, txFullJSONLoading, txFullJSON, getTxFullJSON } =
    useTxs();
  const { txHash } = useParams();

  useEffect(() => {
    getTxInfo(txHash);
  }, [txHash, getTxInfo]);

  const infoExists = txInfo && Object.keys(txInfo).length;

  const fetchFullJSON = () => {
    getTxFullJSON(txHash);
  };

  const toggleShowFullJSON = () => {
    // If previously hidden and no JSON data exists
    if ((!showFullJSON && !txFullJSON) || txHash !== txFullJSON?.txhash) {
      fetchFullJSON();
    }
    setShowFullJSON(!showFullJSON);
  };

  const buildNoResults = () => (
    <DataRow>
      <DataTitle>No information exists for transaction {txHash}</DataTitle>
    </DataRow>
  );

  const buildTxInformationContent = () => {
    const { fee, height, memo, signers, status, time } = txInfo;
    const { amount: feeAmount, denom: feeDenom } = fee;
    const utcTime = getUTCTime(time);
    const feeValue =
      feeDenom === 'nhash'
        ? `${formatNhash(feeAmount)} hash`
        : `${numberFormat(feeAmount)} ${feeDenom}`;

    // Signers is an object containing signers [array] and threshold [number] - we only need the first signers array item
    const signer = signers?.signers[0];
    const summaryData = [
      { title: 'Block', value: height, link: `/block/${height}`, copy: height },
      { title: 'Status', value: capitalize(status) },
      { title: 'Timestamp', value: `${utcTime}+UTC` },
      { title: 'Fee', value: feeValue },

      {
        title: 'Signer',
        value: maxLength(signer, 24, 10),
        link: `/accounts/${signer}`,
        copy: signer,
      },
      { title: 'Memo', value: maxLength(memo, 100) || '--', copy: memo },
    ];

    return (
      <>
        <Summary data={summaryData} />
        <FullTxInfoContainer onClick={toggleShowFullJSON}>
          {showFullJSON ? 'Hide' : 'Show'} full transaction JSON
        </FullTxInfoContainer>
        {showFullJSON && (
          <FullJSONWrapper>
            {txFullJSONLoading && <Loading />}
            {!txFullJSONLoading &&
              (txFullJSON ? (
                <FullJSON>
                  <ReactJson src={txFullJSON} theme="ocean" />}
                </FullJSON>
              ) : (
                <FullJSON>
                  <div>Unable to load JSON data...</div>
                  <RetryJSON onClick={fetchFullJSON}>Retry</RetryJSON>
                </FullJSON>
              ))}
          </FullJSONWrapper>
        )}
      </>
    );
  };

  const buildTxMessageContent = () => {
    // This Transaction Message/Result section is custom for every type of Tx (Sooner/Later this needs to be a util like the table builder...)
    const { msg: msgArray } = txInfo; // msg is an array, for now we will only handle a single message, in the future we may need to handle 2+
    const { msg: msgData, type: txType } = msgArray[0] || [];
    // Initial summaryData should always have the type
    const summaryData = [{ title: 'Tx Type', value: capitalize(txType) }];
    // Build each summary based off the type
    switch (txType) {
      case 'vote': {
        const { proposalId, option, voter } = msgData;
        summaryData.push(
          {
            title: 'Voter',
            value: maxLength(voter, 24, 10),
            copy: voter,
            link: `/accounts/${voter}`,
          },
          { title: 'Proposal Id', value: capitalize(proposalId) },
          { title: 'Option', value: capitalize(option) }
        );
        break;
      }
      case 'send': {
        const { amount = [], fromAddress, toAddress } = msgData;
        const { denom = '--', amount: totalAmount = '--' } = amount[0];
        summaryData.push(
          { title: 'Amount', value: `${numberFormat(totalAmount)} ${denom}` },
          {
            title: 'From',
            value: maxLength(fromAddress, 24, 10),
            copy: fromAddress,
            link: `/accounts/${fromAddress}`,
          },
          {
            title: 'To',
            value: maxLength(toAddress, 24, 10),
            copy: toAddress,
            link: `/accounts/${toAddress}`,
          }
        );
        break;
      }
      case 'submit_proposal': {
        // type, proposer, title, initial deposit, description, name, upgrade time, switch height, upgraded client state
        const { content, initialDeposit, proposer } = msgData;
        const { description, title, plan = {} } = content;
        const { denom, amount } = initialDeposit[0]; // Initial Deposit is an array, but we are only going to use the first entry for now
        const { name = '', time = '' } = plan;
        const utcTime = time ? getUTCTime(time) : '--';
        summaryData.push(
          {
            title: 'Proposer',
            value: maxLength(proposer, 24, 10),
            copy: proposer,
            link: `/accounts/${proposer}`,
          },
          { title: 'Title', value: title },
          { title: 'Initial Deposit', value: `${numberFormat(amount)} ${denom}` },
          { title: 'Description', value: description },
          { title: 'Name', value: name },
          { title: 'Upgrade Time', value: time ? `${utcTime}+UTC` : '--' },
          // No idea how these would come in, so I'm hardcoding for now...
          { title: 'Switch Height', value: '--' },
          { title: 'Upgraded Client State', value: '--' }
        );
        break;
      }
      default:
        break;
    }

    return <Summary data={summaryData} />;
  };

  const buildTxInformationSection = () =>
    infoExists ? buildTxInformationContent() : buildNoResults();
  const buildTxMessageSection = () => (infoExists ? buildTxMessageContent() : buildNoResults());

  return (
    <>
      <Section header>
        <Content title="Transaction Information">
          {txInfoLoading ? <Loading /> : buildTxInformationSection()}
        </Content>
      </Section>
      <Section>
        <Content title="Transaction Message or Result">
          {txInfoLoading ? <Loading /> : buildTxMessageSection()}
        </Content>
      </Section>
    </>
  );
};

export default TxInformation;
