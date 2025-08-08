// webpack.config.js
const { withExpo } = require('@expo/webpack-config');
module.exports = async (env, argv) => {
  const config = await withExpo(env, argv);

  // Alias react-native-maps → our web stub
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native-maps': require.resolve('./src/stubs/ReactNativeMapsStub'),
  };

  return config;
};
