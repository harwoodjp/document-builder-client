import React from "react"

import Node from "../components/Node"
import UuidUtil from "../utils/UuidUtil"

function printChildren(node) {
  const hasChildren = node.children.length > 0
  if (hasChildren) {
    node.children.forEach(child => {
      console.log(child.content)
      printChildren(child)
    })
  }
}

function findNodeByUuid(parentNode, uuid, action) {
  if (parentNode.uuid === uuid) {
    action(parentNode)
  } else {
    if (parentNode.children.length > 0) {
      parentNode.children.forEach(childNode => {
        findNodeByUuid(childNode, uuid, action)
      })
    }
  }
}

function findNodeParentByUuid(node, uuid, action) {
  node.children.forEach(child => {
    if (child.uuid == uuid) {
      action(node)
    } 
  })
  node.children.forEach(child => {
    findNodeParentByUuid(child, uuid, action)
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

function hasChildren(node) {
  if (node.props.length > 0) {
    return true
  } else {
    return false
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
  printChildren,
  findNodeByUuid,
  findNodeParentByUuid,  
  mapNodeToComponent,
  mapComponentToNode,  
  hasChildren,
  dummyNode,
  dummyNodeComponent
}