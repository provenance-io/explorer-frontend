<div align="center">
  <img src="./public/logo.svg" alt="Provenance Explorer"/>
</div>
<br/><br/>

# Provenance Blockchain Explorer

Blockchain explorer for the Provenance Blockchain

[Provenance] is a distributed, proof of stake blockchain designed for the financial services industry.

For more information about [Provenance Inc](https://provenance.io) visit https://provenance.io

The Provenance Blockchain Explorer allows viewing transactions, validators, blocks, wallets and various other sets of information in near real-time.  This application is built using [React](https://reactjs.org/), [Redux](https://redux.js.org/), and [Styled Components](https://styled-components.com/).

Visit our [Docker Hub](https://hub.docker.com/u/provenanceio) to grab an image and run the apps with Docker.

## Running Locally

### Using Test Explorer Service

```bash
$ npm run start:test
```

### Using Local Explorer Service

```bash
$npm run start:dev
```

## Local Development Notes
> While under heavy development, the use of polyfills in the frontend code is extensive. In order to run locally, you must first
comment out the `nodePolyfills()` (line 33 at the time of this writing) plugin in the `vite.config.mjs` file.

## Status
[![Latest Release][release-badge]][release-latest]
[![Apache 2.0 License][license-badge]][license-url]
[![LOC][loc-badge]][loc-report]
[![Build mainnet][build-badge]][build-url]

[license-badge]: https://img.shields.io/github/license/provenance-io/explorer-frontend.svg
[license-url]: https://github.com/provenance-io/explorer-frontend/blob/main/LICENSE
[release-badge]: https://img.shields.io/github/tag/provenance-io/explorer-frontend.svg
[release-latest]: https://github.com/provenance-io/explorer-frontend/releases/latest
[loc-badge]: https://tokei.rs/b1/github/provenance-io/explorer-frontend
[loc-report]: https://github.com/provenance-io/explorer-frontend
[lint-badge]: https://github.com/provenance-io/explorer-frontend/workflows/Lint/badge.svg
[provenance]: https://provenance.io/#overview
[build-badge]: https://github.com/provenance-io/explorer-frontend/actions/workflows/docker_prod.yml/badge.svg
[build-url]: https://github.com/provenance-io/explorer-frontend/actions/workflows/docker_prod.yml

The Provenance Blockchain Explorer is under heavy development. The upcoming public blockchain is the evolution of the private Provenance network blockchain started in 2018.
Current development is being supported by [Figure Technologies](https://figure.com).
