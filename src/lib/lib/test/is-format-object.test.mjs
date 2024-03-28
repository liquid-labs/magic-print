import { isFormatObject } from '../is-format-object'

describe('isFormatObject', () => {
  test.each([
    [{ format : 'yaml' }, true],
    [{}, false],
    [{ blah : true }, false],
    [{ blah : true, format : 'json' }, false]])('%p is format object: %p', (obj, result) => {
    expect(isFormatObject(obj)).toBe(result)
  })
})
