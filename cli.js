'use strict'

// self
const { srilinka, supportedTypes, supportedCdns } = require('.')

const packages = ['vega', 'vega-lite', 'vega-embed', 'vega-tooltip']
const cdn = 'unpkg'

console.error('Supported types:', supportedTypes.join(', '))
console.error('Supported CDNs:', supportedCdns.join(', '))
console.error(`Linking to latest ${packages.join(', ')} on ${cdn}.`)

srilinka({ packages, cdn })
  .then((output) => console.log(JSON.stringify(output)))
  .catch(console.error)
