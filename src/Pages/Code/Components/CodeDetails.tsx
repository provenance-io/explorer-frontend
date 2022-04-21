import React from 'react';
// @ts-ignore
import { Content, Summary, Loading } from 'Components';
import { useContracts } from 'redux/hooks';
import { maxLength } from 'utils';

const CodeDetails = () => {
  const { 
    contractCode, 
    contractCodeLoading,
  } = useContracts();

  const {
    codeId,
    creationHeight,
    creator,
    dataHash,
  } = contractCode;

  const summaryData = [
    {
      title: 'Code ID',
      value: codeId,
    },
    {
      title: 'Creation Height',
      value: creationHeight,
      link: `/block/${creationHeight}`,
    },
    {
      title: 'Creator',
      value: maxLength(creator, 14, '6'),
      hover: creator,
      link: `/accounts/${creator}`,
      copy: creator,
    },
    {
      title: 'Data Hash',
      value: maxLength(dataHash, 14, '6'),
      hover: dataHash,
      link: `/accounts/${dataHash}`,
      copy: dataHash,
    },
  ];

  return (
    <Content title="Code Information">
      {contractCodeLoading ? <Loading /> : <Summary data={summaryData} />}
    </Content>
  );
};

export default CodeDetails;