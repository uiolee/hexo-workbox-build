# hexo-workbox-build

[![GitHub Tag](https://img.shields.io/github/v/tag/uiolee/hexo-workbox-build?logo=github)](https://github.com/uiolee/hexo-workbox-build/tags)
[![GitHub Release](https://img.shields.io/github/v/release/uiolee/hexo-workbox-build?logo=github)](https://github.com/uiolee/hexo-workbox-build/releases)
[![GitHub commits since latest release](https://img.shields.io/github/commits-since/uiolee/hexo-workbox-build/latest?include_prereleases&sort=semver&logo=github)](https://github.com/uiolee/hexo-workbox-build/compare/...main)
[![GitHub top language](https://img.shields.io/github/languages/top/uiolee/hexo-workbox-build?logo=github)](#hexo-workbox-build)
[![Coverage Status](https://coveralls.io/repos/github/uiolee/hexo-workbox-build/badge.svg?branch=main)](https://coveralls.io/github/uiolee/hexo-workbox-build?branch=main)
[![CI](https://github.com/uiolee/hexo-workbox-build/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/uiolee/hexo-workbox-build/actions/workflows/ci.yml)
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/uiolee/hexo-workbox-build?logo=librariesdotio)](https://libraries.io/github/uiolee/hexo-workbox-build#dependencies)

A hexo plugin to run workbox build.

## Install

[![NPM Version](https://img.shields.io/npm/v/hexo-workbox-build?logo=npm)](https://www.npmjs.com/package/hexo-workbox-build)
[![node-lts](https://img.shields.io/node/v-lts/hexo-workbox-build?logo=nodedotjs)](https://nodejs.org/)
[![NPM License](https://img.shields.io/npm/l/hexo-workbox-build)](./LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dm/hexo-workbox-build?logo=npm)](#hexo-workbox-build)
[![NPM Downloads](https://img.shields.io/npm/dt/hexo-workbox-build?logo=npm)](#hexo-workbox-build)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/hexo-workbox-build?logo=librariesdotio)](https://libraries.io/npm/hexo-workbox-build/tree)

```bash
pnpm add hexo-workbox-build

# npm i hexo-workbox-build
```

## Default Configuration

```yml
workboxBuild:
  enable: false

  buildWorkbox: true
  swDest: ""
  generateSWOptionPath: ""
  injectManifestOptionPath: ""

  injectScript: true
  # scriptPath: "registerSW.js"
  scriptNjkPath: ""

  ManifestJsonSrc: ""
  ManifestJsonDest: ""

  injectManifestJson: false
```

## Example Configuration

```yml
workboxBuild:
  enable: true

  buildWorkbox: true
  swDest: "sw.js"
  generateSWOptionPath: "workbox/genSWOption.js"
  # injectManifestOptionPath: "workbox/injMfOption.js"

  injectScript: true
  # scriptPath: "registerSW.js"
  # scriptNjkPath: ""

  ManifestJsonSrc: "workbox/manifest.json"
  ManifestJsonDest: "manifest.json"

  injectManifestJson: true
```

## Options

- `enable`

  boolean

  control whether to enable [`hexo-workbox-build`](https://github.com/uiolee/hexo-workbox-build/).

---

- `buildWorkbox`

  boolean

  control whether to run [`worlbox-build`](https://developer.chrome.com/docs/workbox/modules/workbox-build/).

- `swDest`

  string

  specify the name and path of `service-worker`. (relative to `public` dir)

- `generateSWOptionPath`

  string

  specify the path of a js file. (relative to your hexo dir)

  exports the arguments of [`generatesw-mode`](https://developer.chrome.com/docs/workbox/modules/workbox-build/#generatesw-mode) of [`worlbox-build`](https://developer.chrome.com/docs/workbox/modules/workbox-build/).\\

  need `swDest`

- `injectManifestOptionPath` (optional)

  string

  specify the path of a js file. (relative to your hexo dir)

  exports the arguments of [`injectmanifest-mode`](https://developer.chrome.com/docs/workbox/modules/workbox-build/#injectmanifest-mode) of [`worlbox-build`](https://developer.chrome.com/docs/workbox/modules/workbox-build/).

  need `swDest` `generatesw-mode`

  > Note: `injectmanifest-mode` depend on a built `sw.js`.
  >
  > It means you need to run `generatesw-mode` first in [`hexo-workbox-build`](https://github.com/uiolee/hexo-workbox-build/).

---

- `injectScript` (optional)

  boolean

  control whether to Inject a javascript code into html, which is use to register `service-worker`.

  need `swDest`

- `scriptNjkPath`

  string

  path of a nunjucks template of the javascript. (relative to your hexo dir)

  default template: [`./script.njk`](./script.njk)

---

- `ManifestJsonSrc` (optional)

  string

  specify the path of your `manifest.json`. (relative to your hexo dir)

- `ManifestJsonDest`

  string

  specify the destiny path of your `manifest.json`. (relative to `public` dir)

  > If set both `ManifestJsonSrc` and `ManifestJsonDest`, [`hexo-workbox-build`](https://github.com/uiolee/hexo-workbox-build/) will make a `manifest.json` copy to your `public` dir.

---

- `injectManifestJson`

  boolean

  control whether to Inject `<link rel="manifest" href="{{ ManifestJsonDest }}" />` into head of html.

  need `ManifestJsonDest`.

---
