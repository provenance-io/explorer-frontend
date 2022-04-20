import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  camelToSentence,
  capitalize,
  formatDenom,
  getUTCTime,
  isArray,
  isEmpty,
  isObject,
  maxLength,
} from 'utils';
import { Content, InfiniteScroll, Loading, Summary, Filters, DataMissing } from 'Components';
import { useApp, useTxs } from 'redux/hooks';

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

const FiltersWrapper = styled.div`
  position: relative;
  margin-left: 18px;
  margin-bottom: 4px;
`;

const TxMsgs = () => {
  const [filterMsgType, setFilterMsgType] = useState('');
  const { tableCount, getChaincodePrefixes, chaincodePrefixes, chaincodePrefixesLoading } =
    useApp();
  const {
    txInfo,
    getTxMsgs,
    resetTxMsgs,
    txMsgs,
    txMsgsLoading,
    txMsgsPages,
    txMsgsTotal,
    getTxMsgTypes,
    txMsgTypes,
    txMsgLoading,
  } = useTxs();
  const { txHash } = useParams();

  // Get chaincode prefixes
  useEffect(() => {
    if (isEmpty(chaincodePrefixes)) {
      getChaincodePrefixes();
    }
  }, [getChaincodePrefixes, chaincodePrefixes]);

  const loadMsgs = useCallback(
    page => {
      getTxMsgs({ txHash, count: tableCount, page, msgType: filterMsgType });
    },
    [getTxMsgs, txHash, filterMsgType, tableCount]
  );

  // Get all the Message types for this tx
  useEffect(() => {
    getTxMsgTypes(txHash);
  }, [getTxMsgTypes, txHash]);

  useEffect(() => {
    loadMsgs(1);
    return () => resetTxMsgs(txHash);
  }, [loadMsgs, resetTxMsgs, txHash, filterMsgType]);

  // Use this to check for a reset to 'all' where we will pass '' as the type
  const updateMsgFilterType = newType => {
    const finalType = newType === 'allTxTypes' ? '' : newType;
    setFilterMsgType(finalType);
  };

  // Determine link prefix
  const getPrefix = value => {
    const prefix = chaincodePrefixes
      // Sort the response of prefixes so longest are first
      .sort((a, b) => (b.prefix.length > a.prefix.length ? 1 : -1))
      // Find the matching prefix in the account hash
      .find(pre => value.match(pre.prefix))
      // Lowercase the prefix
      ?.type?.toLowerCase();
    // If account, add an s for a valid link
    return prefix === 'account' ? `${prefix}s` : prefix;
  };

  const msgs = txMsgs?.[txHash]?.map(msg => [
    { title: 'Tx Type', value: capitalize(msg.type) },
    ...Object.entries(msg?.msg).map(([key, value]) => {
      const title = camelToSentence(key);
      switch (key) {
        case 'amount': {
          let amt = formatDenom(value.amount, value.denom);
          let denom = value.denom;
          if (isArray(value)) {
            denom = value[0].denom;
            amt = value.map(v => formatDenom(v.amount, v.denom)).join(', ');
          }
          return {
            title,
            value: amt,
            link: `/asset/${denom}`,
            splitOnSpace: true,
          };
        }
        case 'delegatorAddress': //fallthrough
        case 'fromAddress': // fallthrough
        case 'invoker': // fallthrough
        case 'proposer': // fallthrough
        case 'toAddress': // fallthrough
        case 'voter': //fallthrough
        case 'validatorAddr': //fallthrough
        case 'granter': // fallthrough
        case 'grantee': //fallthrough
        case 'sender': //fallthrough
        case 'contract': //fallthrough
        case 'account': //fallthrough
        case 'owner': //fallthrough
        case 'manager': //fallthrough
        case 'administrator': //fallthrough
        case 'validatorAddress': {
          return {
            title,
            value: txInfo?.monikers?.[value] || maxLength(value, 24, 10),
            link: `/${getPrefix(value)}/${value}`,
          };
        }
        case 'time':
          return {
            title,
            value: `${getUTCTime(value)}+UTC`,
          };
        case 'denom':
          return {
            title,
            value,
            link: `/asset/${value}`,
          };
        case 'scopeUuid':
          return {
            title,
            value,
            link: `/nft/${value}`,
          };
        default:
          if (isArray(value) || isObject(value)) {
            return { title, value: JSON.stringify(value), isJson: true };
          }
          // Summary does not accept booleans
          if (typeof value === 'boolean') {
            return { title, value: value.toString() };
          }

          return { title, value };
      }
    }),
  ]);

  const infoExists = !isEmpty(msgs);
  const msgTypesExist = Object.keys(txMsgTypes).length > 2;
  // Messate Type Filter Data
  const filterData = [
    {
      title: '',
      type: 'dropdown',
      options: txMsgTypes,
      action: updateMsgFilterType,
    },
  ];

  return (
    <Content
      title={`Messages (${txMsgsTotal})`}
      icon="REPORTS"
      headerContent={
        !txMsgLoading &&
        msgTypesExist && (
          <FiltersWrapper>
            <Filters filterData={filterData} flush />
          </FiltersWrapper>
        )
      }
    >
      {((txMsgsLoading && !infoExists) || chaincodePrefixesLoading) && <Loading />}
      {infoExists ? (
        <InfiniteScroll loading={txMsgsLoading} onLoadMore={loadMsgs} totalPages={txMsgsPages}>
          {({ sentryRef, hasNextPage }) => (
            <Fragment>
              {msgs?.map(tx => (
                <MsgContainer key={JSON.stringify(tx)}>
                  <Summary data={tx} />
                </MsgContainer>
              ))}
              {(hasNextPage || txMsgsLoading) && <Loading ref={sentryRef} />}
            </Fragment>
          )}
        </InfiniteScroll>
      ) : (
        !txMsgsLoading && <DataMissing>No information exists for transaction {txHash}</DataMissing>
      )}
    </Content>
  );
};

export default TxMsgs;
