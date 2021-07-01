/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^winston\.." }] */
import winston, { format } from 'winston'

const logConfig = { logLevel: 'error' }
let loggerInstance = null

const configureLogger = (event, context) => {
  logConfig.functionName = context.functionName
  logConfig.functionVersion = context.functionVersion
  logConfig.awsRequestId = context.awsRequestId
  logConfig.logLevel = event.logLevel || process.env.LOG_LEVEL || 'error'
}

const logger = () => loggerInstance || buildLogger()

const buildLogger = (options) => {
  const opts = Object.assign({}, logConfig, options)
  if (process.env.NODE_ENV === 'test') {
    loggerInstance = new winston.createLogger()
  } else {
    loggerInstance = new winston.createLogger({
      level: opts.logLevel,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
        }),
        format.printf(info => {
          return `${info.timestamp} ${opts.awsRequestId} ${info.level.toUpperCase()}: ${(info.message ? info.message : '')} ${(info.meta && Object.keys(info.meta).length ? `:${JSON.stringify(info.meta)}` : '')}`
        })
      ),
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          humanReadableUnhandledException: true,
          prettyPrint: true,
          json: false
        })
      ],
      exitOnError: false
    })
  }
  return loggerInstance
}

export default {
  configureLogger,
  logger
}
