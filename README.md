# hexo-workbox-build

[![node-current](https://img.shields.io/npm/v/hexo-workbox-build?style=for-the-badge)](https://www.npmjs.com/package/hexo-workbox-build)

A hexo plugin to run workbox build.

## Default Configuration

```yml
workboxBuild:
  enable: false

  buildWorkbox: true
  swDest: ""
  generateSWOptionPath: ""
  injectManifestOptionPath: ""

  injectScript: true
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
