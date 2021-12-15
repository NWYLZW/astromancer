import archiver from 'archiver'
import * as fs from 'fs'
import { resolve } from 'path'

let [sourceDir, outPath] = process.argv.slice(2)

if (!sourceDir)
  throw new Error('Usage: build.ts <sourceDir>')
if (!outPath)
  outPath = `./${ sourceDir.split('/').pop() }.zip`

outPath = resolve(process.cwd(), outPath)

const archive = archiver('zip', { zlib: { level: 9 }})
const stream = fs.createWriteStream(outPath)

new Promise<void>((resolve, reject) => {
  archive
    .directory(sourceDir, false)
    .on('error', err => reject(err))
    .pipe(stream)

  stream.on('close', () => resolve())
  archive.finalize()
}).then(() => {
  console.log(`${outPath} created`)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
