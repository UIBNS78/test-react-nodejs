import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import CarList from './components/cars';
import Navigation from './components/app-bar';
import './App.css'
import { connect } from 'react-redux'

class App extends Component {
	
	componentDidMount = () => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			this.props.dispatch({ type: 'RESTORE_USER', payload: { user } })
		}
	}
	
	
	render() {
		return (
			<BrowserRouter>
				<Navigation />
				<div className="container">
					<Route exact path="/" component={CarList} />
					<Route path="*">
						<Redirect to="/" />
					</Route>
				</div>
			</BrowserRouter>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: payload => dispatch(payload)
	}
}

export default connect(null, mapDispatchToProps)(App);