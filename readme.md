<h1 align="center">
    Play Stats
</h1>

<h4>
    Cloudflare worker that returns play store app details for the <a href="https://shields.io/endpoint">shields.io endpoint</a>
</h4>

## Demo

[Demo](https://play-stats.tpoe.dev)

## Description

The worker returns a json object with live data from your android app that can be used to generate custom shields like this:

![test](https://img.shields.io/endpoint?color=green&logo=google-play&logoColor=green&url=https%3A%2F%2Fplay-stats.tpoe.dev%2Fplay%3Fi%3Ddev.tpoe.wordclock%26l%3DAndroid%26m%3D%24version)

![test](https://img.shields.io/endpoint?color=green&logo=google-play&logoColor=green&url=https%3A%2F%2Fplay-stats.tpoe.dev%2Fplay%3Fi%3Ddev.tpoe.wordclock%26l%3DWord%2520Clock%2520Watch%2520Face%26m%3D%24installs)

## Usage

Use the [live demo](https://play-stats.tpoe.dev) to customize your badge and embed them via the provided link.

## Installation

1. Install the [Cloudflare wrangler cli](https://www.npmjs.com/package/wrangler)
2. Login to your worker via `wrangler login`
3. Run `wrangler deploy index.js`

## Development

