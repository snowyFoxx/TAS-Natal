const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://furbo.sk/waw/",
    retries: {
      openMode: 2
    },
  },
});
