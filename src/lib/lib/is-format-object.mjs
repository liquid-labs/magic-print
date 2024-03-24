import omit from 'lodash/omit'

const isFormatObject = (obj) => {
  if (typeof obj !== 'object') {
    return false
  }

  const testResult = omit(obj, ['colors', 'format', 'noColor', 'out', 'rawText', 'separator', 'style', 'width'])
  return Object.keys(testResult).length === 0
}

export { isFormatObject }
