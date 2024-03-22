import { getPrinter } from '../magic-print'
import { StringOut } from '../string-out'

describe("getPrinter's print function", () => {
  test('wraps text to 80 columns by default', () => {
    const input = "abcd ".repeat(16) + "abcd"
    const stringOut = new StringOut()
    const print = getPrinter({ out: stringOut })

    print(input)
    const [ firstLine, secondLine ] = stringOut.string.split('\n')
    expect(firstLine).toHaveLength(79)
    expect(secondLine).toHaveLength(4)
  })
})