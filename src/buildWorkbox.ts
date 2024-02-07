import type Hexo from "hexo";
import type { DefaultOptions } from "./default_config";

import { generateSW, injectManifest } from "workbox-build";
import { join } from "node:path";

async function buildWorkboxFn(this: Hexo, data: unknown) {
  const options: DefaultOptions = this.config.hexo_workbox_build;
  const { WB_swDest, WB_generateSWOptionsPath, WB_injectManifestOptionsPath } =
    options;

  if (!WB_swDest) {
    return data;
  }
  if (!WB_generateSWOptionsPath) {
    return data;
  }

  const { default: gSWOption } = await import(
    join(this.base_dir, WB_generateSWOptionsPath)
  );
  const start = process.hrtime();
  generateSW(
    Object.assign(
      {
        swDest: join(this.public_dir, WB_swDest),
      },
      gSWOption,
    ),
  ).then(({ filePaths }) => {
    filePaths.forEach((path) => {
      this.log.info("Generated: %s", path);
    });
    const interval = `${process.hrtime(start)[0]}.${process.hrtime(start)[1]}s`;
    this.log.info("ServiceWorker files generated in %s", interval);
  });

  if (!WB_injectManifestOptionsPath) {
    return data;
  }

  const { default: injMfOption } = await import(
    join(this.base_dir, WB_injectManifestOptionsPath)
  );
  injectManifest(
    Object.assign(
      {
        swSrc: join(this.public_dir, WB_swDest),
        swDest: join(this.public_dir, WB_swDest),
      },
      injMfOption,
    ),
  ).then(({ count, size, warnings }) => {
    if (warnings.length > 0) {
      this.log.warn(
        "Warnings encountered while injecting the manifest:",
        warnings.join("\n"),
      );
    }
    this.log.info(
      `Injected a manifest which will precache ${count} files, totaling ${size} bytes.`,
    );
  });
}

export { buildWorkboxFn };
