/* eslint-disable prettier/prettier */
const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@root": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@screens": path.resolve(__dirname, "src/screens"),
    "@models": path.resolve(__dirname, "src/models"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@DAL": path.resolve(__dirname, "src/DAL"),
    "@contexts": path.resolve(__dirname, "src/contexts"),
    "@app": path.resolve(__dirname, "src/app"),
  };

  return config;
};
