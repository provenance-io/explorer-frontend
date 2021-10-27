import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useNft from 'redux/hooks/useNft';
import { Content } from 'Components';

const AccountNft = () => {
  const { addressId } = useParams();
  const { getNftsByOwner, nftByOwner } = useNft();

  useEffect(() => {
    getNftsByOwner(addressId);
  }, [addressId, getNftsByOwner]);

  useEffect(() => {
    console.log(nftByOwner);
  }, [nftByOwner]);

  return <Content>NFT Stuff</Content>;
};

export default AccountNft;
