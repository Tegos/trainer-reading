import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
//import './App.css';
import styled from 'styled-components';

import {RaisedButton, Dialog, FlatButton, RadioButton, RadioButtonGroup} from 'material-ui';
import {MuiThemeProvider} from 'material-ui/styles';
import Header from './components/Header';

import Slider from 'material-ui/Slider';
import AppBar from 'material-ui/AppBar';
import {Range} from 'rc-slider';

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
					<Range min={1} value={[2, 30]}/>
					<table style={{width: '100%'}}>
						<tr>
							<td>
								<div>
									{sliderForArea}
								</div>
							</td>
							<td></td>
							<td>
								<div>
									{sliderForArea}
								</div>
							</td>
						</tr>
					</table>

					<div className="row">
						<div className="col-md-2">
							Type:
						</div>
						<div className="col-md-10">
							<RadioButtonGroup
								className="row"
								name="type">
								<RadioButton
									className="col-md-4"
									value="other"
									label="Other"/>
								<RadioButton
									className="col-md-4"
									value="custom"
									label="Custom"/>
							</RadioButtonGroup>
						</div>
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
