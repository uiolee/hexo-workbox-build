import * as generator from "../src/generator";
import {
  defaultOptions,
  DefaultConfigs,
  DefaultOptions,
} from "../src/default_config";
import { mkdir, rm, writeFile } from "fs/promises";
import Hexo from "hexo";

beforeAll(() => {
  return mkdir(".temp", { recursive: true });
});
afterAll(() => {
  //   return rm(".temp", { recursive: true, force: true });
});
describe("manifestJsonGen", () => {
  let options: DefaultOptions = { ...defaultOptions };
  let configs: DefaultConfigs = { hexo_workbox_build: options };
  beforeEach(() => {
    options = { ...defaultOptions };
    configs = { hexo_workbox_build: options };
    options.enable = true;
  });
  test("default options", () => {
    const res = generator.manifestJsonGen.bind({ config: configs })();
    return expect(res).rejects.toThrow();
  });
  test("enable", async () => {
    options.MF_copyManifestJsonSrc = ".temp/manifest.test.json";
    options.MF_copyManifestJsonDest = ".temp/manifest.dest.json";
    const data = { name: "testManifest" };
    return writeFile(
      options.MF_copyManifestJsonSrc,
      JSON.stringify(data, null, 2),
      { encoding: "utf-8" },
    ).then(async () => {
      const res = await generator.manifestJsonGen.bind({ config: configs })();
      expect(res.path).toBe(options.MF_copyManifestJsonDest);
      expect(JSON.parse(res.data).name).toBe(data.name);
    });
  });
});

describe("registerScriptGen", () => {
  let options: DefaultOptions = { ...defaultOptions };
  let configs: DefaultConfigs | Hexo["config"] = {
    hexo_workbox_build: options,
  };
  const hexo = new Hexo(".temp", { silent: true });
  beforeEach(() => {
    options = { ...defaultOptions };
    configs = { hexo_workbox_build: options };
    options.enable = true;

    hexo.config = { ...hexo.config, ...configs };
    options = hexo.config.hexo_workbox_build;
    return hexo.init();
  });
  test("default options", async () => {
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = await generator.registerScriptGen.bind(hexo)({});
    expect(res.data).toContain(`register("${url_for(options.WB_swDest)}")`);
  });
  test("enable", async () => {
    options.WB_swDest = "sw.js";

    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = await generator.registerScriptGen.bind(hexo)({});
    expect(res.path).toBe(options.REG_registerScriptDest);
    expect(res.data).toContain(`register("${url_for(options.WB_swDest)}")`);
  });

  test("custom", async () => {
    options.WB_swDest = "custiom.reg.js";
    options.REG_registerScriptNjkPath = ".temp/reg.njk";
    const ra = Math.random().toString();

    return writeFile(
      options.REG_registerScriptNjkPath,
      `
// unit test temlate
if ("asd" in navigator) {
    console.log("${ra}")
} else {
  console.error("{{WB_swDest}}");
}
`,
    ).then(async () => {
      const url_for = hexo.extend.helper.get("url_for").bind(hexo);
      const res = await generator.registerScriptGen.bind(hexo)({});
      expect(res.path).toBe(options.REG_registerScriptDest);
      expect(res.data).toContain(url_for(options.WB_swDest));
      expect(res.data).toContain(ra);
    });
  });
});
