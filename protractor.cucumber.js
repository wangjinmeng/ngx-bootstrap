var envUrl =  "http://ngx-bootstrap-latest.surge.sh/#/";

const chromeOptions = {
  args: ['--headless', '--disable-gpu', '--no-sandbox']
};

if(process.env.GOOGLE_CHROME_BINARY) {
  chromeOptions.binary = process.env.GOOGLE_CHROME_BINARY;
}

if(process.env.TRAVIS) {
  envUrl = "http://localhost:3000/"
}

exports.config = {

  SELENIUM_PROMISE_MANAGER: false,

  baseUrl: envUrl,

  capabilities: {
    'browserName': 'chrome',
    chromeOptions: chromeOptions
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    './demo/e2e-bdd/features/*.feature'
  ],

  cucumberOpts: {
    require: [
      './demo/e2e-bdd/step_definitions/*.steps.ts',
      './demo/e2e-bdd/support/*.ts'
    ]
  },

  onPrepare: () => {
  require('ts-node').register({project: 'demo/e2e'});
  const chai = require('chai');
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  browser.driver.manage().window().maximize()
  }
}
