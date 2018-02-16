import React, { Component } from "react"
import styled from "styled-components"

import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  &:hover {
    button {
      display: inline;
    }
  }
`

const ActionButton = styled.button`
  background-color: transparent;
  span {
  }
`

const Content = styled.div`
  display: inline;
  margin-right: 1em;
`

const DepthIcon = styled.span`
  position: relative;
  top: 3px;
`

const EditIcon = styled.span`
  position: relative;
  top: 1px;
`

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
        
        <Content>{this.props.content}</Content>
        
        <ActionButton 
          onClick = {() => window.actions.updateTreeRepresentation(this.props.uuid, "INSERT")}>
          <DepthIcon>&#8627;</DepthIcon>
        </ActionButton>

        {this.props.content && 
          <ActionButton 
            onClick = {() => window.actions.updateTreeRepresentation(this.props.uuid, "UPDATE")}>
            <EditIcon>&#9998;</EditIcon>
          </ActionButton>
        }

        <ActionButton 
          onClick = {() => window.actions.updateTreeRepresentation(this.props.uuid, "DELETE")}>
          -
        </ActionButton>

        {this.state.children}
      </Wrapper>
		)
	}
}

export default Node