import { assignIfDefined } from '../assign-if-defined'

describe('assignIfDefined', () => {
  test('assigns defined values like Object.assign', () => {
    const argsA = [{}, { a : 1, b : 2 }, { b : 3, c : 2 }]
    const argsB = structuredClone(argsA)
    const assignObj = Object.assign(...argsA)
    const assignIfDefinedObj = assignIfDefined(...argsB)

    expect(assignObj).toEqual(assignIfDefinedObj)
  })

  test('does not assign fields with undefined values', () => {
    const argsA = [{}, { a : 1, b : 2 }, { b : undefined, c : undefined }]
    const argsB = structuredClone(argsA)
    const assignObj = Object.assign(...argsA)
    const assignIfDefinedObj = assignIfDefined(...argsB)

    expect(assignObj.b).toBe(undefined)
    expect('c' in assignObj).toBe(true)
    expect(assignIfDefinedObj.b).toBe(2)
    expect('c' in assignIfDefinedObj).toBe(false)
  })
})
