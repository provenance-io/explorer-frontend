import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { maxLength, getUTCTime, capitalize, isEmpty, formatDenom } from 'utils';
import { Content, Loading, Summary } from 'Components';
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
  const [showErrorLogPopup, setShowErrorLogPopup] = useState(false);
  const { txInfo, txInfoLoading, txFullJSONLoading, txFullJSON, getTxFullJSON } = useTxs();
  const { txHash } = useParams();

  const infoExists = !isEmpty(txInfo);

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
    const { errorCode, errorLog, fee, height, memo, signers, status, time } = txInfo;
    const { amount: feeAmount, denom: feeDenom } = fee;
    const utcTime = getUTCTime(time);
    // We don't want to round the fees, they are already rounded when we receive them
    // 20 decimals is the max toLocaleString allows
    const feeValue = formatDenom(feeAmount, feeDenom, { decimals: 20 });

    // Signers is an object containing signers [array] and threshold [number] - we only need the first signers array item
    const signer = signers?.signers[0];

    const errorLogPopupNote = {
      visibility: { visible: showErrorLogPopup, setVisible: setShowErrorLogPopup },
      icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
      method: ['click', 'hover'],
      fontColor: 'FONT_WHITE',
      data: [
        {
          title: 'Error Log:',
          value: errorLog,
        },
      ],
    };

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
      errorCode !== 0 && { title: 'Error Code', value: errorCode, popupNote: errorLogPopupNote },
    ].filter((s) => s);

    return (
      <Fragment>
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
      </Fragment>
    );
  };

  const buildTxInformationSection = () =>
    infoExists ? buildTxInformationContent() : buildNoResults();

  return (
    <Fragment>
      <Content title="Transaction Information">
        {txInfoLoading ? <Loading /> : buildTxInformationSection()}
      </Content>
    </Fragment>
  );
};

export default TxInformation;
