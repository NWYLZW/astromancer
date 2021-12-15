import { Configuration } from 'webpack'

import Extender from '@extender/builder-webpack'

export default {
  mode: 'development',
  watch: true,
  entry: './src/index.ts?matches=https://github.com/*?tab=stars&runAt=document_start',
  module: {
    rules: [{
      test: /\.scss$/i,
      use: ["style-loader", "css-loader", "sass-loader"],
    }, {
      test: /\.tsx?/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new Extender({ port: 18190 })
  ]
} as Configuration
