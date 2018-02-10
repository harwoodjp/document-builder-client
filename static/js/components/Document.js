import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import Node from "./Node"
import NodeUtil from "../utils/NodeUtil"

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
    this.state = { nodes: [] }
  }
  saveNodes() {
    console.log(this.state)
  }
  componentDidMount() {
    const f = fetch("/static/data.json").then(res => res.text())
    f.then(res => {
      const nodes = JSON.parse(res)
      const map = nodes.map(node => {
        return NodeUtil.mapNodeToComponent(node)
      })
      this.setState({ nodes: map })
    })
  }

  componentDidUpdate() {
    console.log("Document has updated.")
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