module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './src',
          '@env': './src/env',
          // '@assets': './src/assets',
          // '@routes': './src/routes',
          // '@storage': './src/storage',
          // '@utils': './src/utils',
          // '@hooks': './src/hooks',
          // '@types': './src/@types',
          // '@dtos': './src/dtos',
          // '@navigation': './src/navigation',
          // '@contexts': './src/contexts',
          // '@config': './src/config',
          // '@constants': './src/constants',
          // '@storage': './src/storage',
          // '@services': './src/services',
          // '@notifications': './src/notifications',
        }
      }],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
  };
};
