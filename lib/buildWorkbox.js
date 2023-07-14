'use strict';

const {generateSW, injectManifest} = require('workbox-build');
const {join} = require('path');

function buildWorkboxFn(data) {
  const hexo = this;
  const opts = hexo.config.workboxBuild;
  const {swDest, generateSWOptionPath, injectManifestOptionPath} = opts;

  if (!swDest) {
    return data;
  }
  if (!generateSWOptionPath) {
    return data;
  }

  const gSWOption = require(join(hexo.base_dir, generateSWOptionPath));
  const start = process.hrtime();
  generateSW(Object.assign(
    {
      swDest: join(hexo.public_dir, swDest)
    },
    gSWOption
  ))
    .then(({ filePaths }) => {
      filePaths.forEach(path => {
        hexo.log.info('Generated: %s', path);
      });
      const interval = `${process.hrtime(start)[0]}.${process.hrtime(start)[1]}s`;
      hexo.log.info('ServiceWorker files generated in %s', interval);
    });


  if (!injectManifestOptionPath) {
    return data;
  }

  const injMfOption = require(join(hexo.base_dir, injectManifestOptionPath));
  injectManifest(Object.assign(
    {
      swSrc: join(hexo.public_dir, swDest),
      swDest: join(hexo.public_dir, swDest)
    },
    injMfOption
  ))
    .then(({count, size, warnings}) => {
      if (warnings.length > 0) {
        hexo.log.warn(
          'Warnings encountered while injecting the manifest:',
          warnings.join('\n')
        );
      }
      hexo.log.info(`Injected a manifest which will precache ${count} files, totaling ${size} bytes.`);
    });
}

module.exports = {buildWorkboxFn};
