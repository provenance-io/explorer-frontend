import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Content, Summary, Loading } from 'Components';
import { capitalize, currencyFormat, formatDenom, numberFormat } from 'utils';
import { useAssets } from 'redux/hooks';

const ConversionWrapper = styled.div`
  white-space: nowrap;
`;

const AssetInformation = () => {
  const [showConversion, setShowConversion] = useState(false);
  const { assetId } = useParams();
  const {
    getAssetInfo,
    assetInfo,
    totalBalancePrice,
    assetInfoLoading,
    assetMetadata: allMetadata,
  } = useAssets();

  useEffect(() => {
    getAssetInfo(assetId);
  }, [assetId, getAssetInfo]);

  const {
    marker,
    holdingAccount,
    supply: { amount: supplyAmount, denom: supplyDenom } = {},
    mintable,
    holderCount,
    txnCount,
    markerStatus,
    markerType,
    tokens: { fungibleCount, nonFungibleCount } = {},
  } = assetInfo;

  const assetMetadata = allMetadata.find(md => md.base === marker);
  const displayDenom = assetMetadata?.display || marker;
  const exponent =
    assetMetadata?.denomUnits.find(d => d.denom === assetMetadata?.display)?.exponent || 0;

  const { amount: conversionAmount, denom: conversionDenom } = currencyFormat(
    1,
    displayDenom,
    true
  );

  let pricePerToken = assetInfo?.supply?.pricePerToken?.amount || '-- --';
  if (exponent && pricePerToken !== '-- --') pricePerToken = pricePerToken * 10 ** exponent;
  const priceDenom = assetInfo?.supply?.pricePerToken?.denom || '-- --';

  const popupNoteConversion = {
    visibility: { visible: showConversion, setVisible: setShowConversion },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        hideTitle: true,
        title: 'Conversion:',
        value: (
          <ConversionWrapper>
            1 {displayDenom} = {conversionAmount} {conversionDenom}
          </ConversionWrapper>
        ),
      },
    ],
  };

  const summaryData = [
    {
      title: 'Asset Name',
      value: assetMetadata?.display || marker,
    },
    {
      title: 'Holding Account',
      value: holdingAccount,
      link: `/accounts/${holdingAccount}`,
      copy: holdingAccount,
    },
    {
      title: 'Supply',
      value: formatDenom(supplyAmount, supplyDenom, {
        decimals: 3,
        shorthand: true,
        showDenom: false,
      }),
    },
    { title: 'Mintable', value: `${mintable}` },
    { title: 'Min Unit', value: marker, popupNote: popupNoteConversion },
    { title: 'Decimal', value: exponent },
    { title: 'Holders', value: holderCount },
    { title: 'Transactions', value: numberFormat(txnCount) },
    { title: 'Marker Status', value: capitalize(markerStatus) },
    { title: 'Marker Type', value: capitalize(markerType) },
    { title: 'Fungible Tokens', value: numberFormat(fungibleCount) },
    {
      title: 'Non-Fungible Tokens',
      value: numberFormat(nonFungibleCount),
      link: `/nfts/${holdingAccount}`,
    },
    {
      title: 'Price Per Unit',
      value:
        pricePerToken === '-- --'
          ? pricePerToken
          : `$${formatDenom(pricePerToken, priceDenom, { decimal: 2, minimumFractionDigits: 2 })}`,
    },
    {
      title: 'Total Value',
      value: totalBalancePrice === '-- --' ? totalBalancePrice : `$${totalBalancePrice}`,
    },
  ];

  return (
    <Content title="Asset Information">
      {assetInfoLoading ? <Loading /> : <Summary data={summaryData} />}
    </Content>
  );
};

export default AssetInformation;
