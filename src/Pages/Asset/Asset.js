import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section, Wrapper, Header } from '../../Components';
import { useAssets } from '../../redux/hooks';
import { AssetHolders, AssetInformation, AssetTxsList, ManagingAccounts } from './Components';

const Assets = () => {
  const { assetMetadata, getAssetMetadata } = useAssets();
  const { assetId } = useParams();

  useEffect(() => {
    getAssetMetadata();
  }, [getAssetMetadata]);

  const assetName = assetMetadata.find((md) => md.base === assetId)?.display || assetId;

  return (
    <Wrapper>
      <Header
        title="Asset Details"
        value={assetName}
        copyValue={assetName}
        copyTitle={`Copy Asset Name ${assetName}`}
      />
      <Section header>
        <AssetInformation />
      </Section>
      <Section>
        <ManagingAccounts />
      </Section>
      <Section>
        <AssetHolders />
      </Section>
      <Section>
        <AssetTxsList />
      </Section>
    </Wrapper>
  );
};

export default Assets;
