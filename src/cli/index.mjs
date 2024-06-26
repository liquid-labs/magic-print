import { getPrinter } from '../lib'

const print = getPrinter({ allowOverflow : true, format : 'json', width : 80 })

const obj = { a : 'b', b : 12, c : true, d : [false, 'abc', 123], null : null, undefined }

print('JSON:', obj, '')

print('YAML:', obj, '', { format : 'yaml' })

print('YAML/empty aray:', [], '', { format : 'yaml' })

print('YAML/empty object:', {}, '', { format : 'yaml' })

print('<red>red<blue>blue<rst>\n')

print('hi there, this line should wrap, butthisreallylongwordshouldoverflow yay\n', { width : 10 })
