import type Hexo from "hexo";
import type { DefaultOptions } from "./default_config";

import { renderString } from "nunjucks";

const MF_injector = (options: DefaultOptions, hexo: Hexo) => {
  const url_for = hexo.extend.helper.get("url_for").bind(hexo);
  const { MF_copyManifestJsonDest } = options;
  return renderString(
    '<link rel="manifest" href="{{ MF_copyManifestJsonDest }}" />',
    { MF_copyManifestJsonDest: url_for(MF_copyManifestJsonDest) },
  );
};

const REG_injector = (options: DefaultOptions, hexo: Hexo) => {
  const url_for = hexo.extend.helper.get("url_for").bind(hexo);
  const { REG_registerScriptDest } = options;
  return renderString(
    `<script defer src="{{ REG_registerScriptDest }}"></script>`,
    { REG_registerScriptDest: url_for(REG_registerScriptDest) },
  );
};

export { MF_injector, REG_injector };
