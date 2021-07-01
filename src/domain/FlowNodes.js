import FlowNodeModel from './FlowNodeModel'

async function getNodeContext (event) {
  return FlowNodeModel.get(event.flowId, event.id)
}

const FlowNodes = {
  getNodeContext
}

export default FlowNodes
