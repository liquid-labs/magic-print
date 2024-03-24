import { getPrinter } from '../lib'

const print = getPrinter({ format : 'json', width : 80 })

const obj = { a : 'b', b : 12, c : true, d : [false, 'abc', 123], null : null, undefined }

print('JSON:', obj)

print('YAML:', obj, { format : 'yaml' })

print('<red>red<blue>blue<rst>')
