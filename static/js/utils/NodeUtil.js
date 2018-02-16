import React from "react"

function findNodeByUuid(currentNode, targetUuid, callback) {
  if (currentNode.key === targetUuid) {
    callback(currentNode)
  } else {
    currentNode.children.forEach(childNode => {
      findNodeByUuid(childNode, targetUuid, callback)
    })
  }
}
function findNodeParentByUuid(currentNode, targetUuid, callback) {
  currentNode.children.forEach(childNode => {
    if (childNode.uuid === targetUuid) {
      callback(currentNode)
    }
  })
  currentNode.children.forEach(childNode => {
    findNodeParentByUuid(childNode, targetUuid, callback)
  })
}

function mapNodeToComponent(node) {
  return <Node
    key = { node.uuid }
    uuid = { node.uuid }
    index = { node.index }
    depth = { node.depth }
    content = { node.content }
    children = { node.children }
  />
}

function mapComponentToNode(component) {
  return {
    key: component.props.uuid,
    uuid: component.props.uuid,
    index: component.props.index,
    depth: component.props.depth,
    content: component.props.content,
    children: component.props.children
  }
}

function dummyNode(parentNode) {
  const randomUuid = UuidUtil.generateUuid()   
  return (
    {
      dummy: true,
      key: randomUuid,
      uuid: randomUuid,
      index: parentNode.props.children.length,
      depth: parentNode.props.depth + 1,
      content: "I'm a new node.",
      children: []
    }
  )
}

function dummyNodeComponent(parentNode) {
  const randomUuid = UuidUtil.generateUuid() 
  return <Node
    dummy = { true }
    key = { randomUuid }
    uuid = { randomUuid }
    index = { parentNode.props.children.length }
    depth = { parentNode.props.depth + 1 }
    content = { "I'm a new node." }
    children = { [] }
    />
}

module.exports = {
  findNodeByUuid,
  findNodeParentByUuid,  
  mapNodeToComponent,
  mapComponentToNode,  
  dummyNode,
  dummyNodeComponent
}

import Node from "../components/Node"
