import uuidv4 from 'uuid/v4'
import Joi from '@hapi/joi'
import moment from 'moment'
import BaseModel from './BaseModel'

export default class FlowNodeModel extends BaseModel {
  static get tableName () {
    return process.env.FLOW_NODES_TABLE
  }

  static get hashKey () {
    return 'flowId'
  }

  static get rangeKey () {
    return 'id'
  }

  static get createSchema () {
    return Joi.object({
      id: Joi.string().default(uuidv4()),
      flowId: Joi.string.required(),
      organizationId: Joi.string.required(),
      rootId: Joi.string.required(),
      parentId: Joi.string.required(),
      childrenIds: Joi.string.required(),
      typeOf: Joi.string.required(),
      paused: Joi.string.required(),
      rootPaused: Joi.string.required(),
      api: Joi.string.required(),
      actions: Joi.string.required(),
      authId: Joi.string.required(),
      meta: Joi.string.required(),
      createdAt: Joi.number().default(moment().unix())
    })
  }
}
