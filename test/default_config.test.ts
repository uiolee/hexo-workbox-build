import { defaultConfigs } from "../src/default_config";

test("configs type", () => {
  expect(typeof defaultConfigs).toBe("object");
});

test("main key", () => {
  const keys = Object.keys(defaultConfigs);
  expect(keys).toContain("hexo_workbox_build");
});

test("disable in default", () => {
  const enable = defaultConfigs.hexo_workbox_build.enable;
  expect(enable).toBeFalsy();
});
test("flat options", () => {
  for (const value of Object.values(defaultConfigs.hexo_workbox_build)) {
    expect(typeof value).not.toBe("object");
  }
});
