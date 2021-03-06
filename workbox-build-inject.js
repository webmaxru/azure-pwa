const {injectManifest} = require('workbox-build')

let workboxConfig = {
  globDirectory: 'dist/azure-pwa',
  globPatterns: [
    'favicon.ico',
    'index.html',
    '*.css',
    '*.js'
  ],
  swSrc: 'src/service-worker.js',
  swDest: 'dist/azure-pwa/service-worker.js'
}

injectManifest(workboxConfig)
  .then(({count, size}) => {
    console.log(`Generated ${workboxConfig.swDest}, which will precache ${count} files, totaling ${size} bytes.`)
  })
