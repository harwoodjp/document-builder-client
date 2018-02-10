import React, { Component } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as BrowserRouter, Route, Link } from "react-router-dom"

import Document from "./Document"

// TODO: Make it an actual router

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route exact path="/" component={ Document } />
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<Router />, document.querySelector("#app"))