import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Summary, Loading } from 'Components';
import { numberFormat } from 'utils';
import { useAssets } from 'redux/hooks';

const AssetsInformation = () => {
  const { assetId } = useParams();
  const { getAssetInfo, assetInfo, assetInformationLoading } = useAssets();

  useEffect(() => {
    getAssetInfo(assetId);
  }, [assetId, getAssetInfo]);

  const {
    owner = '[N/A]',
    supply = '[N/A]',
    mintable = '[N/A]',
    price = '[N/A]',
    priceChange = '[N/A]',
    holders = '[N/A]',
    transactions = '[N/A]',
    website = '[N/A]',
  } = assetInfo;

  const summaryData = [
    { title: 'Asset Name', value: assetId },
    { title: 'Owner', value: owner, link: `/address/${owner}`, copy: owner },
    { title: 'Supply', value: numberFormat(supply) },
    { title: 'Mintable', value: mintable },
    { title: 'Price', value: numberFormat(price, 6, 'currency'), change: priceChange },
    { title: 'Holders', value: holders },
    { title: 'Transactions', value: numberFormat(transactions) },
    { title: 'Website', value: website, externalLink: website },
  ];

  return <Content title="Asset Information">{assetInformationLoading ? <Loading /> : <Summary data={summaryData} />}</Content>;
};

export default AssetsInformation;
