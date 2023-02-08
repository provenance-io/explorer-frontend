# CHANGELOG | <img src="./public/logo.svg" style="height: 36px; margin: 0 0 -7px 4px;" alt="Provenance Explorer"/>

## Unreleased

### Bug Fixes
- Fix signers link in Txs Information block #484

### Features
- Update wcjs and wallet utils versions #481
- Update icons to new logo #486

## 3.5.0

### Release Name: Salomon August Andrée

### Bug Fixes
- Revert wcjs 2.0.0 changes [#447](https://github.com/provenance-io/explorer-frontend/issues/447)
- Revert Revert wcjs 2.0.0 changes [#447](https://github.com/provenance-io/explorer-frontend/issues/447)
- Use Fetch instead of Axios
- Fix chaincodeId not coming in as JSON error [#453](https://github.com/provenance-io/explorer-frontend/issues/453)
- Fix Tx History chart [#473](https://github.com/provenance-io/explorer-frontend/issues/473)

### Features
- Add Figure test wallets to User Login component [#445](https://github.com/provenance-io/explorer-frontend/issues/445)
- Add maintenance page [#371](https://github.com/provenance-io/explorer-frontend/issues/371)
- Remove maintenance page from being the only displayed page [#461](https://github.com/provenance-io/explorer-frontend/issues/461)
- Add standalone hash stats page [#465](https://github.com/provenance-io/explorer-frontend/issues/465)
- Remove standlone hash stats page margins [#467](https://github.com/provenance-io/explorer-frontend/issues/467)
- Added Transactions Dashboard [#469](https://github.com/provenance-io/explorer-frontend/issues/469)
- Hide node-link diagram [#471](https://github.com/provenance-io/explorer-frontend/issues/471)
- Add snow [#475](https://github.com/provenance-io/explorer-frontend/issues/475)

## 3.4.1

### Release Name: Kurbat Ivanov

### Bug Fixes

### Features
- Upgrade to wcjs 2.0.0 [#442](https://github.com/provenance-io/explorer-frontend/issues/442)

## 3.4.0

### Release Name: Saint Brendan

### Bugs
- Fix account chart issues [#421](https://github.com/provenance-io/explorer-frontend/issues/421)
- Fix modal title and data card spacing in accounts [#426](https://github.com/provenance-io/explorer-frontend/issues/426)
- Fix hash on account page to draw from utility_token ednpoint [#431](https://github.com/provenance-io/explorer-frontend/issues/431)
- Fix transactions history display when data length is 0 [#436](https://github.com/provenance-io/explorer-frontend/issues/436)
- Fix vesting account issues [#439](https://github.com/provenance-io/explorer-frontend/issues/439)

### Features
- Add data download csv for transaction volume [#399](https://github.com/provenance-io/explorer-frontend/issues/399)
- Update governance to use new endpoints [#390](https://github.com/provenance-io/explorer-frontend/issues/390)
- Update transactions for multi-sig changes [#424](https://github.com/provenance-io/explorer-frontend/issues/424)
- Update account calculations [#423](https://github.com/provenance-io/explorer-frontend/issues/423)
- Add tx history download to account pages [#429](https://github.com/provenance-io/explorer-frontend/issues/429)
- Add FE support for vesting accounts [#433](https://github.com/provenance-io/explorer-frontend/issues/433)

## 3.3.1

### Release Name: John Young

### Bug Fixes
- Fix accordion dropdown background color [#416](https://github.com/provenance-io/explorer-frontend/issues/416)

### Features

## 3.3.0

### Release Name: Flóki Vilgerðarson

### Bug fixes
- Formatting fix for transaction fees and proposal info [#391](https://github.com/provenance-io/explorer-frontend/issues/391)
- Fix latest transaction volume display [#400](https://github.com/provenance-io/explorer-frontend/issues/400)
- Add small margin for 404 screen [#387](https://github.com/provenance-io/explorer-frontend/issues/387)
- Fix transaction totals issue [#389](https://github.com/provenance-io/explorer-frontend/issues/389)
- Minor corrections to updated accounts page [#407](https://github.com/provenance-io/explorer-frontend/issues/407)

### Features
- Switch hash stats to pull from CMC [#393](https://github.com/provenance-io/explorer-frontend/issues/393)
- Display multiple blocks per tx hash, navigate to tx by hash and block [#395](https://github.com/provenance-io/explorer-frontend/issues/395)
- Refactor accounts page [#265](https://github.com/provenance-io/explorer-frontend/issues/265)
- Add grants to accounts page, add expanding table component, add tx search by date for accounts [#262](https://github.com/provenance-io/explorer-frontend/issues/262)
- Displays all signers on transactions, shows feepayers and type in Tx view [#405](https://github.com/provenance-io/explorer-frontend/issues/405)
- Update RTK Query to run a single endpoint with multiple injects [#409](https://github.com/provenance-io/explorer-frontend/issues/409)

## 3.2.0

### Release Name: Charles John Andersson

### Bug fixes
- Formatting fix for right column of name tree display [#384](https://github.com/provenance-io/explorer-frontend/issues/384)

### Features
- Add name tree components [#359](https://github.com/provenance-io/explorer-frontend/issues/359)
- Update search and display in name tree components [#378](https://github.com/provenance-io/explorer-frontend/issues/378)
- Add CMC data to token stats [#380](https://github.com/provenance-io/explorer-frontend/issues/380)
- Change "Remaining Max Supply" to locked in token stats [#382](https://github.com/provenance-io/explorer-frontend/issues/382)

## 3.1.1

### Release Name: Sir Crispin Agnew of Lochnaw

### Bug fixes
- Fix proposal issues in prod [#372](https://github.com/provenance-io/explorer-frontend/issues/372)

### Features

## 3.1.0

### Release Name: Thomas Wyndham

### Bug fixes
- Fix issues with proposals to show software upgrade proposals [#355](https://github.com/provenance-io/explorer-frontend/issues/355)
- Update endpoint to https [#360](https://github.com/provenance-io/explorer-frontend/issues/360)
- Fix transactions page [#362](https://github.com/provenance-io/explorer-frontend/issues/362)
- Fix the faucet [#364](https://github.com/provenance-io/explorer-frontend/issues/364)

### Features
- FE updates to proposal view [#332](https://github.com/provenance-io/explorer-frontend/issues/332)
- Add markline to proposal deposits chart [#366](https://github.com/provenance-io/explorer-frontend/issues/366)
- Add in proposal charts for all cases [#368](https://github.com/provenance-io/explorer-frontend/issues/368)
- Migrate FE redux to RTK [#341](https://github.com/provenance-io/explorer-frontend/issues/341)

## 3.0.0

### Release Name: Antonio de Abreu

### Bug fixes
- Fix issues with gas stats charts [#286](https://github.com/provenance-io/explorer-frontend/issues/286)
- Fix how message types are displayed [#288](https://github.com/provenance-io/explorer-frontend/issues/288)
- Fix validator display [#290](https://github.com/provenance-io/explorer-frontend/issues/290)
- Fix jailedUntil in Validator [#292](https://github.com/provenance-io/explorer-frontend/issues/292)
- Fix delegators pagination view [#298](https://github.com/provenance-io/explorer-frontend/issues/298)
- Fix account accordion dropdowns [#303](https://github.com/provenance-io/explorer-frontend/issues/303)
- Fix filter for transactions chart [#313](https://github.com/provenance-io/explorer-frontend/issues/313)
- Fix proposal denom to use nhash [#320](https://github.com/provenance-io/explorer-frontend/issues/320)
- Fix some FE formatting issues [#319](https://github.com/provenance-io/explorer-frontend/issues/319)
- Fix some smart contracts issues seen in test [#325](https://github.com/provenance-io/explorer-frontend/issues/325)
- Fix delegations logic in voting [#329](https://github.com/provenance-io/explorer-frontend/issues/329)
- Fix announcements and 24-hr volume data [#338](https://github.com/provenance-io/explorer-frontend/issues/338)
- Fix proposal submission to allow 0 [#346](https://github.com/provenance-io/explorer-frontend/issues/346)
- Fix announcement formatting top margin [#348](https://github.com/provenance-io/explorer-frontend/issues/348)

### Features
- Update asset price per unit calcs for new data object [#296](https://github.com/provenance-io/explorer-frontend/issues/296)
- Add message type gas statistics [#260](https://github.com/provenance-io/explorer-frontend/issues/260)
- Add calls to getAssetMetadata where explicitly needed [#283](https://github.com/provenance-io/explorer-frontend/issues/283)
- Add buttons for governance voting [#242](https://github.com/provenance-io/explorer-frontend/issues/242)
- Add fee stats to transactions chart on dashboard [#301](https://github.com/provenance-io/explorer-frontend/issues/301)
- Hide voting feature in production [#309](https://github.com/provenance-io/explorer-frontend/issues/309)
- Change fees to USD, correct number of validators [#311](https://github.com/provenance-io/explorer-frontend/issues/311)
- Add back in voting feature [#317](https://github.com/provenance-io/explorer-frontend/issues/317)
- Add smart contract views [#146](https://github.com/provenance-io/explorer-frontend/issues/146)
- Add notifications and announcements [#333](https://github.com/provenance-io/explorer-frontend/issues/333)
- Improve Navigation Bar [#343](https://github.com/provenance-io/explorer-frontend/issues/343)
- Minor improvements to announcements [#340](https://github.com/provenance-io/explorer-frontend/issues/340)
- Add countdown box to proposal submission [#352](https://github.com/provenance-io/explorer-frontend/issues/352)

## 2.6.0

### Release Name: Estevanico

### Bug fixes

- Fix account button rendering issues [#249](https://github.com/provenance-io/explorer-frontend/issues/249)
- Fix listing truncations and new unbonding objects [#251](https://github.com/provenance-io/explorer-frontend/issues/251)
- Rerender echarts on page resize [#241](https://github.com/provenance-io/explorer-frontend/issues/241)
- Minor fixes [#273](https://github.com/provenance-io/explorer-frontend/issues/273)
- Fix params page after object change [#275](https://github.com/provenance-io/explorer-frontend/issues/275)

### Features

- Add date-defined chart for dlob price history [#189](https://github.com/provenance-io/explorer-frontend/issues/189)
- Move 24-hr volume block to hash dashboard [#236](https://github.com/provenance-io/explorer-frontend/issues/236)
- Make y-axis dynamic based on zoom min/max values [#238](https://github.com/provenance-io/explorer-frontend/issues/238)
- Add account delegations/unbondings to account page [#218](https://github.com/provenance-io/explorer-frontend/issues/218)
- Add pagination to account assets [#224](https://github.com/provenance-io/explorer-frontend/issues/224)
- Add vote indicator for block validators [#167](https://github.com/provenance-io/explorer-frontend/issues/167)
- Add account attributes [#244](https://github.com/provenance-io/explorer-frontend/issues/244)
- Add validator icons [#248](https://github.com/provenance-io/explorer-frontend/issues/248)
- Add IBC UI [#130](https://github.com/provenance-io/explorer-frontend/issues/130)
- Migrate orderbook to gecko API [#255](https://github.com/provenance-io/explorer-frontend/issues/255)
- Add 24 hr changes to validator list view [#263](https://github.com/provenance-io/explorer-frontend/issues/263)
- Add chain params to network dropdown [#144](https://github.com/provenance-io/explorer-frontend/issues/144)
- Add token statistics to network dropdown [#258](https://github.com/provenance-io/explorer-frontend/issues/258)

## 2.5.0

### Release Name: Grigory Grum-Grshimailo

### Bug fixes

- Fixed Tx validators links to link to validators not accounts [#182](https://github.com/provenance-io/explorer-frontend/issues/182)
- Fixed logic to display undelegates [#230](https://github.com/provenance-io/explorer-frontend/issues/230)
- Fixed to handle null values in asset/account pricing [#232](https://github.com/provenance-io/explorer-frontend/issues/232)

### Features

- Show transaction fees [#209](https://github.com/provenance-io/explorer-frontend/issues/209)
- Update versions page [#221](https://github.com/provenance-io/explorer-frontend/issues/221)

## 2.4.0

### Release Name: Frederick Whymper

### Bug Fixes

- Show public key instead of address [#198](https://github.com/provenance-io/explorer-frontend/issues/198)

### Features

- Add pricing info to accounts, assets, dashboard [#225](https://github.com/provenance-io/explorer-frontend/issues/225)
- Add undelegate countdown [#188](https://github.com/provenance-io/explorer-frontend/issues/188)

## 2.3.0

### Release Name: Erik the Red

### Bug Fixes

- Fixed the spelling issue on account [#203](https://github.com/provenance-io/explorer-frontend/issues/203)
- Fixed the rounding to 3 decimal places on hash USD price on dashboard [#202](https://github.com/provenance-io/explorer-frontend/issues/202)
- Show 404 when account not found [#187](https://github.com/provenance-io/explorer-frontend/issues/187)

### Features

- Add NFT information to assets and accounts [#25](https://github.com/provenance-io/explorer-frontend/issues/25)
- Add page for chain versions [#208](https://github.com/provenance-io/explorer-frontend/issues/208)

### Bug Fixes

- Remove the xhr timeout to allow more time for the chain data to be returned [#204](https://github.com/provenance-io/explorer-frontend/issues/204)

## 2.2.4

### Improvements

- Update naming to Provenance Blockchain throughout the app

## 2.2.3

### Bug Fixes

- Fix for divide by zero error in proposals [#193](https://github.com/provenance-io/explorer-frontend/issues/193)

## 2.2.2

### Bug Fixes

- Remove footer slack link [#192](https://github.com/provenance-io/explorer-frontend/pull/192)

## 2.2.1

### Improvements

- Replace the Discord link / icon with Slack
- Warn a user before they delegate all their hash [#185](https://github.com/provenance-io/explorer-frontend/issues/185)

## 2.2.0

### Release Name: Hyecho

### Features

- Add 24 Hour Volume, Latest Price and Market Cap to the dashboard [#77](https://github.com/provenance-io/explorer-frontend/issues/77)
- Support query params for wallet to auto login [#98](https://github.com/provenance-io/explorer-frontend/issues/98)
- Add UI to claim rewards in staking [#164](https://github.com/provenance-io/explorer-frontend/issues/164)

### Improvements

- Table lists pull more than 10 results [#176](https://github.com/provenance-io/explorer-frontend/issues/176)

### Bug Fixes

- Fix for mobile overflow [#68](https://github.com/provenance-io/explorer-frontend/issues/68)
- Fix for validator images [#180](https://github.com/provenance-io/explorer-frontend/issues/180)

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
