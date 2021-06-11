import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAccounts, useAssets } from 'redux/hooks';
import { Content, CopyValue, Sprite, Loading } from 'Components';
import { isEmpty } from 'utils';

const Column = styled.div`
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
const Row = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
`;
const Title = styled.div`
  width: 160px;
`;
const Value = styled.div`
  display: flex;
`;
const TokenIcon = styled.div``;

const AccountSpotlight = () => {
  const { accountInfo, accountInfoLoading, getAccountAssets, getAccountInfo } = useAccounts();
  const { assetMetadata, getAssetMetadata } = useAssets();
  const { addressId } = useParams();

  useEffect(() => {
    getAccountAssets(addressId);
    getAccountInfo(addressId);
  }, [getAccountAssets, getAccountInfo, addressId]);

  useEffect(() => {
    if (isEmpty(assetMetadata)) {
      getAssetMetadata();
    }
  }, [assetMetadata, getAssetMetadata]);

  const {
    accountName = '--',
    accountNumber = '--',
    accountType = '--',
    publicKeys = {},
    sequence = '--',
  } = accountInfo;
  const publicKey = publicKeys.signers ? publicKeys.signers[0] : '';

  return (
    <Content justify="flex-start">
      {accountInfoLoading ? (
        <Loading />
      ) : (
        <>
          <Column flexBasis="10%">
            <TokenIcon>{<Sprite size="8rem" icon="HASH" />}</TokenIcon>
          </Column>
          <Column flexBasis="90%">
            <Column flexBasis="45%">
              <Row>
                <Title>Address:</Title>
                <Value title={addressId}>
                  {addressId}
                  <CopyValue value={addressId} title="Copy Address" />
                </Value>
              </Row>
              <Row>
                <Title>Account Type:</Title>
                <Value>{accountType}</Value>
              </Row>
              <Row>
                <Title>Account Name:</Title>
                <Value>{accountName || '--'}</Value>
              </Row>
              <Row>
                <Title>Account Number:</Title>
                <Value>{accountNumber}</Value>
              </Row>
            </Column>
            <Column flexBasis="45%">
              <Row>
                <Title>Public Key:</Title>
                <Value>
                  {publicKey ? (
                    <>
                      {publicKey}
                      <CopyValue value={publicKey} title="Copy Public Key" />
                    </>
                  ) : (
                    '--'
                  )}
                </Value>
              </Row>
              <Row>
                <Title>Sequence:</Title>
                <Value>{sequence}</Value>
              </Row>
            </Column>
          </Column>
        </>
      )}
    </Content>
  );
};

export default AccountSpotlight;
