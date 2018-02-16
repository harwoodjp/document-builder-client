import React, { Component } from "react"
import styled from "styled-components"

import NodeUtil from "../utils/NodeUtil"

const Wrapper = styled.div``

class Node extends Component {

  constructor() {
    super()
    this.state = {
      children: []
    }
  }

  componentDidMount() {
    const children = []
    this.props.children.forEach(childNode => {
      children.push(<Node
        key = {childNode.uuid}
        uuid = {childNode.uuid}
        depth = {childNode.depth}
        content = {childNode.content}
        children = {childNode.children}
      />)
    })
    this.setState({ children })
  }

	render() {
		return (
      <Wrapper style = {{marginLeft: `2em`}}>
        {this.props.content} <span onClick = {() => window.actions.updateTreeRepresentation(this.props.uuid)}>+</span>
        {this.state.children}
      </Wrapper>
		)
	}
}

export default Node