import React from 'react';
import styled from 'styled-components';
import { Content as BaseContent, Summary, Loading } from 'Components';
import { useContracts, useMediaQuery } from 'redux/hooks';
import { maxLength, camelToSentence } from 'utils';
import { breakpoints } from 'consts';

const Content = styled(BaseContent)`
  margin-bottom: -33px;
`;

const ContractHistory = () => {
  const { 
    contractHistory, 
    contractHistoryLoading,
  } = useContracts();

  const { matches: isMed } = useMediaQuery(breakpoints.down('md'));

  const {
    operation,
    codeId,
    msg,
  } = contractHistory[0];

  const summaryDataOne = [
    {
      title: 'Operation',
      value: operation || '--',
      nobreak: isMed ? false : true,
    },
  ];

  const summaryDataTwo = [
    {
      title: 'Code ID',
      value: codeId ? maxLength(codeId, 14,'6') : '--',
      link: codeId ? `/code/${codeId}` : '',
      hover: codeId,
    },
  ];

  const getLinkList = (values: string[], prefix: string) => (
    values.map(value => prefix + value)
  );

  const getMsgs = Object.entries(msg)?.map(([key, value]) => {
    const title = camelToSentence(key);
    switch(key) {
      case 'convertible_base_denoms': // fallthrough
      case 'supported_quote_denoms': // fallthrough
      case 'capital_denom': // fallthrough
      case 'base_denom':
        return {
          title,
          value: Array.isArray(value) ? value : maxLength(value, 14, '6'),
          link: Array.isArray(value) ? undefined : `/asset/${value}`,
          list: Array.isArray(value) ? value.map(val => maxLength(val,14,'6')) : undefined,
          linkList: Array.isArray(value) ? getLinkList(value, '/asset/') : undefined,
        };
      case 'approvers': // fallthrough
      case 'recovery_admin': // fallthrough
      case 'lp': // fallthrough
      case 'executors':
        return {
          title,
          value: Array.isArray(value) ? value : maxLength(value, 14, '6'),
          link: Array.isArray(value) ? undefined : `/accounts/${value}`,
          list: Array.isArray(value) ? value.map(val => maxLength(val,14,'6')) : undefined,
          linkList: Array.isArray(value) ? getLinkList(value, '/accounts/') : undefined,
        };
      default: 
        return {
          title,
          value: Array.isArray(value) ? value : maxLength(value, 14, '6'),
          list: Array.isArray(value) ? value.map(val => maxLength(val,20,'6')) : undefined,
        };
    };
  });

  return (
    <>
      <Content
        title="Contract History"
      >
        {contractHistoryLoading ? <Loading /> : 
            <Summary data={summaryDataOne} />
        }
      </Content>
      <Content
        borderTop='none'
        borderBottom='none'
      >
        {contractHistoryLoading ? <Loading /> : 
            <Summary data={summaryDataTwo} />
        }
      </Content>
      <Content
        borderTop='none'
      >
        {contractHistoryLoading ? <Loading /> : 
          <Summary data={getMsgs} />
        }
      </Content>
    </>
  );
};

export default ContractHistory;