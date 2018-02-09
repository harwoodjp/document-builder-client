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

module.exports = {
  printChildren,
  mapNodeToComponent
}