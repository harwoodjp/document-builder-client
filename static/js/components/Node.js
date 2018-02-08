import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  line-height: 1.75;
  border: 2px dashed #c62828;
  padding: .5em;
`

class Node extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log(this.props.content)
  }
	render() {
    return (
      <Wrapper 
        style={ 
          { 
            marginLeft: `${this.props.depth * 2}em`,
            marginTop: `${ this.props.depth == 0 ? 1 : 0 }em`
          } 
      }>
        {/* Index: { this.props.index }, &nbsp;
        Depth: { this.props.depth }, &nbsp; */}
        {/*Content: */} { this.props.content } &nbsp;
        { this.props.children } 
      </Wrapper>
    )
  }
}

export default Node