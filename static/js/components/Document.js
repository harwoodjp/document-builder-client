import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import Node from "./Node"
import NodeUtil from "../utils/NodeUtil"

const Wrapper = styled.div`
  margin: 1em;
`

class Document extends Component {
  constructor() {
    super()
    this.state = { nodes: [] }
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
        { this.state.nodes }
      </Wrapper>
    )
  }
}

export default Document