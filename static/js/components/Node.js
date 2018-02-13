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
  button {
    background: transparent;
    cursor: pointer;
    // display: none;
  }
`
const AddButton = styled.button`
  span {
    position: relative;
    top: 3px;
  }
`
const EditButton = styled.button`
  span {
    position: relative;
    top: 1px;
  }  
`

const DeleteButton = styled.button`

`

class Node extends Component {
  constructor() {
    super()
    this.state = {
      active: true,
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

  addNode(thisNode) {
    const newNode = NodeUtil.dummyNode(thisNode)
    const children = thisNode.state.children.concat(NodeUtil.mapNodeToComponent(newNode))
    this.setState({children: children })
    window.actions.updateJsonRepresentatio
    window.actions.updateJsonRepresentation(thisNode, newNode, "INSERT")
  }

  editNode(thisNode) {
    const newContent = prompt("Set content to...")
    if (newContent != null) this.setState({ content: newContent })
    const updatedNode = NodeUtil.mapComponentToNode(thisNode)
    updatedNode.content = newContent
    window.actions.updateJsonRepresentation(thisNode, updatedNode, "UPDATE")    
  }

  deleteNode(thisNode) {
    console.log(thisNode)
    this.setState({ active: false })
  }

	render() {
    if (this.state.active) {
      return (
        <Wrapper style = { { marginLeft: `${this.props.depth * 2}em` }}>
          {this.state.content}
            <ActionButtons>
              <AddButton onClick = { () => this.addNode(this) }><span>&#8627;</span></AddButton> 
              {this.state.content != null &&
                <EditButton onClick = { () => this.editNode(this) }><span>&#9998;</span></EditButton>
              }
              {this.state.content != null &&
                <DeleteButton onClick = { () => this.deleteNode(this) }><span>-</span></DeleteButton>
              }
            </ActionButtons>
          {this.state.children}
        </Wrapper>
      )
    } else {
      return null
    }
  }
}

export default Node