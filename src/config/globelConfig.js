const devConfig = {
    baseUrl: 'http://localhost:3019'
}

const prodConfig = {
    baseUrl: 'http://localhost:3019'
}

let config = devConfig;
if (process.env.NODE_ENV === 'production')
  config = prodConfig;

module.exports = config;