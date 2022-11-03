const { defineConfig } = require('@vue/cli-service')
const path=require("path");
module.exports = defineConfig({
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/assets/theme/theme.less")]
    }
  }
})
