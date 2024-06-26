import colorizeJSON from 'json-colorizer'
import colorizeYAML from 'prettyoutput'
import { wrap } from 'wrap-text-plus'

import { formatTerminalText } from '@liquid-labs/terminal-text'

import { assignIfDefined } from './assign-if-defined'
import { isFormatObject } from './lib/is-format-object'

const getPrinter = (options = {}) => {
  const boundPrint = (...outputs) => {
    print(options, ...outputs)
  }

  boundPrint.withOptions = (addOptions) => {
    const totalOpts = { ...options, ...addOptions }
    return (...outputs) => print(totalOpts, ...outputs)
  }

  boundPrint.width = options.width || 80

  return boundPrint
}

const print = (options, ...outputs) => {
  let effectiveOptions = options || {}
  if (outputs.length > 1) {
    const lastOutput = outputs[outputs.length - 1]
    if (isFormatObject(lastOutput)) {
      const overrideOptions = outputs.pop()
      effectiveOptions = assignIfDefined({}, options, overrideOptions)
    }
  }

  const {
    // colors,
    format,
    noColor = false,
    out = process.stdout,
    // rawText = false,
    separator = '\n',
    // style,
    width = 80,
    ...downstreamOptions
  } = effectiveOptions

  let first = true
  for (const output of outputs) {
    if (first === false) {
      out.write(separator)
    }

    if (typeof output !== 'string') {
      if (format === 'json') {
        out.write(colorizeJSON(output, { pretty : true, colors : { NULL_LITERAL : 'grey' } }))
      } else { // YAML by default
        if (Array.isArray(output) && output.length === 0) {
          out.write('[]') // prettyoutput prints '(empty array)' in this case. Which, we don't want.
        } else {
          const yamlOutput = colorizeYAML(output,
            { colors : { keys : 'magenta', number : 'green', string : 'yellow', true : 'cyan', false : 'cyan' } })
            .trim() // colorizeYAML ends with a newline, which is counter to the workings of colorizeJSON and text
          out.write(yamlOutput)
        }
      }
    } else { // then it's a string
      // TODO: we assume there's no option overlap...
      out.write(wrap(formatTerminalText(output, { noColor, ...downstreamOptions }), { width, ...downstreamOptions }))
    }

    first = false
  }
}

export { getPrinter }
