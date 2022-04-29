const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/games/typetest/",
  transpileDependencies: [
    'vuetify'
  ]
})
