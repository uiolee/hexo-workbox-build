import type Hexo from "hexo";
import type { DefaultOptions } from "./default_config";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { renderString } from "nunjucks";

async function manifestJsonGen(this: Hexo, locals: object): Promise<object> {
  const options: DefaultOptions = this.config.hexo_workbox_build;
  const { MF_copyManifestJsonSrc, MF_copyManifestJsonDest } = options;

  return await readFile(MF_copyManifestJsonSrc, "utf8").then((data) => {
    return { path: MF_copyManifestJsonDest, data };
  });
}

async function registerScriptGen(this: Hexo, locals: object): Promise<unknown> {
  const url_for = this.extend.helper.get("url_for").bind(this);
  const options: DefaultOptions = this.config.hexo_workbox_build;
  const { WB_swDest, REG_registerScriptNjkPath, REG_registerScriptDest } =
    options;
  const njkPath = REG_registerScriptNjkPath
    ? REG_registerScriptNjkPath
    : join(__dirname, "../assets/registerScript.njk");

  return await readFile(njkPath, "utf8").then((njkString) => {
    return {
      path: REG_registerScriptDest,
      data: renderString(njkString, {
        WB_swDest: url_for(WB_swDest),
      }),
    };
  });
}

export { manifestJsonGen, registerScriptGen };
