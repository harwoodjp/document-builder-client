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

const ActionButtons = styled.div`
  margin-left: .5em;
  display: inline;
`
const AddButton = styled.button`
  background: transparent;
  cursor: pointer;
  display: none;
  span {
    position: relative;
    top: 3px;
  }
`
const EditButton = styled.button`
  background: transparent;
  cursor: pointer;
  display: none;
  span {
    position: relative;
    top: 1px;
  }  
`

class Node extends Component {
  constructor() {
    super()
    this.state = {
      content: "",
      children: [] 
    }
  }

  componentDidMount() {
    let children = []
    if (this.props.children.length > 0) {
      this.props.children.forEach(child => {
        children.push(NodeUtil.mapNodeToComponent(child))
      })
    }
    this.setState({
      content: this.props.content,
      children: children 
    })
  }

  addNode(parentNode) {
    const newNode = NodeUtil.dummyNode(parentNode)
    const children = parentNode.state.children.concat(NodeUtil.mapNodeToComponent(newNode))
    this.setState({children: children })
    window.actions.updateJsonRepresentation(parentNode, newNode)
  }

  editNode(node) {
    const newContent = prompt("Set content to...")
    if (newContent != null) {
      this.setState({ content: newContent })
    }
  }

	render() {
    return (
      <Wrapper style = { { marginLeft: `${this.props.depth * 2}em` }}>
        {this.state.content} 
          <ActionButtons>
            <AddButton onClick = { () => this.addNode(this) }><span>&#8627;</span></AddButton> 
            {this.state.content != null &&
              <EditButton onClick = { () => this.editNode(this) }><span>&#9998;</span></EditButton>
            }
          </ActionButtons>
        {this.state.children}
      </Wrapper>
    )
  }
}

export default Node