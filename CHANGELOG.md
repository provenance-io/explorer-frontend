# CHANGELOG | <img src="./public/logo.svg" style="height: 36px; margin: 0 0 -7px 4px;" alt="Provenance Explorer"/>

## Unreleased

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
