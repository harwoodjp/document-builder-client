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

function findNodeByUuidAndInsertChild(parentNode, uuid, newNode) {
  if (parentNode.uuid === uuid) {
    parentNode.children.push(newNode)
    // console.log(`inserted node under ${parent.content}`)
  } else {
    if (parentNode.children.length > 0) {
      parentNode.children.forEach(child => {
        findNodeByUuidAndInsertChild(child, uuid, newNode)
      })
    }
  }
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
  findNodeByUuidAndInsertChild,
  mapNodeToComponent,
  hasChildren,
  dummyNode,
  dummyNodeComponent
}