module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './src',
          '@env': './src/env',
          '@controllers': './src/http/controllers',
        }
      }],
      // ["module:react-native-dotenv", {
      //   "moduleName": "@env",
      //   "path": ".env",
      //   "blocklist": null,
      //   "allowlist": null,
      //   "safe": false,
      //   "allowUndefined": true
      // }]
    ],
  };
};
