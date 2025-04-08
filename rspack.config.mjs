import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STANDALONE = Boolean(process.env.STANDALONE);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const {platform, mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({inline: true}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'ChildApp',
        filename: 'ChildApp.container.js.bundle',
        dts: false,
        exposes: {
          './App': './App.tsx',
        },
        shared: Object.fromEntries(
          Object.entries(pkg.dependencies).map(([dep, version]) => {
            return [
              dep,
              {
                singleton: true,
                eager: false,
                requiredVersion: version,
                version: version.replace('^', ''),
              },
            ];
          }),
        ),
      }),
      // Supports for new architecture - Hermes can also use JS, it's not a requirement,
      // it will still work the same but it's for performance optimization
      new Repack.plugins.HermesBytecodePlugin({
        enabled: mode === 'production',
        test: /\.(js)?bundle$/,
        exclude: /index.bundle$/,
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
    ignoreWarnings: [/Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/]
  };
};
