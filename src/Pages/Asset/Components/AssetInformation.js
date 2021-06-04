import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Summary, Loading } from 'Components';
import { capitalize, numberFormat } from 'utils';
import { useAssets } from 'redux/hooks';

const AssetInformation = () => {
  const { assetId } = useParams();
  const { getAssetInfo, assetInfo, assetInfoLoading } = useAssets();

  useEffect(() => {
    getAssetInfo(assetId);
  }, [assetId, getAssetInfo]);

  const { marker, holdingAccount, supply, mintable, holderCount, txnCount, markerStatus } = assetInfo;
  const summaryData = [
    { title: 'Asset Name', value: marker },
    { title: 'Holding Account', value: holdingAccount, link: `/accounts/${holdingAccount}`, copy: holdingAccount },
    { title: 'Supply', value: numberFormat(supply, 3, { shorthand: true }) },
    { title: 'Mintable', value: `${mintable}` },
    { title: 'Holders', value: holderCount },
    { title: 'Transactions', value: numberFormat(txnCount) },
    { title: 'Marker Status', value: capitalize(markerStatus) },
  ];

  return <Content title="Asset Information">{assetInfoLoading ? <Loading /> : <Summary data={summaryData} />}</Content>;
};

export default AssetInformation;
