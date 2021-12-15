import * as fs from 'fs'
import { resolve } from 'path'

let
  flag = false,
  latestChangelog = []

for (const line of fs.readFileSync(
  resolve(process.cwd(), 'CHANGELOG.md'), 'utf-8'
).split('\n')) {
  if (line.startsWith('## ')) {
    if (flag) break
    flag = true
  }
  if (flag)
    latestChangelog.push(line)
}

fs.writeFileSync(resolve(process.cwd(), 'latestChangelog.md'), latestChangelog.join('\n'))
