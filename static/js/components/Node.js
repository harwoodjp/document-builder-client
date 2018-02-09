import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import NodeUtil from "../utils/NodeUtil"

const Wrapper = styled.div`
  line-height: 1.75;
  // border: 1px dashed #c62828;
  padding: .5em;
  &: hover {
    button {
      display: inline;
    }
  }
`
const AddButton = styled.button`
  background: transparent;
  cursor: pointer;
  display: none;
`

class Node extends Component {
  constructor() {
    super()
    this.state = { children: [] }
  }
  componentDidMount() {
    let children = []
    if (this.props.children.length > 0) {
      this.props.children.forEach(child => {
        children.push(NodeUtil.mapNodeToComponent(child))
      })
    }
    this.setState({ children: children })
  }

  componentDidUpdate() {
    console.log("updated")
  }

  addNode() {
    this.props.children.push(NodeUtil.dummyNode(this))
    this.setState({children: this.props.children })
  }
	render() {
    return (
      <Wrapper style = { { marginLeft: `${this.props.depth * 2}em` }}>
        {this.props.content} <AddButton onClick = { () => this.addNode() }>+</AddButton>
        {this.state.children}
      </Wrapper>
    )
  }
}

export default Node