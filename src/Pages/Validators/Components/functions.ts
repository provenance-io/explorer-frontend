import { Coin } from '@cosmjs/stargate';
import { cosmos, provenance } from '@provlabs/provenancejs';
import { MsgDelegate } from '@provlabs/provenancejs/cosmos/staking/v1beta1/tx';
import { Payment } from '@provlabs/provenancejs/provenance/exchange/v1/payments';

export function CreatePaymentMessage(
  source: string,
  sourceAmount: Coin,
  target: string,
  targetAmount: Coin,
  externalID: string
) {
  const { createPayment } = provenance.exchange.v1.MessageComposer.withTypeUrl;
  const msg = createPayment({
    payment: {
      source,
      sourceAmount: [sourceAmount],
      target,
      targetAmount: [targetAmount],
      externalId: externalID,
    },
  });
  return msg;
}

export function CreateAcceptPaymentMessage(
  source: string,
  sourceAmount: Coin,
  target: string,
  targetAmount: Coin,
  externalID: string
) {
  const { acceptPayment } = provenance.exchange.v1.MessageComposer.withTypeUrl;
  const msg = acceptPayment({
    payment: {
      source,
      sourceAmount: sourceAmount ? [sourceAmount] : [],
      target,
      targetAmount: targetAmount ? [targetAmount] : [],
      externalId: externalID,
    },
  });
  return msg;
}

export function CreateDelegateMessage(msg: MsgDelegate) {
  const typeUrl = cosmos.staking.v1beta1.MsgDelegate.typeUrl;
  return { typeUrl, value: cosmos.staking.v1beta1.MsgDelegate.toAmino(msg) };
}

export function CreateRejectPaymentMessage(source: string, target: string, externalId: string) {
  const { rejectPayment } = provenance.exchange.v1.MessageComposer.withTypeUrl;
  const msg = rejectPayment({
    target,
    source,
    externalId,
  });
  return msg;
}

export function CreateDefaultPayment() {
  return {
    source: '',
    sourceAmount: [
      {
        denom: '',
        amount: '',
      },
    ],
    target: '',
    targetAmount: [
      {
        denom: '',
        amount: '',
      },
    ],
    externalId: '',
  };
}

export function ClonePayment(payment: Payment) {
  const clonedPayment: Payment = JSON.parse(JSON.stringify(payment));
  return clonedPayment;
}
