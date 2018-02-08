import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import Node from "./Node"

const Wrapper = styled.div`
  margin: 1em;
  width: 30em;
  margin: 0 auto;
  
`

class Document extends Component {
  constructor() {
    super()
    this.state = { nodes: [] }
  }
  componentDidMount() {
    const f = fetch("/static/data2.json").then(res => res.text())
    f.then(res => {
      const data = JSON.parse(res)
      const map = data.map(node => {
        return <Node 
          key = { node.guid } 
          content = { node.content } 
          depth = { node.depth }
        />
      })
      this.setState({
        nodes: map
      })  
    })
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