'use strict';

const { readFileSync } = require('fs');
const {renderString} = require('nunjucks');
const {join} = require('path');

const injectManifestJson = opts => {
  const {ManifestJsonDest} = opts;
  return renderString('<link rel="manifest" href="{{ ManifestJsonDest }}" />', ManifestJsonDest);

};

const injectScript = (opts, hexo) => {
  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  const {swDest, scriptNjkPath} = opts;
  const njkPath = scriptNjkPath ? scriptNjkPath : join(__dirname, './script.njk');
  return renderString(readFileSync(njkPath, 'utf8'), {swDest: url_for(swDest)});
};

module.exports = {injectManifestJson, injectScript};
