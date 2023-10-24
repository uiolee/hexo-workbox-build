"use strict";

const { readFileSync } = require("fs");

// eslint-disable-next-line no-unused-vars
function manifestJsonGen(locals) {
  const hexo = this;
  const opts = hexo.config.workboxBuild;
  const { ManifestJsonSrc, ManifestJsonDest } = opts;
  const res = { path: ManifestJsonDest, data: readFileSync(ManifestJsonSrc) };
  return [res];
}

module.exports = { manifestJsonGen };
