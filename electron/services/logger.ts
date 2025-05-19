// By default, it writes logs to the following locations:
/**
 *  on Linux: ~/.config/{app name}/logs/main.log
    on macOS: ~/Library/Logs/{app name}/main.log
    on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
 */
import * as logger from 'electron-log/main'
import path from 'node:path'
import { isDev } from 'ele/config'

const loggerConfig = {
  fileName: 'log.log',
  format: '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}',
}

function setLogger() {
  logger.transports.file.fileName = loggerConfig.fileName
  logger.transports.file.format = loggerConfig.format
  if (isDev) {
    logger.transports.file.level = isDev ? 'silly' : 'verbose'
    logger.transports.file.resolvePathFn = () => path.resolve(process.cwd(), './debug/log.log')
  }

  logger.initialize()
}

setLogger()

Object.assign(console, logger.functions)

export default logger
