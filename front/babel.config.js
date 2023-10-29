module.exports = function (api) {
  api.cache(true);
  return {
    presets:  [
      [
        "module:metro-react-native-babel-preset",
        {
          unstable_transformProfile: "hermes-stable",
        },
      ],
    ],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        { moduleName: "@env", path: ".env", blacklist: null, whitelist: null, safe: false, allowUndefined: true },
      ],
    ],
  };
};
