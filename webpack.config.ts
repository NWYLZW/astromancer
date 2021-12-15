import { Configuration } from 'webpack'

import Extender from '@extender/builder-webpack'

const devConfig = {
  mode: 'development',
  watch: true
} as Configuration

const proConfig = {
  mode: 'production'
} as Configuration

export default {
  ...(process.env.NODE_ENV === 'pro' ? proConfig : devConfig),
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
