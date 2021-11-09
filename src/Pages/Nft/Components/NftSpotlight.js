import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNft } from 'redux/hooks';
import { Content, Loading, Summary } from 'Components';

const NftSpotlight = () => {
  const { addr } = useParams();
  const { getNftDetail, nftDetailLoading, nftDetail } = useNft();

  useEffect(() => {
    if (addr) {
      getNftDetail(addr);
    }
  }, [addr, getNftDetail]);

  const getValue = val => ({ value: val || '--' });

  const summaryData = [
    { title: 'Name', ...getValue(nftDetail?.description?.name) },
    { title: 'Description', ...getValue(nftDetail?.description?.description) },
    { title: 'Website', ...getValue(nftDetail?.description?.websiteUrl) },
    { title: 'Scope Address', ...getValue(nftDetail?.scopeAddr) },
    { title: 'Spec Name', ...getValue(nftDetail?.specName) },
    { title: 'Spec Address', ...getValue(nftDetail?.specAddr) },
    { title: 'Value Owner', ...getValue(nftDetail?.valueOwner) },
  ];

  return nftDetailLoading ? (
    <Loading />
  ) : (
    <Content>
      <Summary data={summaryData} />
    </Content>
  );
};

export default NftSpotlight;
