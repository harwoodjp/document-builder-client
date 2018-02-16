import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

function updateTreeRepresentation(clickedUuid, ACTION_TYPE) {
  const newTree = JSON.parse(JSON.stringify(NodeUtil.mapComponentToNode(this.state.treeRepresentation)))
  newTree.uuid = UuidUtil.generateUuid()
  switch(ACTION_TYPE) {
    case "INSERT":
      NodeUtil.findNodeByUuid(newTree, clickedUuid, targetNode => {
        const randomUuid = UuidUtil.generateUuid()
        targetNode.children.push({
          key: randomUuid,
          uuid: randomUuid,
          depth: targetNode.depth + 1,
          content: ".",
          children: []
        })
      })
      break
    case "UPDATE":
      const contentValue = window.prompt("Please type new content value:")
      NodeUtil.findNodeByUuid(newTree, clickedUuid, targetNode => {
        if (contentValue.length > 0) {
          targetNode.content = contentValue
        }
      })
      break
    case "DELETE":
    if (newTree.key === clickedUuid) {
      newTree.children = []
    } else {
      NodeUtil.findNodeParentByUuid(newTree, clickedUuid, targetNodeParent => {
        for (let i = 0; i < targetNodeParent.children.length; i++) {
          if (targetNodeParent.children[i].uuid === clickedUuid) {
            targetNodeParent.children.splice(i, 1)
          }
        }
      })  
    }
    break
  }
  this.setState({
    treeRepresentation: NodeUtil.mapNodeToComponent(newTree)
  })
}

function saveTreeRepresentation() {
  const json = JSON.stringify(NodeUtil.mapComponentToNode(this.state.treeRepresentation))
  console.log(json)
}


module.exports = {
  updateTreeRepresentation,
  saveTreeRepresentation  
}