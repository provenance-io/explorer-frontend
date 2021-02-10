import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Summary, Loading } from 'Components';
import { numberFormat } from 'utils';
import { useAssets } from 'redux/hooks';

const AssetInformation = () => {
  const { assetId } = useParams();
  const { getAssetInfo, assetInfo, assetInformationLoading } = useAssets();

  useEffect(() => {
    getAssetInfo(assetId);
  }, [assetId, getAssetInfo]);

  const {
    marker = '[N/A]',
    ownerAddress = '[N/A]',
    totalSupply = '[N/A]',
    mintable = '[N/A]',
    price = '[N/A]',
    priceChange = '[N/A]',
    holderCount = '[N/A]',
    txnCount = '[N/A]',
    website = '[N/A]',
  } = assetInfo;

  const summaryData = [
    { title: 'Asset Name', value: marker },
    { title: 'Owner', value: ownerAddress, link: `/accounts/${ownerAddress}`, copy: ownerAddress },
    { title: 'Supply', value: numberFormat(totalSupply) },
    { title: 'Mintable', value: `${mintable}` },
    { title: 'Price', value: numberFormat(price, 6, 'currency'), change: priceChange },
    { title: 'Holders', value: holderCount },
    { title: 'Transactions', value: txnCount ? numberFormat(txnCount) : '[N/A]' },
    { title: 'Website', value: website, externalLink: website },
  ];

  return <Content title="Asset Information">{assetInformationLoading ? <Loading /> : <Summary data={summaryData} />}</Content>;
};

export default AssetInformation;
