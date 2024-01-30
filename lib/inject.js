"use strict";

const { renderString } = require("nunjucks");

const injectManifestJson = (opts) => {
  const { ManifestJsonDest } = opts;
  return renderString(
    '<link rel="manifest" href="{{ ManifestJsonDest }}" />',
    ManifestJsonDest,
  );
};

const injectScript = (opts, hexo) => {
  const url_for = hexo.extend.helper.get("url_for").bind(hexo);
  const { scriptPath } = opts;
  return `<script defer src="${url_for(scriptPath)}"></script>`;
};

module.exports = { injectManifestJson, injectScript };
