import omit from 'lodash/omit'

const isFormatObject = (obj) => {
  if (typeof obj !== 'object') {
    return false
  }

  const testResult = omit(obj, [
    'colors',
    'format',
    'hangingIndent', // wrap-text-plus
    'ignoreTags', // wrap-text-plus
    'indent', // wrap-text-plus
    'noColor',
    'out',
    'prefix', // wrap-text-plus
    'rawText',
    'separator',
    'smartIndent', // wrap-text-plus
    'style',
    'width' // wrap-text-plus
  ])
  return Object.keys(testResult).length === 0 && Object.keys(obj).length > 0
}

export { isFormatObject }
