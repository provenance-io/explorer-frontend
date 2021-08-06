import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAccounts, useMediaQuery } from 'redux/hooks';
import {
  Content,
  CopyValue,
  DataRow as Row,
  DataTitle as Title,
  DataValue as Value,
  Sprite,
  Loading,
} from 'Components';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';

const Column = styled.div`
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const TokenIcon = styled.div``;

const AccountSpotlight = () => {
  const { accountInfo, accountInfoLoading, getAccountAssets, getAccountInfo } = useAccounts();
  const { addressId } = useParams();
  const { matches } = useMediaQuery(breakpoints.down('sm'));

  useEffect(() => {
    getAccountAssets(addressId);
    getAccountInfo(addressId);
  }, [getAccountAssets, getAccountInfo, addressId]);

  const {
    accountName = '--',
    accountNumber = '--',
    accountType = '--',
    publicKeys = {},
    sequence = '--',
  } = accountInfo;
  const publicKey = publicKeys.signers ? publicKeys.signers[0] : '';

  // TODO: Refactor to use Summary component

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
            <Column flexBasis="40%">
              <Row>
                <Title>Address:</Title>
                <Value title={addressId}>
                  {matches ? maxLength(addressId, 20, 3) : addressId}
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
            <Column flexBasis="40%">
              <Row>
                <Title>Public Key:</Title>
                <Value>
                  {publicKey ? (
                    <>
                      {matches ? maxLength(publicKey, 20, 3) : publicKey}
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
