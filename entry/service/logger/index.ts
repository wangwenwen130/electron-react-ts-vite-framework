import logger from 'electron-log/renderer'


console.error = logger.error
console.info = logger.info


export default logger
