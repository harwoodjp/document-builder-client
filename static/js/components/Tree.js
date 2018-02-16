import React, { Component } from "react"
import styled from "styled-components"

import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  line-height: 2;  
  margin: 3em;
`
const SaveButton = styled.button`
  background: none;
  float: right;
`

class Tree extends Component {
  updateTreeRepresentation(clickedUuid, ACTION_TYPE) {
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
            content: "I'm a new node.",
            children: []
          })
        })
        break
      case "UPDATE":
        const contentValue = window.prompt("Please type new content value:")
        NodeUtil.findNodeByUuid(newTree, clickedUuid, targetNode => {
          if (contentValue.length > 1) {
            targetNode.content = contentValue
          }
        })
        break
      case "DELETE":
        NodeUtil.findNodeParentByUuid(newTree, clickedUuid, targetNodeParent => {
          for (let i = 0; i < targetNodeParent.children.length; i++) {
            if (targetNodeParent.children[i].uuid === clickedUuid) {
              targetNodeParent.children.splice(i, 1)
            }
          }
        })
        break
    }
    this.setState({
      treeRepresentation: NodeUtil.mapNodeToComponent(newTree)
    })
  }

  saveTreeRepresentation() {
    console.log(this.state.treeRepresentation)
  }

  constructor() {
    super()
    window.actions = {
      updateTreeRepresentation: this.updateTreeRepresentation.bind(this)
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
  componentDidUpdate() {}

	render() {
		return (
      <Wrapper>
        <SaveButton onClick={() => {this.saveTreeRepresentation()}}>Save</SaveButton>
        {this.state.treeRepresentation}
      </Wrapper>
		)
	}
}

export default Tree