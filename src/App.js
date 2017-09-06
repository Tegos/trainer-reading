import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

import {RaisedButton, Dialog, FlatButton} from 'material-ui'
import {MuiThemeProvider} from 'material-ui/styles'

injectTapEventPlugin();

class App extends Component {

	constructor() {
		super();

		this.state = {
			open: false
		}
	}

	render() {
		const standardActions = (
			<FlatButton label="Ok" primary={true} onTouchTap={this.handleRequestClose}/>
		);
		const standardActions0 = (
			<FlatButton label="Ok" primary={true} onTouchTap={this.handleRequestClose}/>
		);

		return (
			<MuiThemeProvider muiTheme={this.muiTheme}>
				<div>
					<h1>Material-UI</h1>
					<h2>example project</h2>
					<RaisedButton label="Super Secret Password" secondary={true} onTouchTap={this.handleTouchTap}/>

					<Dialog open={this.state.open} title="Super Secret Password"
					        actions={[standardActions, standardActions0]}
					        onRequestClose={this.handleRequestClose}>1-2-3-4-5</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}

	handleTouchTap = () => {
		this.setState({
			open: true
		})
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		})
	}
}

export default App;
