import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

import {RaisedButton, Dialog, FlatButton} from 'material-ui';
import {MuiThemeProvider} from 'material-ui/styles';
import Header from './components/Header';

import Slider from 'material-ui/Slider';
import AppBar from 'material-ui/AppBar';

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

		const header = <Header/>;
		//console.log(header);

		const sliderForArea = (
			<div style={{width: '100%'}}>
				<Slider/>
			</div>
		);

		return (
			<MuiThemeProvider muiTheme={this.muiTheme}>
				<div>
					<AppBar title="Trainer of speed reading with marks"
					        showMenuIconButton={false}/>
					{header}
					<h2>Material-UI</h2>
					<div>
						{sliderForArea}
					</div>
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
