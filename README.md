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

## Quick start options
  There are three ways to view the Explorer-Frontend App. The fastest and easiest way is to just look at the live website. The second quickest is pulling down a docker image(s) and running them.  The third, and potentially faster than the docker version of running off test data, is to run this app locally with node.  Below are the steps to get each method working on your machine.

**A) Live**
 * Visit the public website and see the explorer running with zero setup or configurations here: [Provenance Explorer](https://explorer.test.provenance.io/dashboard)

**B) Docker**
  * a) Full setup
    * This will pull all three dockerized images (provenance blockchain, explorer-service, and explorer-frontend and get them running with a single command)
    * TODO: Get url and start command for composed docker image (Work in Progress)
  * b) Manual setup
    * Pull and run all three docker images manually
      1) [Provenance Blockchain Image](https://hub.docker.com/r/provenanceio/provenance)
      2) [Provenance Explorer-Service Image](https://hub.docker.com/r/provenanceio/explorer-service)
      3) [Provenance Explorer-Frontend Image](https://hub.docker.com/r/provenanceio/explorer-frontend)
    * Run the images in the same order you downloaded them (1, 2, 3)
      * When running Explorer-Frontend's docker image you can point against production with `npm run docker:prod` (Dockerfile-prod), or point against local with `npm run docker:local` (Dockerfile)
  * c) Local setup
    * There are two commands included in npm scripts to get the front-end image up and running
      * `npm run docker:prod` (Dockerfile-prod)
        * Runs an nginx server with the app off of port 80
      * `npm run docker:local`(Dockerfile)
        * Runs a local node server with the app off of port 3000
      * Note: these commands just build the images, using vscode you can download the docker plugin, find the `explorer-frontend` images (prod and local) then right-click and select `run`
   

**C) Local Node**
  * Start off with pulling the latest [Explorer-Frontend](https://github.com/provenance-io/explorer-frontend), followed by installing all required modules with `npm install`
  * You will have two options for getting data, pointing to local APIs and pointing to test APIs
    a) Local
      * Note, you will need to have both [Explorer-Service](https://github.com/provenance-io/explorer-service/blob/main/README.md) and [Provenance Blockchain](https://github.com/provenance-io/provenance#readme) running locally to see any data when running Explorer-Frontend locally
      * `npm run start:local`

    b) Test
      * You don't need to have any other app or service running for this method, it's the fastest and easiest way to start working locally
      * `npm run start:test`

## Local Development Notes
While under heavy development, the use of polyfills in the frontend code is extensive. In order to run locally, you must first
comment out the `nodePolyfills()` (line 33 at the time of this writing) plugin in the `vite.config.mjs` file.

## Status
[![Latest Release][release-badge]][release-latest]
[![Apache 2.0 License][license-badge]][license-url]
[![LOC][loc-badge]][loc-report]

[license-badge]: https://img.shields.io/github/license/provenance-io/explorer-frontend.svg
[license-url]: https://github.com/provenance-io/explorer-frontend/blob/main/LICENSE
[release-badge]: https://img.shields.io/github/tag/provenance-io/explorer-frontend.svg
[release-latest]: https://github.com/provenance-io/explorer-frontend/releases/latest
[loc-badge]: https://tokei.rs/b1/github/provenance-io/explorer-frontend
[loc-report]: https://github.com/provenance-io/explorer-frontend
[lint-badge]: https://github.com/provenance-io/explorer-frontend/workflows/Lint/badge.svg
[provenance]: https://provenance.io/#overview

The Provenance Blockchain Explorer is under heavy development. The upcoming public blockchain is the evolution of the private Provenance network blockchain started in 2018.
Current development is being supported by [Figure Technologies](https://figure.com).
