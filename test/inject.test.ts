import * as injector from "../src/inject";
import {
  defaultOptions,
  DefaultConfigs,
  DefaultOptions,
} from "../src/default_config";
import Hexo from "hexo";

describe("MF_injector", () => {
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
  test("default options", () => {
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.MF_injector(options, hexo);

    expect(res).toContain(`link`);
    expect(res).toContain(`href="${url_for(options.MF_copyManifestJsonDest)}"`);
  });
  test("enable", () => {
    options.MF_copyManifestJsonDest = "pwa/manifest.json";
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.MF_injector(options, hexo);

    expect(res).toContain(`link`);
    expect(res).toContain(`href="${url_for(options.MF_copyManifestJsonDest)}"`);
  });
  test("custom", () => {
    options.MF_copyManifestJsonDest = "pwa/manifest.json";
    options.MF_injectorNjkString = `<link rel="festmani" src="{{MF_copyManifestJsonDest}}"`;
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.MF_injector(options, hexo);

    expect(res).toContain(`link`);
    expect(res).toContain(`rel="festmani"`);
    expect(res).toContain(`src="${url_for(options.MF_copyManifestJsonDest)}"`);
  });
});

describe("REG_injector", () => {
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
  test("default options", () => {
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.REG_injector(options, hexo);

    expect(res).toContain(`script defer`);
    expect(res).toContain(`src="${url_for(options.REG_registerScriptDest)}"`);
  });
  test("enable", () => {
    options.REG_registerScriptDest = "pwa/manifest.json";
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.REG_injector(options, hexo);

    expect(res).toContain(`script defer`);
    expect(res).toContain(`src="${url_for(options.REG_registerScriptDest)}"`);
  });
  test("custom", () => {
    options.REG_registerScriptDest = "pwa/manifest.json";
    options.REG_injectorNjkString = `<script async src="{{REG_registerScriptDest}}"`;
    const url_for = hexo.extend.helper.get("url_for").bind(hexo);
    const res = injector.REG_injector(options, hexo);

    expect(res).toContain(`script async`);
    expect(res).toContain(`src="${url_for(options.REG_registerScriptDest)}"`);
  });
});
