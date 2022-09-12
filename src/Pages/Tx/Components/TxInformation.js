import React, { useState, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { maxLength, getUTCTime, capitalize, isEmpty, formatDenom } from 'utils';
import { Content, DataMissing, Loading, Summary } from 'Components';
import { useTxs } from 'redux/hooks';

const MsgContainer = styled.div`
  flex-wrap: no-wrap;
  flex-direction: column;
  align-items: flex-start;
`;

const TxInformation = () => {
  const [showErrorLogPopup, setShowErrorLogPopup] = useState(false);
  const { txInfo, txInfoLoading, txMsgsLoading, getTxInfo } = useTxs();
  const { txHash, block } = useParams();

  useEffect(() => {
    getTxInfo({ txHash, block });
  }, [txHash, getTxInfo, block]);

  const infoExists = !isEmpty(txInfo);

  const buildNoResults = () => (
    <DataMissing>No information exists for transaction {txHash}</DataMissing>
  );

  const buildTxInformationContent = () => {
    const { errorCode, errorLog, fee, height, memo, signers, status, time, additionalHeights } =
      txInfo;

    const totalFee = { amount: 0, denom: '' };

    fee.map((fee) => {
      const amount = fee.fees.reduce((sum, a) => sum + Number(a.amount), 0);
      const denom = fee.fees[0].denom;
      totalFee.amount += parseInt(amount);
      totalFee.denom = denom;
      const value = formatDenom(amount, denom, { decimal: 20 });
      return { type: fee.type, amount, denom, value };
    });

    const utcTime = getUTCTime(time);
    // We don't want to round the fees, they are already rounded when we receive them
    // 20 decimals is the max toLocaleString allows
    const feeValue = formatDenom(totalFee.amount, totalFee.denom, {
      decimal: totalFee.amount / 1e9 < 0.0001 ? 20 : 4,
    });

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
      { title: 'Total Fees', value: feeValue },

      {
        title: 'Signer',
        value: maxLength(signer, 24, 10),
        link: `/accounts/${signer}`,
        copy: signer,
      },
      { title: 'Memo', value: maxLength(memo, 100) || '--', copy: memo },
      {
        title: 'Additional Heights',
        value: additionalHeights.length > 0 ? additionalHeights : '--',
        list: additionalHeights.length > 0 ? additionalHeights : undefined,
        linkList:
          additionalHeights.length > 0
            ? additionalHeights.map((block) => `/tx/${txHash}/${block}`)
            : undefined,
      },
      errorCode !== 0 && { title: 'Error Code', value: errorCode, popupNote: errorLogPopupNote },
    ].filter((s) => s);

    return <Summary data={summaryData} />;
  };

  const buildTxInformationSection = () =>
    infoExists ? buildTxInformationContent() : buildNoResults();

  return (
    <Fragment>
      <Content title="Information" icon="HASH">
        {txInfoLoading || txMsgsLoading ? (
          <Loading />
        ) : (
          <MsgContainer>{buildTxInformationSection()}</MsgContainer>
        )}
      </Content>
    </Fragment>
  );
};

export default TxInformation;
