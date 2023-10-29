// webpack.config.js
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["nativewind"],
      },
    },
    argv
  );

  config.module.rules.push({
    test: /\.css$/i,
    use: [
      "style-loader",
      "css-loader",
    ],
  });

  config.module.rules.push({
    test:/\.(png|jpe?g|gif|mp3)$/i,
    use: [
      {
        loader: "file-loader",
        // options: {
        //   name: "[path][name].[ext]",
        //   outputPath: "images",
        //   publicPath: "images",
        // },
      },
    ],
  });

  return config;
};
