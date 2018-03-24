# srilinka
[![Build Status](https://travis-ci.org/millette/srilinka.svg?branch=master)](https://travis-ci.org/millette/srilinka)
[![Coverage Status](https://coveralls.io/repos/github/millette/srilinka/badge.svg?branch=master)](https://coveralls.io/github/millette/srilinka?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/srilinka.svg)](https://gemnasium.com/github.com/millette/srilinka)
> Generate SRI links for npm resources thru a CDN.

## Install
```
$ npm install --save srilinka
```

## Usage
```js
const rollodeqcGhUser = require('srilinka');

rollodeqcGhUser('unicorns');
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhUser(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License
[AGPL-v3][]

© 2018 [Robin Millette](http://robin.millette.info)

[AGPL-v3]: LICENSE.md
