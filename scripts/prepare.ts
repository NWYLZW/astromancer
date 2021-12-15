import * as fs from 'fs'
import { resolve } from 'path'

const dir = resolve(process.cwd(), 'dist')
if (!fs.existsSync(dir))
  fs.mkdirSync(dir)
