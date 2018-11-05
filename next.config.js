module.exports = {
  webpack: config => {
    config.externals = {
      marzipano: "Marzipano"
    };
    return config;
  }
};
