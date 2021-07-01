'use strict'

import App from './App'
import Api from './Api'

async function getFlowContext (event, context, callback) {
  try {
    App.configureLogger(event, context)
    App.logger().info({
      message: 'getFlowContext',
      meta: event
    })

    const data = await Api.getFlow(event)

    context.done(null, data)
  } catch (err) {
    App.logger().error({
      message: err,
      meta: err
    })

    context.done(err, null)
  }
}

async function getFlowNodeContext (event, context, callback) {
  try {
    App.configureLogger(event, context)
    App.logger().info({
      message: 'getFlowNodeContext',
      meta: event
    })

    const data = await Api.getFlowNodeContext(event)

    context.done(null, data)
  } catch (err) {
    App.logger().error({
      message: err,
      meta: err
    })

    context.done(err, null)
  }
}

export default {
  getFlowContext,
  getFlowNodeContext
}
