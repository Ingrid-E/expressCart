const { defineConfig } = require('cypress');

module.exports = defineConfig({
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config){
      // implement node event listeners here
    }
  }
});
