const options = require('./sdk.config.json')
const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

for (const [package, config] of Object.entries(options.clients)) {
  const sourceDirectory = config?.src || package
  const sourceGlob = path.join(config?.src || package, '**/*.ts')

  chokidar.watch(sourceGlob).on('change', () => {
    for (const opts of config.out) {
      const target = path.join(opts.dir, sourceDirectory)
      if (opts.js) {
        esbuild.build({
          entryPoints: [path.join(sourceDirectory, 'index.ts')],
          bundle: true,
          outfile: path.join(target, 'index.js'),
          platform: opts.platform,
          ...opts.platform === 'node' && { format: 'cjs' }
        })
      } else {
        fs.cpSync(sourceDirectory, target, { recursive: true })
      }
    }
  })
}
