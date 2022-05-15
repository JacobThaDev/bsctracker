/** @type {import('next').NextConfig} */
const nextConfig = {
    //whatever config you have
    //...
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.js$|jsx/,
        use: ["@svgr/webpack"],
      });
  
      return config;
    },
  };
  
  module.exports = nextConfig;