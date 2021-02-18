import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { AssetInformation, AssetTxsList, AssetHolders } from './Components';

const Assets = () => {
  const { assetId } = useParams();

  return (
    <Wrapper>
      <Header title="Asset Details" value={assetId} copyValue={assetId} copyTitle={`Copy Asset Name ${assetId}`} />
      <Section header>
        <AssetInformation />
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
