import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { Content as BaseContent, Summary, Loading } from 'Components';
import { useContracts, useMediaQuery } from 'redux/hooks';
import { maxLength } from 'utils';
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

  const {
    recovery_admin,
    lp,
    capital_denom,
    min_commitment,
    max_commitment,
    capital_per_share,
    min_days_of_notice,
  } = msg;

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
    {
      title: 'Recovery Admin',
      value: recovery_admin ? maxLength(recovery_admin,14,'6') : '--',
      link: recovery_admin ? `/accounts/${recovery_admin}` : '',
      hover: recovery_admin,
      copy: recovery_admin,
    },
    {
      title: 'LP',
      value: lp ? maxLength(lp,14,'6') : '--',
      link: `/accounts/${lp}` || '',
      hover: lp,
      copy: lp,
    },
    {
      title: 'Capital Denom',
      value: capital_denom ? maxLength(capital_denom, 14,'6') : '--',
      link: capital_denom ? `/asset/${capital_denom}` : '',
    },
    {
      title: 'Min Commitment',
      value: min_commitment || '--',
    },
    {
      title: 'Max Commitment',
      value: max_commitment || '--',
    },
    {
      title: 'Capital Per Share',
      value: capital_per_share || '--',
    },
    {
      title: 'Min Days of Notice',
      value: min_days_of_notice || '--',
    },
  ];

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
    >
      {contractHistoryLoading ? <Loading /> : 
        <Summary data={summaryDataTwo} />
      }
    </Content>
  </>
  );
};

export default ContractHistory;