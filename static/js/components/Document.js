import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import Node from "./Node"
import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  margin: 1em;
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
    console.log(JSON.parse(this.jsonRepresentation))
  }

  updateJsonRepresentation(parentNode, newNode) {
    const parentUuid = parentNode.props.uuid
    const nodes = JSON.parse(this.jsonRepresentation)

    nodes.forEach(node => {
      NodeUtil.findNodeByUuidAndInsertChild(node, parentUuid, newNode)
    })
    
    this.jsonRepresentation = JSON.stringify(nodes)
    console.log(this.jsonRepresentation)
  }

  componentDidMount() {
    const f = fetch("/static/data/data.json").then(res => res.text())
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