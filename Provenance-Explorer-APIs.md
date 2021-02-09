# Provenance Explorer V2 API Endpoints
  - _Updated Tuesday Feb 9th ~3:45pm MST_
## Contents
  * [Pages](#pages)
  * [APIs with missing data](#list-of-apis-with-missing-data)
  * [All APIs](#apis)
## Pages
  * [Account Details](#account-details-accountsaddress)
  * [Asset Details](#asset-details-assetsassetid)
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
### Asset Details (/assets/{assetId})
  * [/assets/{id}/detail](#assetsiddetail)
  * [/assets/{id}/holders](#assetsidholders)
  * [/asset/{id}/txs](#assetidtxs)
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
  * [/accounts/{address}](#accountsaddress)
  * [/accounts/{address}/txs](#accountsaddresstxs)
  * [/assets/{id}/detail](#assetsiddetail)
  * [/assets/{id}/holders](#assetsidholders)
  * [/asset/{id}/txs](#assetidtxs)
  * [/blocks/height/{height}](#blocksheightheight)
  * [/txs/{hash}](#txshash)
  * [/txs/{hash}/json](#txshashjson)
  * [/txs/height/{height}](#txsheightheight)
  * [/txs/recent](#txsrecent)
  * [/validators/height/{height}](#validatorsheightheight)
  * [/validators/{id}](#validatorsid)
  * [/validators/recent](#validatorsrecent)
  * [/validators/{id}/commission](#validatorsidcommission)
  * [/validators/{id}/delegations](#validatorsiddelegations)
  * [/validators/{id}/delegations/unbonded](#validatorsiddelegationsunbonded)
  * [/validators/{id}/delegations/txs](#validatorsiddelegationstxs)
  * [/validators/{id}/txs](#validatorsidtxs)

## APIs
  ### Accounts
  * [/accounts/{address}](#accountsaddress)
  * [/accounts/{address}/txs](#accountsaddresstxs)
  ### Assets
  * [/assets/{id}/detail](#assetsiddetail)
  * [/assets/{id}/holders](#assetsidholders)
  * [/asset/{id}/txs](#assetidtxs)
  ### Blocks
  * [/blocks/recent](#blocksrecent)
  * [/blocks/currentHeight](#blockscurrentheight)
  * [/blocks/height/{height}](#blocksheightheight)
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
|address | string | **missing** |
|token | string | **missing** |
|amount | number | **missing** |
|amountDenomination | string | **missing** |
|balance | number | **missing** |
|balanceDenomination | string | **missing** |
|delegated | number | **missing** |
|delegatedDenomination | string | **missing** |
|unbonding | number | **missing** |
|unbondingDenomination | string | **missing** |
|rewards | number | **missing** |
|rewardsDenomination | string | **missing** |

### /accounts/{address}/txs
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

### /assets/{id}/detail
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

### /asset/{id}/txs
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
| fee | number | **missing** |
| feeDenomination | string | **missing** |
| gasLimit | number | **missing** |
| gasPrice | number | **missing** |
| gasUsed | number | **missing** |
| gasWanted | number | **missing** |
| height | number | **missing** |
| memo | string | **missing** |
| signer | string | **missing** |
| status | string | **missing** |
| time | string | **missing** |
| amount | number | **missing** |
| denomination | string | **missing** |
| from | string | **missing** |
| to | string | **missing** |
| txType | string | **missing** |

### /txs/{hash}/json
| Data | Type | Status |
| --- | --- | --- |
| code | **null** | **missing** |
| codespace | **null** | **missing** |
| gasUsed | string | **missing** |
| gasWanted | string | **missing** |
| height | string | **missing** |
| timestamp | string | **missing** |
| txhash | string | **missing** |
| logs | array | **missing** |
| logs.log | string | **missing** |
| logs.msgIndex | number | **missing** |
| logs.events | array | **missing** |
| logs.events.type | string | **missing** |
| logs.events.attributes | array | **missing** |
| logs.events.attributes.key | string | **missing** |
| logs.events.attributes.value | string | **missing** |
| tx | string | **missing** |
| tx.type | string | **missing** |
| tx.value | object | **missing** |
| tx.value.memo | string | **missing** |
| tx.value.fee | object | **missing** |
| tx.value.fee.gas | string | **missing** |
| tx.value.fee.amount | array | **missing** |
| tx.value.fee.amount.amount | string | **missing** |
| tx.value.fee.amount.denom | string | **missing** |
| tx.value.msg | array | **missing** |
| tx.value.msg.type | string | **missing** |
| tx.value.msg.value | object | **missing** |
| tx.value.msg.value.contract | string | **missing** |
| tx.value.msg.value.executionID | string | **missing** |
| tx.value.msg.value.groupID | string | **missing** |
| tx.value.msg.value.notary | string | **missing** |
| tx.value.msg.value.scopeID | string | **missing** |
| tx.value.msg.value.scopeRefID | string | **missing** |
| tx.value.msg.value.signatures | string | **missing** |
| tx.value.signatures | array | **missing** |
| tx.value.signatures.signature | string | **missing** |
| tx.value.signatures.pubKey | object | **missing** |
| tx.value.signatures.pubKey.type | string | **missing** |
| tx.value.signatures.pubKey.value | string | **missing** |

### /txs/height/{height}
| Data | Type | Status |
| --- | --- | --- |
| txHash | string | **missing** |
| txType |string | **missing** |
| fee | number | **missing** |
| feeDenomination | string | **missing** |
| signer | string | **missing** |

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
| results.blockHeight | number | **missing** |
| results.codespace | **null** | **missing** |
| results.denomination | number | **missing** |
| results.errorCode | **null** | **missing** |
| results.fee | number | **missing** |
| results.signer | string | **missing** |
| results.status | string | **missing** |
| results.time | string | **missing** |
| results.txHash | string | **missing** |
| results.type | string | **missing** |

### /validators/height/{height}
| Param | Description | Status |
| --- | --- | --- |
| page | current page of results | done |
| count | count per page returned | done |
| sort | order returned | done |

| Data | Type | Status |
| --- | --- | --- |
| moniker | string | **missing** |
| operator | string | **missing** |
| consensusAddress | string | **missing** |
| proposerPriority | number | **missing** |
| votingPower | number | **missing** |

### /validators/{id}
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
| block | number | **missing** |

### /validators/{id}/delegations/unbonded
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
