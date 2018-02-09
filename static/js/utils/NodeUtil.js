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
  return  <Node
    key = { "random" }
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
  dummyNode
}