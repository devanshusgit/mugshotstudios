import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve('public/images')
const MAX_W = 800 // people photos display small; 800px is plenty incl. retina

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))

for (const file of files) {
  const full = path.join(dir, file)
  const before = (await stat(full)).size
  const ext = path.extname(file).toLowerCase()
  const tmp = full + '.tmp'

  let pipeline = sharp(full).resize({ width: MAX_W, withoutEnlargement: true })
  if (ext === '.png') {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true })
  } else {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true })
  }

  await pipeline.toFile(tmp)
  await unlink(full)
  await rename(tmp, full)

  const after = (await stat(full)).size
  const pct = (((before - after) / before) * 100).toFixed(0)
  console.log(`${file.padEnd(24)} ${(before / 1024).toFixed(0).padStart(5)} KB -> ${(after / 1024).toFixed(0).padStart(4)} KB  (-${pct}%)`)
}
