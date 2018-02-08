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
  }
	render() {
    return (
      <Wrapper>
        <Node 
          key = { "001" }
          children = {[ 
            <Node 
              key = { "002" }
              children = { [
                <Node 
                  key = { "003" }
                  parent = { this }
                  children = { [] }
                  index = { 1 }
                  depth = { 2 }
                  content = "Mac"
                />                  
              ]}
              index = { 0 }
              depth = { 1 }
              content = "Environment Setup"
            />,
            <Node 
              key = { "004" }
              children = { [] }
              index = { 1 }
              depth = { 1 }
              content = "Helpful Packages"
            />             
          ]}
          index = { 0 }
          depth = { 0 }
          content = "Chapter 1: Introduction"
        />
        <Node 
          key = { "001" }
          children = {[ 
            <Node 
              key = { "002" }
              children = { [
                <Node 
                  key = { "003" }
                  children = { [] }
                  index = { 1 }
                  depth = { 2 }
                  content = "Hello, World"
                />                  
              ]}
              index = { 0 }
              depth = { 1 }
              content = "First Program"
            />,
            <Node 
              key = { "004" }
              children = { [] }
              index = { 1 }
              depth = { 1 }
              content = "Loops and Iteration"
            />             
          ]}
          index = { 0 }
          depth = { 0 }
          content = "Chapter 2: First Steps"
        />
      </Wrapper>
    )
  }
}

export default Document