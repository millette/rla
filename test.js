'use strict'
import test from 'ava'
import { srilinka, supportedTypes, supportedCdns } from './'

test('types', t => t.deepEqual(supportedTypes, ['css', 'js']))

test('cdns', t => t.deepEqual(supportedCdns, ['jsdelivr', 'unpkg']))

test('srilinka jsdelivr vega', async t => {
  const name = 'vega'
  const cdn = 'jsdelivr'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '4.4.0')
  t.is(result.license, 'BSD-3-Clause')
  const jsdelivr = result.jsdelivr[0]
  t.is(jsdelivr.integrity, 'sha512-SrrDWjnhZdtyWsG1uE0UWonbdxlLt47J46RtfgYGlwLwAdBQuzYX9i0+uTzjyqILlRY1oVvnDDvNwtWRlD9yMA==')
  t.is(jsdelivr.type, 'js')
})

test('srilinka unpkg vega', async t => {
  const name = 'vega'
  const cdn = 'unpkg'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '4.4.0')
  t.is(result.license, 'BSD-3-Clause')
  const unpkg = result.unpkg[0]
  t.is(unpkg.integrity, 'sha512-SrrDWjnhZdtyWsG1uE0UWonbdxlLt47J46RtfgYGlwLwAdBQuzYX9i0+uTzjyqILlRY1oVvnDDvNwtWRlD9yMA==')
  t.is(unpkg.type, 'js')
})

test('srilinka jsdelivr vega-tooltip', async t => {
  const name = 'vega-tooltip'
  const cdn = 'jsdelivr'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '0.14.0')
  t.is(result.license, 'BSD-3-Clause')
  const [js, css] = result.jsdelivr

  t.is(js.integrity, 'sha512-F3dQV2erE+qyktrt25B/QJrPpqgN3EgzLBMyypalzN/NFLQwWOajYwYnWVWgmHGgGFVCwiopoZXOVJmVirJkZQ==')
  t.is(js.type, 'js')
  t.is(css.integrity, 'sha512-4jy3EXFlpzzKw6zq4OKKh+scrgo4p/t96SBLsne2v9mBLZhduHFChFg5KZ9f1Y8mJq1NicRMb34bMyHZARiemw==')
  t.is(css.type, 'css')
})

test('error, bad packages', async t => t.throwsAsync(srilinka(), 'Packages should be an array of strings.'))
test('error, bad pkg#2', async t => t.throwsAsync(srilinka({ packages: [true] }), 'Packages should be an array of strings.'))
test('error, bad cdn', async t => t.throwsAsync(srilinka({ packages: ['vega'], cdn: 'bob' }), 'CDN not supported.'))
test('error, bad hash', async t => t.throwsAsync(srilinka({ packages: ['vega'], hash: 'bob' }), 'Hash not supported.'))
