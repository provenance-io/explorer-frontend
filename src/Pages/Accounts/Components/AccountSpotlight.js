import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import { Content, CopyValue, Sprite } from 'Components';

const Column = styled.div`
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Title = styled.div`
  width: 160px;
`;
const Value = styled.div`
  display: flex;
`;
const TokenIcon = styled.div``;

const AccountSpotlight = () => {
  const { getAccountInfo, accountInfo } = useAccounts();
  const { addressId } = useParams();

  useEffect(() => {
    getAccountInfo(addressId);
  }, [getAccountInfo, addressId]);

  const { accountType = '[N/A]', publicKey = '[N/A]', accountNumber = '[N/A]', sequence = '[N/A]' } = accountInfo;

  return (
    <Content justify="flex-start">
      <Column flexBasis="10%">
        <TokenIcon>{<Sprite size="8rem" icon="HASH" />}</TokenIcon>
      </Column>
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
          <Title>Account Number:</Title>
          <Value>{accountNumber}</Value>
        </Row>
      </Column>
      <Column flexBasis="45%">
        <Row>
          <Title>Public Key:</Title>
          <Value>
            {publicKey?.key ? (
              <>
                {publicKey.key}
                <CopyValue value={publicKey.key} title="Copy Public Key" />
              </>
            ) : (
              'N/A'
            )}
          </Value>
        </Row>
        <Row>
          <Title>Public Key Type:</Title>
          <Value>
            {publicKey?.['@type'] ? (
              <>
                {publicKey['@type']}
                <CopyValue value={publicKey['@type']} title="Copy Public Key" />
              </>
            ) : (
              'N/A'
            )}
          </Value>
        </Row>
        <Row>
          <Title>Sequence:</Title>
          <Value>{sequence}</Value>
        </Row>
      </Column>
    </Content>
  );
};

export default AccountSpotlight;
