import React, { Component } from "react"
import styled from "styled-components"

import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  margin: 3em;
`

class Tree extends Component {

  constructor() {
    super()
    window.actions = {
      updateTreeRepresentation: parentUuid => {
        const newTree = JSON.parse(JSON.stringify(NodeUtil.mapComponentToNode(this.state.treeRepresentation)))
        newTree.uuid = UuidUtil.generateUuid()
        NodeUtil.findNodeByUuidDos(newTree, parentUuid, targetNode => {
          const randomUuid = UuidUtil.generateUuid()
          targetNode.children.push({
            key: randomUuid,
            uuid: randomUuid,
            depth: targetNode.depth + 1,
            content: "I'm a new node.",
            children: []
          })
        })
        this.setState({
          treeRepresentation: NodeUtil.mapNodeToComponent(newTree)
        })
       
      }
    }
    this.state = {
      treeRepresentation: null
    }
  }

  componentDidMount() {
    const f = fetch("../static/data/data2.json").then(res => res.text())
    f.then(res => {
      const tree = JSON.parse(res)[0]
      this.setState({
        treeRepresentation: NodeUtil.mapNodeToComponent(tree)
      })
    })
  }
  componentDidUpdate() {
  }

	render() {
		return (
      <Wrapper>
        {this.state.treeRepresentation}
      </Wrapper>
		)
	}
}

export default Tree