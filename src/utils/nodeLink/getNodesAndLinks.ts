import Big from "big.js";
import { TxRecent } from "redux/features/tx/txSlice";

interface Node {
  id: string;
  name: string;
  symbolSize: number;
  value: number;
  category: number;
}

interface Link {
  source: string;
  target: string;
  lineStyle: {
    width: number;
  }
}

interface NodesAndLinksProps {
  data: TxRecent['results'];
  address: string;
}

export const getNodesAndLinks = ({ data, address }: NodesAndLinksProps) => {
    // First, find any/all other address in the first 100 transactions
    const otherAddresses: string[] = [];
    // Create a nodeArray with the first entity being the current address
    // By default the value will be length of txs (usually 100).
    const nodeArray: Node[] = [
      {
        id: '0',
        name: address,
        symbolSize: new Big(data.length).div(2).toNumber(),
        value: data.length,
        category: 0,
      },
    ];
    const linkArray: Link[] = [];
    data.forEach((tx) => {
      if (tx.feepayer.address !== address) {
        otherAddresses.push(tx.feepayer.address);
      }
      if (tx.signers.length > 1) {
        tx.signers.forEach((signer) => {
          if (signer.address !== address) otherAddresses.push(signer.address);
        });
      }
    });
    // Now that we have all other addresses, create the node and link arrays
    // First create an object with keys of unique address, and the count of each
    const addressCounts: { [key: string]: number } = {};
    for (const addr of otherAddresses) {
      addressCounts[addr] = addressCounts[addr] ? addressCounts[addr] + 1 : 1;
    }
    // Now loop through this object's keys to update the node and link
    Object.keys(addressCounts).forEach((addr, idx) => {
      nodeArray.push({
        id: `${idx + 1}`,
        name: addr,
        symbolSize: new Big(addressCounts[addr]).div(2).toNumber() < 25 ? 10 : 25,
        value: addressCounts[addr],
        category: 1,
      });
      for (let i = 0; i <= addressCounts[addr]; i++) {
        linkArray.push({
          source: `${idx + 1}`,
          target: '0',
          lineStyle: {
            width: new Big(addressCounts[addr]).div(3).toNumber()
          }
        });
      };
    });

    return ({
      nodeArray,
      linkArray
    })
};