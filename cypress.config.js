const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log("📢 Log from Cypress:", message);
          return null;
        },
      });

      console.log("🚀 Cypress Integration tests are starting...");
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-gpu");
        }
        return launchOptions;
      });

      const env = config.env.environment || "dev"; // Default to dev
      const configFile = `./cypress/config/${env}.json`;

      if (fs.existsSync(configFile)) {
        const customConfig = JSON.parse(fs.readFileSync(configFile, "utf8"));
        config = { ...config, ...customConfig }; // ✅ Merge settings correctly
      }

      // Automatically delete video if test passes
      on("after:spec", (spec, results) => {
        if (results && results.video && results.stats.failures === 0) {
          fs.unlinkSync(results.video); // Delete video if no test failures
        }
      });

       // Enable Mochawesome merge support
      require("cypress-mochawesome-reporter/plugin")(on);
      require("cypress-grep/src/plugin")(on, config); 
      // ✅ Show config only if DEBUG=true
      console.log("✅ Cypress Config:", JSON.stringify(config, null, 2));
      return config;
    },
    retries: {
      runMode: 2,
      openMode: 1,
    },
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
  },

  env: {
    grepFilterSpecs: true,
    grep: "smoke|regression|sanity",
    FOO: "bar",
    allure: true,
    DEBUG: false, // ✅ Set to true when debugging
  },
});
``

