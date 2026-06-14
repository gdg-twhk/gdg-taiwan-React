import nextConfig from "eslint-config-next/core-web-vitals";
import { fixupConfigRules } from "@eslint/compat";

// eslint-config-next bundles a Babel parser (next/dist/compiled/babel/eslint-parser)
// whose scope manager lacks the addGlobals() method required by ESLint v10.
// Stripping that parser entry lets ESLint fall back to espree (v10-compatible).
const NEXT_BABEL_PARSER = "eslint-config-next/parser";

const eslintConfig = fixupConfigRules([...nextConfig]).map((config) => {
  if (config.languageOptions?.parser?.meta?.name === NEXT_BABEL_PARSER) {
    const { parser: _unused, ...restLangOptions } = config.languageOptions;
    return { ...config, languageOptions: restLangOptions };
  }
  return config;
});

export default eslintConfig;
