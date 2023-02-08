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
  const [showFeepayerTypePopup, setShowFeepayerTypePopup] = useState(false);
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
    const {
      errorCode,
      errorLog,
      fee,
      height,
      memo,
      signers,
      status,
      time,
      feepayer,
      additionalHeights,
    } = txInfo;

    const totalFee = { amount: 0, denom: '' };

    fee.map((fee) => {
      const amount = fee.fees[0].amount;
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

    const feepayerTypePopupNote = {
      visibility: { visible: showFeepayerTypePopup, setVisible: setShowFeepayerTypePopup },
      icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
      method: ['click', 'hover'],
      fontColor: 'FONT_WHITE',
      data: [
        {
          title: 'Feepayer Type:',
          value: feepayer.type,
        },
      ],
    };

    const tableData = JSON.parse(JSON.stringify(signers)).map((item) => ({
      copy: true,
      ...item,
    }));

    const summaryData = [
      { title: 'Block', value: height, link: `/block/${height}`, copy: height },
      { title: 'Status', value: capitalize(status) },
      { title: 'Timestamp', value: `${utcTime}+UTC` },
      { title: 'Total Fees', value: feeValue },
      {
        title: signers.length === 1 ? 'Signer' : 'Signer(s)',
        value: signers.length === 1 && maxLength(signers[0].address, 12, '4'),
        link: signers.length === 1 && `/accounts/${signers[0].address}`,
        copy: signers.length === 1 && signers[0].address,
        table:
          signers.length > 1
            ? {
                tableHeaders: [
                  { displayName: 'Address', dataName: 'address' },
                  { displayName: 'Sequence', dataName: 'sequence' },
                ],
                tableData,
                isLoading: txInfoLoading,
                showIndex: true,
              }
            : null,
      },
      {
        title: 'Feepayer',
        value: maxLength(feepayer.address, 12, '4'),
        link: `/accounts/${feepayer.address}`,
        copy: feepayer.address,
        popupNote: feepayerTypePopupNote,
      },
      ...(memo ? [{ title: 'Memo', value: maxLength(memo, 100) || '--', copy: memo }] : []),
      ...(additionalHeights.length > 0
        ? [
            {
              title: 'Additional Heights',
              value: additionalHeights,
              list: additionalHeights,
              linkList: additionalHeights.map((block) => `/tx/${txHash}/${block}`),
            },
          ]
        : []),
      ...(errorCode !== 0
        ? [{ title: 'Error Code', value: errorCode, popupNote: errorLogPopupNote }]
        : []),
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
