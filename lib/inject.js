'use strict';

const { readFileSync } = require('fs');
const {renderString} = require('nunjucks');
const {join} = require('path');

const injectManifestJson = opts => {
  const {ManifestJsonDest} = opts;
  return renderString('<link rel="manifest" href="{{ ManifestJsonDest }}" />', ManifestJsonDest);

};

const injectScript = opts => {
  const {swDest, scriptNjkPath} = opts;
  const njkPath = scriptNjkPath ? scriptNjkPath : join(__dirname, '../script.njk');
  return renderString(readFileSync(njkPath, 'utf8'), {swDest});
};

module.exports = {injectManifestJson, injectScript};
