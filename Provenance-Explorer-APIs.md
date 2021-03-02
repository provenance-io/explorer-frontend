# Provenance Explorer V2 API Endpoints
  - _Updated Tuesday March 2nd ~12:15pm MST_
## Contents
  * [Pages](#pages)
  * [APIs with missing data](#list-of-apis-with-missing-data)
  * [All APIs](#apis)
## Pages
  * [Account Details](#account-details-accountsaddress)
  * [Asset Details](#asset-details-assetassetid)
  * [Assets List](#assets-list-assetsall)
  * [Block Details](#block-details-blockblockheight)
  * [Blocks List](#blocks-list-blocks)
  * [Dashboard](#dashboard)
  * [Transaction Details](#transaction-details-txtxhash)
  * [Transactions List](#transactions-list-txs)
  * [Validator Details](#validator-details-validatorvalidatorid)
  * [Validators List](#validators-list-validators)
### Account Details (/accounts/{address})
  * [/accounts/{address}](#accountsaddress)
  * [/accounts/{address}/txs](#accountsaddresstxs)
### Asset Details (/asset/{assetId})
  * [/assets/{id}/detail](#assetsiddetail)
  * [/assets/{id}/holders](#assetsidholders)
  * [/assets/{id}/txs](#assetsidtxs)
### Assets List (/assets/all)
  * [/assets/all](#assetsall)
### Block Details (/block/{blockHeight})
  * [/blocks/height](#blocksheight)
  * [/blocks/height/{height}](#blocksheightheight)
  * [/validators/height/{height}](#validatorsheightheight)
  * [/txs/height/{height}](#txsheightheight)
### Blocks List (/blocks)
  * [/blocks/height](#blocksheight)
  * [/blocks/recent](#blocksrecent)
### Dashboard (/)
  * [/spotlight](#spotlight)
  * [/validators/recent](#validatorsrecent)
  * [/txs/history](#txshistory)
  * [/txs/recent](#txsrecent)
  * [/blocks/recent](#blocksrecent)
### Transaction Details (/tx/{txHash})
  * [/txs/{hash}](#txshash)
  * [/txs/{hash}/json](#txshashjson)
### Transactions List (/txs)
  * [/txs/recent](#txsrecent)
### Validator Details (/validator/{validatorId})
  * [/validators/{id}](#validatorsid)
  * [/validators/{id}/commission](#validatorsidcommission)
  * [/validators/{id}/delegations](#validatorsiddelegations)
  * [/validators/{id}/delegations/unbonded](#validatorsiddelegationsunbonded)
  * [/validators/{id}/delegations/txs](#validatorsiddelegationstxs)
  * [/validators/{id}/txs](#validatorsidtxs)
### Validators List (/validators)
  * [/validators/recent](#validatorsrecent)

## List of APIs with missing data
  * [/accounts/{address}/txs](#accountsaddresstxs) (Issue Created)
  * [/assets/all](#assetsall) (Issue Created)
  * [/assets/{id}/detail](#assetsiddetail) (Issue Created)
  * [/assets/{id}/holders](#assetsidholders) (Issue Created)
  * [/assets/{id}/txs](#assetsidtxs) (Issue Created)
  * [/blocks/height/{height}](#blocksheightheight) (Issue Created)
  * [/txs/height/{height}](#txsheightheight) (Issue Created)
  * [/txs/recent](#txsrecent) (Issue Created)
  * [/validators/{id}](#validatorsid) (Issue Created)
  * [/validators/recent](#validatorsrecent) (Issue Created)
  * [/validators/{id}/commission](#validatorsidcommission) (Issue Created)
  * [/validators/{id}/delegations](#validatorsiddelegations) (Issue Created)
  * [/validators/{id}/delegations/unbonded](#validatorsiddelegationsunbonded) (Issue Created)
  * [/validators/{id}/delegations/txs](#validatorsiddelegationstxs) (Issue Created)
  * [/validators/{id}/txs](#validatorsidtxs) (Issue Created)

## APIs
  ### Accounts
  * [/accounts/{address}](#accountsaddress)
  * [/accounts/{address}/txs](#accountsaddresstxs)
  ### Assets
  * [/assets/all](#assetsall)
  * [/assets/{id}/detail](#assetsiddetail)
  * [/assets/{id}/holders](#assetsidholders)
  * [/assets/{id}/txs](#assetsidtxs)
  ### Blocks
  * [/blocks/recent](#blocksrecent)
  * [/blocks/height](#blocksheight)
  * [/blocks/height/{height}](#blocksheightheight)
  * [/spotlight](#spotlight)
  ### Spotlight
  * [/spotlight](#spotlight)
  ### Transactions
  * [/txs/{hash}](#txshash)
  * [/txs/{hash}/json](#txshashjson)
  * [/txs/height/{height}](#txsheightheight)
  * [/txs/history](#txshistory)
  * [/txs/recent](#txsrecent)
  ### Validators
  * [/validators/height/{height}](#validatorsheightheight)
  * [/validators/{id}](#validatorsid)
  * [/validators/{id}/commission](#validatorsidcommission)
  * [/validators/{id}/delegations](#validatorsiddelegations)
  * [/validators/{id}/delegations/unbonded](#validatorsiddelegationsunbonded)
  * [/validators/{id}/delegations/txs](#validatorsiddelegationstxs)
  * [/validators/{id}/txs](#validatorsidtxs)
  * [/validators/recent](#validatorsrecent)

### /accounts/{address}
| Data | Type | Status |
| --- | --- | --- |
|accountNumber | number | done |
|accountType | string | done |
|address | string | done |
|balances | array | done |
|balances.denom | string | done |
|balances.amount | string | done |
|publicKey | object | done |
|publicKey.key | string | done |
|publicKey.type | string | done |
|sequence | number | done |

### /accounts/{address}/txs
[Github Issue](https://github.com/provenance-io/explorer-service/issues/11)
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | **missing** |
| count | count per page returned | **missing** |
| sort | order returned | **missing** |

| Data | Type | Status |
| --- | --- | --- |
|txHash | string | **missing** |
|block | number | **missing** |
|from | string | **missing** |
|amount | number | **missing** |
|amountDenomination | string | **missing** |
|to | string | **missing** |
|txType | string | **missing** |
|fee | number | **missing** |
|feeDenomination | string | **missing** |
|signer | string | **missing** |
|status | string | **missing** |
|timestamp | string | **missing** |

### /assets/all
[Github Issue](https://github.com/provenance-io/explorer-service/issues/12)
| Data | Type | Status |
| --- | --- | --- |
| marker | string | done |
| circulation | number | done |
| totalSupply | string | done |
| ownerAddress | number | done |
| price | number | **missing** |
| priceChange | number | **missing** |

### /assets/{id}/detail
[Github Issue](https://github.com/provenance-io/explorer-service/issues/12)
| Data | Type | Status |
| --- | --- | --- |
| marker | string | done |
| holderCount | number | done |
| ownerAddress | string | done |
| totalSupply | number | done |
| mintable | boolean | done |
| price | number | **missing** |
| priceChange | number | **missing** |
| txnCount | number | **missing** |
| website | string | **missing** |

### /assets/{id}/holders
[Github Issue](https://github.com/provenance-io/explorer-service/issues/12)
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | **missing** |
| count | count per page returned | **missing** |
| sort | order returned | **missing** |

| Data | Type | Status |
| --- | --- | --- |
| ownerAddress | string | done |
| balance | number | done |
| percentage | number | done |

### /assets/{id}/txs
[Github Issue](https://github.com/provenance-io/explorer-service/issues/12)
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | **missing** |
| count | count per page returned | **missing** |
| sort | order returned | **missing** |

| Data | Type | Status |
| --- | --- | --- |
| txHash | string | **missing** |
| txType | string | **missing** |
| address | string | **missing** |
| value | number | **missing** |
| currency | string | **missing** |
| age | string | **missing** |

### /blocks/recent 
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | done |
| count | count per page returned | done |
| sort | order returned | done |

| Data | Type | Status |
| --- | --- | --- |
| pages | number | done |
| results | array | done |
| results.height | number | done |
| results.proposerAddress | string | done |
| results.time | string | done |
| results.txNum | number | done |
| results.validatorsNum | number | done |
| results.validatorstotal | number | done |
| results.votingPower | number | done |

### /blocks/height
| Data | Type | Status |
| --- | --- | --- |
| height | number | done |
| hash | string | done |
| icon | string | done |
| moniker | string | done |
| numValidators | number | done |
| proposerAddress | string | done |
| time | string | done |
| txNum | number | done |
| votingPower | number | done |

### /blocks/height/{height}
[Github Issue](https://github.com/provenance-io/explorer-service/issues/13)
| Data | Type | Status |
| --- | --- | --- |
| hash | string | done |
| height | number | done |
| icon | string | done |
| inflation | string | **missing** |
| inflationDenomination | string | **missing** |
| moniker | string | done |
| numValidators | number | done |
| numValidatorsTotal | number | **missing** |
| proposerAddress | string | done |
| time | string | done |
| txNum | number | done |
| votingPower | number | done |

### /spotlight
| Data | Type | Status |
| --- | --- | --- |
| avgBlockTime | number | done |
| bondedTokenAmount | number | done |
| bondedTokenPercet | number | done |
| bondedTokenTotal | number | done |
| latestBlock | shape | done |
| latestBlock.hash | string | done |
| latestBlock.height | number | done |
| latestBlock.icon | string | done |
| latestBlock.moniker | string | done |
| latestBlock.numValidators | number | done |
| latestBlock.proposerAddress | string | done |
| latestBlock.time | string | done |
| latestBlock.txNum | number | done |
| latestBlock.votingPower | number | done |

### /txs/{hash}
| Data | Type | Status |
| --- | --- | --- |
| fee | number | done |
| feeDenomination | string | done |
| gasLimit | number | done |
| gasPrice | number | done |
| gasUsed | number | done |
| gasWanted | number | done |
| height | number | done |
| memo | string | done |
| signer | string | done |
| status | string | done |
| time | string | done |
| amount | number | done |
| denomination | string | done |
| from | string | done |
| to | string | done |
| txType | string | done |

### /txs/{hash}/json
| Data | Type | Status |
| --- | --- | --- |
| code | **null** | done |
| codespace | **null** | done |
| gasUsed | string | done |
| gasWanted | string | done |
| height | string | done |
| timestamp | string | done |
| txhash | string | done |
| logs | array | done |
| logs.log | string | done |
| logs.msgIndex | number | done |
| logs.events | array | done |
| logs.events.type | string | done |
| logs.events.attributes | array | done |
| logs.events.attributes.key | string | done |
| logs.events.attributes.value | string | done |
| tx | string | done |
| tx.type | string | done |
| tx.value | object | done |
| tx.value.memo | string | done |
| tx.value.fee | object | done |
| tx.value.fee.gas | string | done |
| tx.value.fee.amount | array | done |
| tx.value.fee.amount.amount | string | done |
| tx.value.fee.amount.denom | string | done |
| tx.value.msg | array | done |
| tx.value.msg.type | string | done |
| tx.value.msg.value | object | done |
| tx.value.msg.value.contract | string | done |
| tx.value.msg.value.executionID | string | done |
| tx.value.msg.value.groupID | string | done |
| tx.value.msg.value.notary | string | done |
| tx.value.msg.value.scopeID | string | done |
| tx.value.msg.value.scopeRefID | string | done |
| tx.value.msg.value.signatures | string | done |
| tx.value.signatures | array | done |
| tx.value.signatures.signature | string | done |
| tx.value.signatures.pubKey | object | done |
| tx.value.signatures.pubKey.type | string | done |
| tx.value.signatures.pubKey.value | string | done |

### /txs/height/{height}
[Github Issue](https://github.com/provenance-io/explorer-service/issues/14)
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | **missing** |
| count | count per page returned | **missing** |

| Data | Type | Status |
| --- | --- | --- |
| txHash | string | **missing** |
| txType |string | done |
| fee | number | done |
| feeDenomination | string | done |
| signer | string | done |

### /txs/history
| Param | Description | Status |
| --- | --- | --- |
| toDate | txs up to this date | done | 
| fromDate | txs from this date | done | 
| granularity | txs based on hour/day | done | 

| Data | Type | Status |
| --- | --- | --- |
| [array] | array | done |
| [array].date | string | done |
| [array].numberTxs | number | done |

### /txs/recent
[Github Issue](https://github.com/provenance-io/explorer-service/issues/14)
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | done |
| count | count per page returned | done |
| sort | order returned | done |
| type | type of transaction | **missing** |
| status | transaction status | **missing** |
| toDate | txs up to this date | **missing** |
| fromDate | txs from this date | **missing** |

| Data | Type | Status |
| --- | --- | --- |
| pages | number | done |
| results | array | done |
| results.blockHeight | number | done |
| results.codespace | **null** | done |
| results.denomination | number | done |
| results.errorCode | **null** | done |
| results.fee | number | done |
| results.signer | string | done |
| results.status | string | done |
| results.time | string | done |
| results.txHash | string | done |
| results.type | string | done |

### /validators/height/{height}
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | done |
| count | count per page returned | done |
| sort | order returned | done |

| Data | Type | Status |
| --- | --- | --- |
| moniker | string | done |
| operator | string | done |
| consensusAddress | string | done |
| proposerPriority | number | done |
| votingPower | number | done |

### /validators/{id}
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Data | Type | Status |
| --- | --- | --- |
| bondHeight | number | done |
| consensusPubKey | string | done |
| missedBlocks | number | done |
| moniker | string | done |
| operatorAddress | string | done |
| ownerAddress | string | done |
| totalBlocks | number | done |
| uptime | number | done |
| votingPower | number | done |
| votingPowerPercent | number | done |
| image | string | **missing** |
| description | string | **missing** |
| url | string | **missing** |

### /validators/{id}/commission
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Data | Type | Status |
| --- | --- | --- |
| commissionRate | number | **missing** |
| bondedTokens | number | **missing** |
| bondedTokensDenomination | string | **missing** |
| selfBonded | number | **missing** |
| selfBondedDenomination | string | **missing** |
| selfBondedPercent | number | **missing** |
| delegatorBonded | number | **missing** |
| delegatorBondedDenomination | string | **missing** |
| delegatorBondedPercent | number | **missing** |
| delegators | number | **missing** |
| totalShares | number | **missing** |
| commissionRewards | number | **missing** |
| commissionRewards denomination | string | **missing** |
| commissionRateRangeMin | number | **missing** |
| commissionRateRangeMax | number | **missing** |
| gasPriceMin | number | **missing** |
| gasPriceMax | number | **missing** |

### /validators/{id}/delegations
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Param | Description | Status |
| --- | --- | --- |
| sort | acending or decending order | **missing** | 
| page | current page of results | **missing** | 
| count | count per page returned | **missing** | 

| Data | Type | Status |
| --- | --- | --- |
| address | string | **missing** |
| amount | number | **missing** |
| amountDenomination | string | **missing** |
| shares | number | **missing** |

### /validators/{id}/delegations/unbonded
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Param | Description | Status |
| --- | --- | --- |
| sort | acending or decending order | **missing** | 
| page | current page of results | **missing** | 
| count | count per page returned | **missing** | 

| Data | Type | Status |
| --- | --- | --- |
| address | string | **missing** |
| amount | number | **missing** |
| block | number | **missing** |
| end time | string | **missing** |

### /validators/{id}/delegations/txs
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Param | Description | Status |
| --- | --- | --- |
| sort | acending or decending order | **missing** | 
| page | current page of results | **missing** | 
| count | count per page returned | **missing** | 

| Data | Type | Status |
| --- | --- | --- |
| txHash | string | **missing** |
| block | number | **missing** |
| from | string | **missing** |
| amount | number | **missing** |
| amountDenomination | string | **missing** |
| to | string | **missing** |
| txType | string | **missing** |
| fee | number | **missing** |
| feeDenomination | string | **missing** |
| signer | string | **missing** |
| status | string | **missing** |
| timestamp | string | **missing** |

### /validators/{id}/txs
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Param | Description | Status |
| --- | --- | --- |
| sort | acending or decending order | **missing** | 
| page | current page of results | **missing** | 
| count | count per page returned | **missing** | 

| Data | Type | Status |
| --- | --- | --- |
| txHash | string | **missing** |
| block | number | **missing** |
| moniker | string | **missing** |
| operator | string | **missing** |
| selfBonded | number | **missing** |
| selfBondedPercent | number | **missing** |
| txType | string | **missing** |
| fee | number | **missing** |
| feeDenomination | string | **missing** |
| signer | string | **missing** |
| status | string | **missing** |
| timestamp | string | **missing** |

### /validators/recent
[Github Issue](https://github.com/provenance-io/explorer-service/issues/15)
| Param | Description | Status |
| --- | --- | --- |
| sort | acending or decending order | done | 
| page | current page of results | done | 
| count | count per page returned | done | 
| status | active, jailed, candidate | **missing** | 

| Data | Type | Status |
| --- | --- | --- |
| pages | number | done |
| results | array | done |
| results.addressId | string | done |
| results.bondHeight | number | done |
| results.bondedTokens | number | done |
| results.bondedTokensDenomination | string | done |
| results.commission | number | done |
| results.consensusAddress | string | done |
| results.delegators | number | done |
| results.moniker | string | done |
| results.proposerPriority | number | done |
| results.selfBonded | number | done |
| results.selfBondedDenomination | string | done |
| results.uptime | number | done |
| results.votingPower | number | done |
| results.votingPowerPercent | number | done |
