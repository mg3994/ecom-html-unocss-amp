import fs from 'node:fs'
import path from 'node:path'
import { createGenerator } from 'unocss'
import unoConfig from '../uno.config.js'

async function build() {
  const uno = await createGenerator(unoConfig)
  const rootDir = process.cwd()
  const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'))

  console.log(`Found ${htmlFiles.length} HTML file(s) to build CSS for: ${htmlFiles.join(', ')}`)

  for (const file of htmlFiles) {
    const filePath = path.join(rootDir, file)
    let content = fs.readFileSync(filePath, 'utf-8')

    // Generate CSS for the current HTML file content
    const res = await uno.generate(content, { id: filePath })
    const generatedCss = res.css

    // Replace or insert <style amp-custom> in the HTML file head
    const styleRegex = /<style amp-custom[\s\S]*?<\/style>/i
    const newStyleTag = `<style amp-custom>\n${generatedCss}\n</style>`

    if (styleRegex.test(content)) {
      content = content.replace(styleRegex, newStyleTag)
    } else {
      content = content.replace('</head>', `${newStyleTag}\n</head>`)
    }

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`[CSS Build] Updated ${file} with ${generatedCss.length} bytes of compiled AMP CSS.`)
  }
}

build().catch(err => {
  console.error('Build CSS failed:', err)
  process.exit(1)
})
