module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be first
    'nativewind/babel', 
    'react-native-iconify/plugin', 
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};