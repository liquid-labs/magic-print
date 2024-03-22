import colorizeJSON from 'json-colorizer'
import colorizeYAML from 'prettyoutput'
import { wrap } from 'wrap-text-plus'

import { formatTerminalText } from '@liquid-labs/terminal-text'

const getPrinter = (options) => {
  return (...outputs) => {
    print(options, ...outputs)
  }
}

const print = (options, ...outputs) => {
  let effectiveOptions = options
  if (outputs.length > 1) {
    const lastOutput = outputs[outputs.length - 1]
    if (typeof lastOutput === 'object' && lastOutput.__magicPrintOptions === true) {
      const overrideOptions = outputs.pop()
      effectiveOptions = Object.assign({}, options, overrideOptions)
    }
  }

  const {
    colors, 
    format, 
    noColor = false, 
    out = process.stdout, 
    rawText = false, 
    separator = '\n', 
    style,
    width = 80
  } = effectiveOptions

  let first = true
  for (const output of outputs) {
    if (first === false) {
      out.write(separator)
    }

    if (typeof output !== 'string') {
      if (format === 'json') {
        out.write(colorizeJSON(output, { pretty: true, colors: { NULL_LITERAL: 'grey' } }))
      }
      else if (format === 'yaml') {
        out.write(colorizeYAML(output, { colors: { keys: 'magenta', number: 'green', string: 'yellow', true: 'cyan', false: 'cyan' }}))
      }
    } // then it's a string
    else {
      out.write(wrap(formatTerminalText(output), { noColor, width }))
    }

    first = false
  }
}

export { getPrinter }