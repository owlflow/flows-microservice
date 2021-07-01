import FlowModel from './FlowModel'

async function getFlow (event) {
  if (event.webhookId) {
    return FlowModel.findByWebHookId(event.organizationId, event.webhookId)
  }
  return FlowModel.get(event.organizationId, event.id)
}

const Flows = {
  getFlow: getFlow
}

export default Flows
