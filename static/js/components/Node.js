import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  line-height: 1.75;
  border: 1px dashed #c62828;
  padding: .5em;
`

class Node extends Component {
  constructor() {
    super()
    this.state = { children: [], selected: false }
  }
	render() {
    return (
      <Wrapper style = { { marginLeft: `${this.props.depth * 2}em` }}>
        {this.props.content}
      </Wrapper>
    )
  }
}

export default Node