import uuidv4 from 'uuid/v4'
import Joi from '@hapi/joi'
import moment from 'moment'
import BaseModel from './BaseModel'

export default class FlowModel extends BaseModel {
  static get tableName () {
    return process.env.FLOWS_TABLE
  }

  static get organizationIdWebhookIdIndex () {
    return process.env.FLOW_ORGANIZATION_ID_WEBHOOK_ID_INDEX_NAME
  }

  static get hashKey () {
    return 'organizationId'
  }

  static get rangeKey () {
    return 'id'
  }

  static get createSchema () {
    return Joi.object({
      id: Joi.string().default(uuidv4()),
      organizationId: Joi.string.required(),
      name: Joi.string.required(),
      createdAt: Joi.number().default(moment().unix())
    })
  }

  static findByWebHookId (organizationId, webhookId, options = {}) {
    const indexOptions = {
      indexName: this.organizationIdWebhookIdIndex,
      range: { eq: { webhookId } }
    }

    const dbOptions = Object.assign({}, indexOptions, options)

    return this.allBy(this.hashKey, organizationId, dbOptions).then((flows) => {
      return flows.items.pop()
    })
  }
}
