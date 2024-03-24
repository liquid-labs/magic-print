import { isFormatObject } from '../is-format-object'

describe('isFormatObject', () => {
  test.each([[{ format : 'yaml' }, true], [{}, true], [{ blah : true }, false]])('%p is format object: %p', (obj, result) => {
    expect(isFormatObject(obj)).toBe(result)
  })
})
