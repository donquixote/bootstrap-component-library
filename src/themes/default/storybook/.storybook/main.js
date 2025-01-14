const path = require("path");

const chromatic = process.env.STORYBOOK_ENV;

let stories = ["../../**/!(test*).story.js"];

const addons = [
  "@storybook/addon-docs",
  "@whitespace/storybook-addon-html",
  "@storybook/addon-controls",
  "storybook-addon-designs",
  "@storybook/addon-viewport",
  "@storybook/addon-a11y",
  "@geometricpanda/storybook-addon-badges",
];

if (chromatic) {
  stories = ["../../**/*.story.js"];
  addons.push("@storybook/addon-interactions");
}

const webpackFinal = (config) => {
  config.module.rules.push({
    test: /\.story\.js?$/,
    use: [
      {
        loader: require.resolve("@whitespace/storybook-addon-code/loader"),
      },
    ],
    enforce: "pre",
  });
  config.module.rules.push({
    test: /\.twig$/,
    loader: "twing-loader",
    options: {
      environmentModulePath: path.resolve(`${__dirname}/environment.js`),
    },
  });

  config.plugins.forEach((plugin, i) => {
    if (plugin.constructor.name === "ProgressPlugin") {
      config.plugins.splice(i, 1);
    }
  });

  return config;
};

module.exports = {
  core: {
    builder: "webpack5",
  },
  staticDirs: ["../../../../../assets/"],
  stories,
  addons,
  webpackFinal,
  features: {
    postcss: false,
  },
};
