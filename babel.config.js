const ModuleResolverPlugin = [
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.jsx', '.ios.js', '.android.js', '.json'],
    alias: {
      '@components': './src/components',
      '@i18n': './src/i18n',
      '@screens': './src/screens',
      '@assets': './src/assets',
      '@navigation': './src/navigation',
      '@theme': './src/theme',
      '@utils': './src/utils',
    },
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [ModuleResolverPlugin],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
