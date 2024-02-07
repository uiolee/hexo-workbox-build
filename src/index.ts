import type Hexo from "hexo";
declare let hexo: Hexo;

import { defaultOptions } from "./default_config";
import { MF_injector, REG_injector } from "./inject";
import { manifestJsonGen, registerScriptGen } from "./generator";
import { buildWorkboxFn } from "./buildWorkbox";

const options: typeof defaultOptions = Object.freeze(
  Object.assign(defaultOptions, hexo.config.hexo_workbox_build),
);
hexo.config.hexo_workbox_build = options;

if (
  !options.enable ||
  (!hexo.env.cmd.startsWith("g") &&
    !hexo.env.cmd.startsWith("d") &&
    !hexo.env.cmd.startsWith("s"))
) {
  hexo.log.info("hexo-workbox-build will not run.");
} else {
  if (options.WB_runWorkboxBuild) {
    hexo.extend.filter.register("before_exit", buildWorkboxFn);
  }

  if (options.REG_generateRegister) {
    hexo.extend.generator.register("generate_RegisterJs", registerScriptGen);
    hexo.extend.injector.register(
      "body_end",
      REG_injector(options, hexo),
      "default",
    );
  }

  if (options.MF_copyManifestJsonSrc && options.MF_copyManifestJsonDest) {
    hexo.extend.generator.register("copy_manifest_json", manifestJsonGen);
  }

  if (options.MF_injector && options.MF_copyManifestJsonDest) {
    hexo.extend.injector.register(
      "head_end",
      MF_injector(options, hexo),
      "default",
    );
  }
}
