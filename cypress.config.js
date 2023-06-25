const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:1111/'
  },
});
