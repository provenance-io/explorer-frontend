import React from 'react';
import { Content, Summary, Loading } from 'Components';
import { useContracts } from 'redux/hooks';
import { maxLength } from 'utils';

const ContractDetails = () => {
  const { 
    contractDetails, 
    contractDetailsLoading 
  } = useContracts();

  const {
    contractAddress,
    creationHeight,
    codeId,
    creator,
    admin,
    label,
  } = contractDetails;

  const summaryData = [
    {
      title: 'Contract Address',
      value: maxLength(contractAddress, 14, '6'),
      hover: contractAddress,
      copy: contractAddress,
    },
    {
      title: 'Creation Height',
      value: creationHeight,
      link: `/block/${creationHeight}`,
    },
    {
      title: 'Code ID',
      value: codeId,
      link: `/code/${codeId}`,
    },
    {
      title: 'Creator',
      value: maxLength(creator, 14, '6'),
      hover: creator,
      link: `/accounts/${creator}`,
      copy: creator,
    },
    {
      title: 'Admin',
      value: maxLength(admin, 14, '6'),
      hover: admin,
      link: `/accounts/${admin}`,
      copy: admin,
    },
    {
      title: 'Label',
      value: label,
    },
  ];

  return (
    <Content title="Contract Information">
      {/* @ts-ignore */}
      {contractDetailsLoading ? <Loading /> : <Summary data={summaryData} />}
    </Content>
  );
};

export default ContractDetails;