import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CarList from './components/cars';
import Navigation from './components/app-bar';
import './App.css'
import { connect } from 'react-redux'
import Users from './components/admin/users';
import Cars from './components/admin/cars';

function PrivateRoute({ children, ...rest }) {
	const user = JSON.parse(localStorage.getItem('user'))
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user && user.role === 'admin') {
					return children
				} else {
					return (
						<Redirect
							to={{
								pathname: "/list",
								state: { from: location }
							}}
						/>
					)
				}
			}}
		/>
	);
  }

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
					<Switch>
						<PrivateRoute path="/list-user">
							<Users />
						</PrivateRoute>
						<PrivateRoute path="/list-car">
							<Cars />
						</PrivateRoute>
						<Route path="/list" component={CarList} />
						<Route exact path="/">
							<Redirect to="/list" />
						</Route>

						{/* <Route path="*">
							<Redirect to="/page-not-found" />
						</Route> */}
					</Switch>
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