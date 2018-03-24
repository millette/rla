'use strict'
import test from 'ava'
import { srilinka, supportedTypes, supportedCdns } from './'

test('types', t => t.deepEqual(supportedTypes, ['css', 'js']))

test('cdns', t => t.deepEqual(supportedCdns, ['jsdelivr', 'unpkg']))

test('srilanka jsdelivr vega', async t => {
  const name = 'vega'
  const cdn = 'jsdelivr'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '3.2.1')
  t.is(result.license, 'BSD-3-Clause')
  const jsdelivr = result.jsdelivr[0]
  t.is(jsdelivr.integrity, 'sha512-RhgZ2MzuuqeiZCsjO78rKwermqTCaWkDlMtOOT2VbosRUY40RX4xY+Im6k7CxgAIRz1IWua7E/hQw22VSmUNkQ==')
  t.is(jsdelivr.type, 'js')
})

test('srilanka unpkg vega', async t => {
  const name = 'vega'
  const cdn = 'unpkg'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '3.2.1')
  t.is(result.license, 'BSD-3-Clause')
  const unpkg = result.unpkg[0]
  t.is(unpkg.integrity, 'sha512-RhgZ2MzuuqeiZCsjO78rKwermqTCaWkDlMtOOT2VbosRUY40RX4xY+Im6k7CxgAIRz1IWua7E/hQw22VSmUNkQ==')
  t.is(unpkg.type, 'js')
})

test('srilanka jsdelivr vega-tooltip', async t => {
  const name = 'vega-tooltip'
  const cdn = 'jsdelivr'
  const [result] = await srilinka({ packages: [name], cdn })
  t.is(result.id, name)
  t.is(result.version, '0.7.0')
  t.is(result.license, 'BSD-3-Clause')
  const [js, css] = result.jsdelivr
  t.is(js.integrity, 'sha512-opOIMRBcu8K87y0JQRjNu+dh2hUk8vtaxm+gi/5/JlwbNpSWxjL6PR6h/HLjB5NquZs5lonCr89bVoKSf/+DzQ==')
  t.is(js.type, 'js')
  t.is(css.integrity, 'sha512-UVNKIlG1I6FEO6sK4O5maQ3io2w3mlhkxUv9Y9Sr0Go1MA+mrRHrJh83d+Dlafxt6RxU3hTsp5yJYAFHx5/n6w==')
  t.is(css.type, 'css')
})

test('error, bad packages', async t => t.throws(srilinka(), 'Packages should be an array of strings.'))
test('error, bad pkg#2', async t => t.throws(srilinka({ packages: [true] }), 'Packages should be an array of strings.'))
test('error, bad cdn', async t => t.throws(srilinka({ packages: ['vega'], cdn: 'bob' }), 'CDN not supported.'))
test('error, bad hash', async t => t.throws(srilinka({ packages: ['vega'], hash: 'bob' }), 'Hash not supported.'))
