/* global hexo */

'use strict';

const { injectManifestJson, injectScript } = require('./lib/inject');
const { manifestJsonGen } = require('./lib/generator');
const { buildWorkboxFn } = require('./lib/buildWorkbox');

hexo.config.workboxBuild = Object.assign({
  enable: false,

  buildWorkbox: true,
  swDest: '',
  generateSWOptionPath: '',
  injectManifestOptionPath: '',

  injectScript: true,
  scriptNjkPath: '',

  ManifestJsonSrc: '',
  ManifestJsonDest: '',

  injectManifestJson: false

}, hexo.config.workboxBuild);

const opts = hexo.config.workboxBuild;

if (!opts.enable || (!hexo.env.cmd.startsWith('g') && !hexo.env.cmd.startsWith('d'))) {
  hexo.log.info('hexo-workbox-build will not run.');
} else {

  if (opts.buildWorkbox) {
    hexo.extend.filter.register('before_exit', buildWorkboxFn);
  }

  if (opts.injectScript) {
    hexo.extend.injector.register('body_end', injectScript(opts, hexo), 'default');
  }

  if (opts.ManifestJsonSrc && opts.ManifestJsonDest) {
    hexo.extend.generator.register('manifest_json', manifestJsonGen);
  }

  if (opts.injectManifestJson && opts.ManifestJsonDest) {
    hexo.extend.injector.register('head_end', injectManifestJson(opts), 'default');
  }
}


