import React, { Component } from "react"
import ReactDOM from "react-dom"

import Document from "./Document"

// TODO: Make it an actual router

class Router extends Component {
	render() {
		return (
			<Document />
		)
	}
}

ReactDOM.render(<Router />, document.querySelector("#app"))