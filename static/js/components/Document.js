import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import Node from "./Node"
import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  margin: 2em;
`
const DocumentTools = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const SaveButton = styled.button`
  background: transparent;
  cursor: pointer;
  padding: .25em;
`

class Document extends Component {
  constructor() {
    super()
    this.state = { nodes: [], nodesJson: "" }
    this.jsonRepresentation = ""
    window.actions = { 
      updateJsonRepresentation: this.updateJsonRepresentation.bind(this)
    }
  }

  saveNodes() {
    console.log(this.jsonRepresentation)
  }

  updateJsonRepresentation(parentNode, newNode, ACTION_TYPE) {
    const parentUuid = parentNode.props.uuid
    const nodes = JSON.parse(this.jsonRepresentation)
    nodes.forEach(node => {
      switch(ACTION_TYPE) {
        case "INSERT":
          NodeUtil.findNodeByUuid(node, parentUuid, parentNode => {
            parentNode.children.push(newNode)
          })
          break
        case "UPDATE":
          NodeUtil.findNodeByUuid(node, newNode.uuid, foundNode => {
            foundNode.content = newNode.content
          })
          break
        case "DELETE":
          NodeUtil.findNodeParentByUuid(node, parentUuid, foundParentNode => {
            foundParentNode.children.forEach(childNode => {
              if (childNode.uuid == parentUuid) {
                foundParentNode.children.pop(childNode)
              }
            })
            console.log()
          })      
          break
      }
    })
    this.jsonRepresentation = JSON.stringify(nodes)
  }

  componentDidMount() {
    const f = fetch("/static/data/data2.json").then(res => res.text())
    f.then(res => {
      const nodes = JSON.parse(res)
      this.jsonRepresentation = JSON.stringify(nodes)
      const map = nodes.map(node => {
        return NodeUtil.mapNodeToComponent(node)
      })
      this.setState({ nodes: map })
    })
  }

	render() {
    return (
      <Wrapper>
        <DocumentTools>
          <SaveButton onClick={ () => this.saveNodes() }>Save</SaveButton>
        </DocumentTools>
        { this.state.nodes }
      </Wrapper>
    )
  }
}

export default Document