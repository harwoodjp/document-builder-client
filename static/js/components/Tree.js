import React, { Component } from "react"
import styled from "styled-components"

import TreeUtil from "../utils/TreeUtil"
import NodeUtil from "../utils/NodeUtil"
import UuidUtil from "../utils/UuidUtil"

const Wrapper = styled.div`
  line-height: 2;  
  margin: 3em;
`
const SaveButton = styled.button`
  background: none;
  float: right;
`

class Tree extends Component {
  constructor() {
    super()
    window.actions = {
      updateTreeRepresentation: TreeUtil.updateTreeRepresentation.bind(this)
    }
    this.state = {
      treeRepresentation: null
    }
  }

  componentDidMount() {
    const f = fetch("../static/data/data2.json").then(res => res.text())
    f.then(res => {
      const tree = JSON.parse(res)
      this.setState({
        treeRepresentation: NodeUtil.mapNodeToComponent(tree)
      })
    })
  }

	render() {
		return (
      <Wrapper>
        <SaveButton onClick={() => { TreeUtil.saveTreeRepresentation.bind(this)() }}>Save</SaveButton>
        {this.state.treeRepresentation}
      </Wrapper>
		)
	}
}

export default Tree