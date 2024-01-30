"use strict";

const { readFileSync } = require("fs");
const { renderString } = require("nunjucks");
const { join } = require("path");

function manifestJsonGen(locals) {
  const hexo = this;
  const opts = hexo.config.workboxBuild;
  const { ManifestJsonSrc, ManifestJsonDest } = opts;
  const res = { path: ManifestJsonDest, data: readFileSync(ManifestJsonSrc) };
  return [res];
}

function registerSwGen(locals) {
  const hexo = this;
  const url_for = hexo.extend.helper.get("url_for").bind(hexo);
  const opts = hexo.config.workboxBuild;
  const { swDest, scriptNjkPath, scriptPath } = opts;
  const njkPath = scriptNjkPath
    ? scriptNjkPath
    : join(__dirname, "./script.njk");

  return {
    path: scriptPath,
    data: renderString(readFileSync(njkPath, "utf8"), {
      swDest: url_for(swDest),
    }),
  };
}

module.exports = { manifestJsonGen, registerSwGen };
