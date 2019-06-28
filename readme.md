# srilinka
[![Build Status](https://travis-ci.org/millette/srilinka.svg?branch=master)](https://travis-ci.org/millette/srilinka)
[![Coverage Status](https://coveralls.io/repos/github/millette/srilinka/badge.svg?branch=master)](https://coveralls.io/github/millette/srilinka?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/srilinka.svg)](https://gemnasium.com/github.com/millette/srilinka)
> Generate SRI links for npm resources thru a CDN.

## CURRENTLY BROKEN
*`skrlinka` hasn't kept up with the changes at npmjs.com and is thus currently in a broken state.*

## Install
```
$ npm install --save srilinka
```

## Example
```js
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
```

## License
[AGPL-v3][]

© 2018 [Robin Millette](http://robin.millette.info)

[AGPL-v3]: LICENSE.md
