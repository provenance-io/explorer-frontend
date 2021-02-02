import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAddress } from 'redux/hooks';
import { Content, Section, CopyValue, Sprite } from 'Components';

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

const AddressSpotlight = () => {
  const { getAddressInfo, addressInfo } = useAddress();
  const { addressId } = useParams();

  useEffect(() => {
    getAddressInfo(addressId);
  }, [getAddressInfo, addressId]);

  const {
    token = '[N/A]',
    totalAmount = '[N/A]',
    balance = '[N/A]',
    delegated = '[N/A]',
    unbonding = '[N/A]',
    rewards = '[N/A]',
  } = addressInfo;

  return (
    <Section>
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
            <Title>Token:</Title>
            <Value>{token}</Value>
          </Row>
          <Row>
            <Title>Total Amount:</Title>
            <Value>
              {totalAmount} {token}
            </Value>
          </Row>
        </Column>
        <Column flexBasis="45%">
          <Row>
            <Title>Balance:</Title>
            <Value>
              {balance} {token}
            </Value>
          </Row>
          <Row>
            <Title>Delegated:</Title>
            <Value>
              {delegated} {token}
            </Value>
          </Row>
          <Row>
            <Title>UnBonding:</Title>
            <Value>
              {unbonding} {token}
            </Value>
          </Row>
          <Row>
            <Title>Rewards:</Title>
            <Value>
              {rewards} {token}
            </Value>
          </Row>
        </Column>
      </Content>
    </Section>
  );
};

export default AddressSpotlight;
