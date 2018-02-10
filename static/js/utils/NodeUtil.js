import React from "react"

import Node from "../components/Node"

function printChildren(node) {
  const hasChildren = node.children.length > 0
  if (hasChildren) {
    node.children.forEach(child => {
      console.log(child.content)
      printChildren(child)
    })
  }
}

function mapNodeToComponent(node) {
  return <Node
    key = { node.guid }
    guid = { node.guid }
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

function dummyNode(parent) {
  return (
    {
      dummy: true,
      guid: Math.floor(Math.random() * 9999),
      index: parent.props.children.length,
      depth: parent.props.depth + 1,
      content: "I'm a new node.",
      children: []
    }
  )
}

function dummyNodeComponent(parent) {
  const randomGuid = Math.floor(Math.random() * 9999)  
  return <Node
    dummy = { true }
    key = { randomGuid }
    guid = { randomGuid }
    index = { parent.props.children.length }
    depth = { parent.props.depth + 1 }
    content = { "I'm a new node." }
    children = { [] }
    />
}

module.exports = {
  printChildren,
  mapNodeToComponent,
  hasChildren,
  dummyNode,
  dummyNodeComponent
}