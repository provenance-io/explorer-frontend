# CHANGELOG | <img src="./public/logo.svg" style="height: 36px; margin: 0 0 -7px 4px;" alt="Provenance Explorer"/>

## Unreleased

## 2.1.1 - 2021-07-30

### Release Name: Juan de Fuca

### Bug Fixes

- Fix some bugs in displaying proposal info [#171](https://github.com/provenance-io/explorer-frontend/issues/171)

## 2.1.0 - 2021-07-26

### Release Name: Xu Fu

### Features

- Create a filter dropdown in tx messages to filter by tx type (must have 2+ to show) [#127](https://github.com/provenance-io/explorer-frontend/issues/127)
- Add Governance redux actions, reducer and hook [#133](https://github.com/provenance-io/explorer-frontend/issues/133)
- Add Proposals List page [#134](https://github.com/provenance-io/explorer-frontend/issues/134)
- Add Gov link to global nav [#135](https://github.com/provenance-io/explorer-frontend/issues/135)
- Add proposal detail page and proposal info [#136](https://github.com/provenance-io/explorer-frontend/issues/136)
- Add proposal timing detail and progress bar [#137](https://github.com/provenance-io/explorer-frontend/issues/137)
- Add proposal voting detail and progress bar [#138](https://github.com/provenance-io/explorer-frontend/issues/138)
- Add proposol deposit card to detail page [#139](https://github.com/provenance-io/explorer-frontend/issues/139)
- Add gov txs to validator detail [#140](https://github.com/provenance-io/explorer-frontend/issues/140)
- Add proposal votes to validator detail [#141](https://github.com/provenance-io/explorer-frontend/issues/141)

### Improvements

- Update dependencies [#162](https://github.com/provenance-io/explorer-frontend/issues/162)

### Bug Fixes

- Fix FireFox invalid date filters [#145](https://github.com/provenance-io/explorer-frontend/issues/145)
- Fix Metadata loading in multiple components and looping when failing [#147](https://github.com/provenance-io/explorer-frontend/issues/147)
- Fix BlockTxs API call happening 2x [#128](https://github.com/provenance-io/explorer-frontend/issues/128)

## 2.0.2

### Release Name: Anders Svedlund

### Bug Fixes

- Fix duplication of tx msgs [#129](https://github.com/provenance-io/explorer-frontend/issues/129)

## 2.0.1

### Release Name: Nehsi

### Bug Fixes

- Update to support new txMsg schema, also consume paginated txMsgs endpoint [#124](https://github.com/provenance-io/explorer-frontend/issues/124)

## 2.0.0

### Release Name: Leif Eriksson

### Improvements

- Add Max Change Rate line item on validator page [#81](https://github.com/provenance-io/explorer-frontend/issues/81)
- Pull account balances from new balances endpoint [#92](https://github.com/provenance-io/explorer-frontend/issues/92)
- Add support for metadata object, converts base denom to display denom [#37](https://github.com/provenance-io/explorer-frontend/issues/37)
- Add name field to the Address Page [#61](https://github.com/provenance-io/explorer-frontend/issues/61)
- Updated API URLs to match service updates [#93](https://github.com/provenance-io/explorer-frontend/issues/93)
- Added token counts to the asset info [#91](https://github.com/provenance-io/explorer-frontend/issues/91)
- Added table column to show if a managing account allows governance [#91](https://github.com/provenance-io/explorer-frontend/issues/91)
- Show error code and log on failed tx [#70](https://github.com/provenance-io/explorer-frontend/issues/70)
- Add markerType to the asset list and detail [#112](https://github.com/provenance-io/explorer-frontend/issues/112)
- Make Summary component two columns on screens larger than MD breakpoint [#112](https://github.com/provenance-io/explorer-frontend/issues/112)
- Show monikers instead of validator address when they are available [#110](https://github.com/provenance-io/explorer-frontend/issues/110)
- Theme switcher now uses the OS settings (unless the user has chosen a theme)
- Support full tx msg on tx detail page [#90](https://github.com/provenance-io/explorer-frontend/issues/90)
- Add hover text for supply in base denom on asset list [#72](https://github.com/provenance-io/explorer-frontend/issues/72)

### Bug Fixes

- Removed the empty popup from the validator page [#81](https://github.com/provenance-io/explorer-frontend/issues/81)
- Stop rounding transaction fees throughout the app [#62](https://github.com/provenance-io/explorer-frontend/issues/62)
- Fix the search bar url for asset search [#78](https://github.com/provenance-io/explorer-frontend/issues/78)
- Currency conversion now supports all denoms [#119](https://github.com/provenance-io/explorer-frontend/issues/119)

## 1.2.2

### Improvements

- Allow staking on Jailed Validator
- Support staking on both Jailed and Candidate

## 1.2.1

### Improvements

- Change line length to 100, the previous lentgh was too long

### Bug Fixes

- Removed staking from Jailed Validator
- Default the users hash amount to 0

## 1.2.0

### Features

- Added ability to delegate, redelegate and undelegate hash to validators [#74](https://github.com/provenance-io/explorer-frontend/issues/74)
- Add ability to see staking rewards [#84](https://github.com/provenance-io/explorer-frontend/issues/84)

### Improvements

- Add helper script for CHANGELOG
- Time is now displayed in 24hr format

### Bug Fixes

- Remove encoding on staking messages that were causing a double encode.

## 1.1.0

### Features

- Integrated [@provenanceio/wallet-lib](https://npm.im/@provenanceio/wallet-lib), a user can now authenticate with a Provenance Wallet or a Figure Wallet [#10](https://github.com/provenance-io/explorer-frontend/issues/10)

### Improvements

- Updated readme with instructions for running the service and application
- Allow dates in the transaction history filter to be empty [#48](https://github.com/provenance-io/explorer-frontend/issues/48)
- A second Docker instance with Prod URLs
- Manager details in assets [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Changed the table columns and detail information for jailed validators [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Asset `Owner` is now called `Holding Account` [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Removed hash conversions (handled by explorer-service for now) [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Use queryDenom for link addresses [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Holders is now paginated [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Assets is now paginated [#60](https://github.com/provenance-io/explorer-frontend/issues/60)
- Last tx timestamp to assets [#65](https://github.com/provenance-io/explorer-frontend/issues/65)
- Table data with links to the page a user is currently on is no longer rendered as a link and renders as text instead [#57](https://github.com/provenance-io/explorer-frontend/issues/57)

### Bug Fixes

- Fallback for txs when there isn't a msgArray available
- Fixed incorrect Prod URLs
- Fixed incorrect percentages in Validator voting [#55](https://github.com/provenance-io/explorer-frontend/issues/55)
- Remove the faucet page from prod [#58](https://github.com/provenance-io/explorer-frontend/issues/58)
- Fix for validator page not rendering [#75](https://github.com/provenance-io/explorer-frontend/issues/75)

## 1.0.0

- Initial Deploy
