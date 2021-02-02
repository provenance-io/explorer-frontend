import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { maxLength, getUTCTime, capitalize } from 'utils';
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
  const [showGasInfo, setShowGasInfo] = useState(false);
  const [showFullJSON, setShowFullJSON] = useState(false);
  const { getTxInfo, txInfo, txInfoLoading, txFullJSONLoading, txFullJSON, getTxFullJSON } = useTxs();
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
    const { fee, feeDenomination, gasLimit, gasPrice, gasUsed, gasWanted, height, memo, signer, status, time } = txInfo;

    const utcTime = getUTCTime(time);

    const popupNote = {
      visibility: { visible: showGasInfo, setVisible: setShowGasInfo },
      icon: { name: 'HELP', size: '1.7rem' },
      method: ['click', 'hover'],
      fontColor: 'FONT_WHITE',
      data: [
        { title: 'Gas Price', value: `${gasPrice} ${feeDenomination}` },
        { title: 'Gas Used', value: gasUsed },
        { title: 'Gas Wanted', value: gasWanted },
        { title: 'Gas Limit', value: gasLimit },
      ],
    };

    const summaryData = [
      { title: 'Block', value: height, link: `/block/${height}`, copy: height },
      { title: 'Status', value: capitalize(status) },
      { title: 'Timestamp', value: `${utcTime}+UTC` },
      { title: 'Fee', value: `${fee ? fee : '[N/A]'} ${feeDenomination ? feeDenomination : '[N/A]'}` },
      { title: 'Gas Used', value: gasUsed, popupNote },
      { title: 'Signer', value: maxLength(signer, 24, 10), link: `/address/${signer}`, copy: signer },
      { title: 'Memo', value: maxLength(memo, 100), copy: memo },
    ];

    return <Summary data={summaryData} />;
  };

  const buildTxMessageContent = () => {
    const { amount = '', denomination = '[N/A]', from = '[N/A]', to = '[N/A]', txType = '[N/A]' } = txInfo;

    const summaryData = [
      { title: 'Tx Type', value: capitalize(txType) },
      { title: 'From', value: from || '[N/A]', link: `/address/${from}`, copy: from },
      { title: 'Amount', value: `${amount || '[N/A]'} ${denomination || '[N/A]'}` },
      { title: 'To', value: to || '[N/A]', link: `/address/${to}`, copy: to },
    ];

    return (
      <>
        <Summary data={summaryData} />
        <FullTxInfoContainer onClick={toggleShowFullJSON}>{showFullJSON ? 'Hide' : 'Show'} full transaction JSON</FullTxInfoContainer>
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

  const buildTxInformationSection = () => (infoExists ? buildTxInformationContent() : buildNoResults());
  const buildTxMessageSection = () => (infoExists ? buildTxMessageContent() : buildNoResults());

  return (
    <>
      <Section header>
        <Content title="Transaction Information">{txInfoLoading ? <Loading /> : buildTxInformationSection()}</Content>
      </Section>
      <Section>
        <Content title="Transaction Message or Result">{txInfoLoading ? <Loading /> : buildTxMessageSection()}</Content>
      </Section>
    </>
  );
};

export default TxInformation;
