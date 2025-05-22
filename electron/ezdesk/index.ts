import { require, __dirname } from 'ele/config'
import { resourcePath } from 'ele/config'
import { join } from 'node:path'

const nodePath = join(resourcePath, 'ezdesk.node')
const ezdesk = require(nodePath)
console.log(ezdesk)

class EZDesk {}

export default EZDesk
