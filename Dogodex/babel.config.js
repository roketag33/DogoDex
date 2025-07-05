module.exports = function (api) {
  const isTest = api.env && api.env('test');
  api.cache(() => process.env.NODE_ENV);

  if (isTest) {
    return {
      presets: ['babel-preset-expo'],
    };
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};