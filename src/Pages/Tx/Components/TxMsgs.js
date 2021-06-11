import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  camelToSentence,
  capitalize,
  currencyFormat,
  getUTCTime,
  isArray,
  isEmpty,
  isObject,
  maxLength,
  numberFormat,
} from 'utils';
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

const MsgContainer = styled.div`
  flex-basis: 100%;
  margin-bottom: 10px;
  padding: 10px 20px;
  border: 1px solid lightgray;
  border-radius: 4px;

  &:last-child {
    margin: 0;
  }
`;

const TxMsgs = () => {
  const { txInfo, txInfoLoading } = useTxs();
  const { txHash } = useParams();

  const res = txInfo?.msg?.map((msg) => [
    { title: 'Tx Type', value: capitalize(msg.type) },
    ...Object.entries(msg.msg).map(([key, value]) => {
      const title = camelToSentence(key);
      switch (key) {
        case 'amount':
          // TODO: Make a function that does currency format + number format
          // and also lists the display denom
          return {
            title,
            value: `${numberFormat(currencyFormat(value.amount, value.denom))}`,
          };
        case 'delegatorAddress': //fallthrough
        case 'fromAddress': // fallthrough
        case 'invoker': // fallthrough
        case 'proposer': // fallthrough
        case 'toAddress': // fallthrough
        case 'validatorAddress': //fallthrough
        case 'voter': //fallthrough
          return {
            title,
            value: txInfo.monikers[value] || maxLength(value, 24, 10),
            link: `/accounts/${value}`,
          };
        case 'time':
          return {
            title,
            value: `${getUTCTime(value)}+UTC`,
          };

        default:
          if (isArray(value) || isObject(value)) {
            return { title, value: JSON.stringify(value), isJson: true };
          }

          return { title, value };
      }
    }),
  ]);

  const infoExists = !isEmpty(txInfo);

  return (
    <Content title="Messages">
      {txInfoLoading ? (
        <Loading />
      ) : infoExists ? (
        <Fragment>
          {res.map((r) => (
            <MsgContainer key={r}>
              <Summary data={r} />
            </MsgContainer>
          ))}
        </Fragment>
      ) : (
        <DataRow>
          <DataTitle>No information exists for transaction {txHash}</DataTitle>
        </DataRow>
      )}
    </Content>
  );
};

export default TxMsgs;
