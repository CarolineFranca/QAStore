const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterRepoterOptions:{
      mochaFile: 'cypress/reports/junit/results-[hash].xml'
    },
    cyressMochawesomeReporterReporterOptions: {
      charts: true, // Gerar graficos
      reportPageTitle: 'Relatorio de testes', //Título a pagina
      embeddedScreenshots: true, //Screenshot anexado aut.
      inlineAssets: true,  //Gerar unico arquivo xml
      saveAllAttempts: false //não salvar resultado de todas as tentativas
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      // implement node event listeners here
    },
    baseUrl: 'https://qastoredesafio.lojaintegrada.com.br',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true, //Gerar vídeos como evidência durante execução
  },
});
