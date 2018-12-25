'use strict'

// core
const { getHashes, createHash } = require('crypto')
const { extname } = require('path')
const { URL, URLSearchParams } = require('url')

// npm
const got = require('got')

const attribs = (o) => {
  const a = ['crossorigin="anonymous"']
  for (let r in o) { if (r !== 'url') { a.push(`${r}="${o[r]}"`) } }
  return a.sort().join(' ')
}

const supported = {
  css: (o) => ({ html: `<link ${attribs({ rel: 'stylesheet', href: o.url, integrity: o.integrity })}>`, ...o }),
  js: (o) => ({ html: `<script ${attribs({ src: o.url, integrity: o.integrity })}></script>`, ...o })
}

const hashIt = (u, hash) => new Promise((resolve, reject) => {
  const bufs = []
  got.stream(u).pipe(createHash(hash))
    .on('data', (chunk) => bufs.push(chunk))
    .once('end', () => resolve([hash, Buffer.concat(bufs).toString('base64')].join('-')))
    .once('error', reject)
})

const cdnPaths = {
  jsdelivr: async (hash, x, path) => {
    const url = `https://cdn.jsdelivr.net/npm/${x.id}@${x.version}/${path}`
    const type = extname(url).slice(1)
    if (!supported[type]) { return }
    const integrity = await hashIt(url, hash)
    return supported[type]({ url, integrity, type })
  },
  unpkg: async (hash, x, path) => {
    const url = `https://unpkg.com/${x.id}@${x.version}/${path}`
    const type = extname(url).slice(1)
    if (!supported[type]) { return }
    const integrity = await hashIt(url, hash)
    return supported[type]({ url, integrity, type })
  }
}

const cdns = (cdn, hash, x) => Promise.all(x[cdn].map(cdnPaths[cdn].bind(null, hash, x)))
  .then((res) => {
    res = res.filter(Boolean)
    if (!res.length) { return }
    x[cdn] = res
    return x
  })

const getPackages = (cdn, { body }) => body.rows.map(({ id, value }) => {
  const { version, description, license } = value
  const cdnFiles = [value[cdn]]
  // TODO: add more exceptions...
  if (id === 'vega-tooltip') { cdnFiles.push('vega-tooltip.min.css') }
  const ret = { id, version, description, license }
  ret[cdn] = cdnFiles
  return ret
})

// IDEA: use this couchdb view for dog-fooding in step#2
const u = new URL('https://skimdb.npmjs.com/registry/_design/app/_view/byField')

// sha384 and sha256 can also be used
const srilinka = ({ packages, cdn = 'unpkg', hash = 'sha512' } = {}) => {
  let err
  hash = hash.toLowerCase()
  const hashes = getHashes().map((x) => x.toLowerCase())
  if (hashes.indexOf(hash) === -1) {
    err = new Error('Hash not supported.')
    err.hash = hash
    return Promise.reject(err)
  }

  cdn = cdn.toLowerCase()
  const cdnsTmp = Object.keys(cdnPaths).map((x) => x.toLowerCase())
  if (cdnsTmp.indexOf(cdn) === -1) {
    err = new Error('CDN not supported.')
    err.cdn = cdn
    return Promise.reject(err)
  }

  if (!packages || !Array.isArray(packages)) {
    return Promise.reject(new Error('Packages should be an array of strings.'))
  }

  packages.forEach((name) => {
    if (err) { return }
    if (!name || typeof name !== 'string') {
      err = new Error('Packages should be an array of strings.')
      err.package = { name, type: typeof name }
    }
  })
  if (err) { return Promise.reject(err) }

  u.search = new URLSearchParams({ keys: JSON.stringify(packages) })
  return got(u, { json: true })
    .then(getPackages.bind(null, cdn))
    .then((data) => Promise.all(data.map(cdns.bind(null, cdn, hash))))
    .then((x) => x.filter(Boolean))
}

module.exports = { srilinka, supportedCdns: Object.keys(cdnPaths).sort(), supportedTypes: Object.keys(supported).sort() }
