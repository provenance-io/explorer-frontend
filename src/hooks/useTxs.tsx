import { cosmos } from '@provlabs/provenancejs';
import { useChain } from '@cosmos-kit/react';
import { Coin, DeliverTxResponse, isDeliverTxSuccess, StdFee } from '@cosmjs/stargate';

export type Msg = {
  typeUrl: string;
  value: { [key: string]: any };
};

export type TxOptions = {
  gas?: StdFee;
  fee?: Coin;
}

export class TxError extends Error {
  constructor(message: string = 'Tx Error', options?: ErrorOptions) {
    super(message, options);
    this.name = 'TxError';
  }
}

export class TxResult {
  error?: TxError
  response?: DeliverTxResponse

  constructor({ error, response }: Pick<TxResult, 'error' | 'response'>) {
    this.error = error;
    this.response = response;
  }

  get errorMsg() {
    return this.isOutOfGas
      ? `Out of gas. gasWanted: ${this.response?.gasWanted} gasUsed: ${this.response?.gasUsed}`
      : this.error?.message || 'Swap Failed';
  }

  get isSuccess() {
    return this.response && isDeliverTxSuccess(this.response);
  }

  get isOutOfGas() {
    return this.response && this.response.gasUsed > this.response.gasWanted;
  }
}

export function useTx(chainName: string) {
  const { address, estimateFee, getSigningStargateClient } = useChain(chainName);

  async function tx(msgs: Msg[], options: TxOptions = {}) {
    if (!address) {
      return new TxResult({ error: new TxError('Wallet not connected') });
    }

    try {
      const txRaw = cosmos.tx.v1beta1.TxRaw;
      //update multiplier to 1.675 to help with out-of-gas issues
      const fee = options.gas || await estimateFee(msgs, undefined, undefined, 1.7);
      console.log(`options: ${JSON.stringify(options)} calculated fee: ${JSON.stringify(fee)}`);

      const client = await getSigningStargateClient();
      const signed = await client.sign(address, msgs, fee, '');

      if (!client) return new TxResult({ error: new TxError('Invalid stargate client') });
      if (!signed) return new TxResult({ error: new TxError('Invalid transaction') });

      const response: any = await client.broadcastTx(Uint8Array.from(txRaw.encode(signed).finish()));
      return isDeliverTxSuccess(response)
        ? new TxResult({ response })
        : new TxResult({ response, error: new TxError(response.rawLog) });
    } catch (e: any) {
      console.error(e);
      if(e.codespace === 'sdk') {
        return new TxResult({ error: new TxError(e.log || 'Tx Error') });
      }
      return new TxResult({ error: new TxError(e.message || 'Tx Error') });
    }
  }

  return { tx }
}
