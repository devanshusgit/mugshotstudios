const sharp = require('sharp')
const fs = require('fs')

const d = 'public/images/icons'
const transparentOnes = ['custom-training', 'shot-division', 'prompt-generation', 'self-evaluation']
const darkBgOnes = ['frame-generation', 'video-render']

// Make dark pixels transparent (keys out a dark/checkered background while
// keeping the bright gold icon). Soft ramp avoids hard edges.
async function keyOutDark(file, out) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  for (let i = 0; i < data.length; i += channels) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    let a = (luma - 60) / 40 // <60 transparent, >100 opaque
    a = a < 0 ? 0 : a > 1 ? 1 : a
    data[i + 3] = Math.round(a * 255)
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(out)
}

const finish = (src, n) =>
  sharp(src)
    .trim()
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(`${d}/${n}.opt.png`)

;(async () => {
  for (const n of darkBgOnes) {
    const tmp = `${d}/_${n}_keyed.png`
    await keyOutDark(`${d}/${n}.png`, tmp)
    await finish(tmp, n)
    fs.rmSync(tmp)
  }
  for (const n of transparentOnes) {
    await finish(`${d}/${n}.png`, n)
  }
  for (const n of [...darkBgOnes, ...transparentOnes]) {
    fs.rmSync(`${d}/${n}.png`)
    fs.renameSync(`${d}/${n}.opt.png`, `${d}/${n}.png`)
    console.log(n.padEnd(20), Math.round(fs.statSync(`${d}/${n}.png`).size / 1024) + 'KB')
  }
})()
