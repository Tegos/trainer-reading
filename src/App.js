import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';


import {RaisedButton, Dialog, FlatButton, RadioButton, RadioButtonGroup} from 'material-ui';
import {MuiThemeProvider} from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';


import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import ReaderZone from './components/ReaderZone';

injectTapEventPlugin();


class App extends Component {

	constructor() {
		super();

		this.state = {
			open: false
		}
	}

	render() {


		return (
			<MuiThemeProvider>
				<div>
					<AppBar title="Trainer of speed reading with marks"
					        showMenuIconButton={false}/>


					<ReaderZone/>


					{/*<RaisedButton label="Super Secret Password" secondary={true} onTouchTap={this.handleTouchTap}/>*/}

					{/*<Dialog open={this.state.open} title="Super Secret Password"*/}
					{/*actions={[standardActions, standardActions0]}*/}
					{/*onRequestClose={this.handleRequestClose}>1-2-3-4-5</Dialog>*/}
				</div>
			</MuiThemeProvider>
		);
	}

	componentDidMount() {
		//alert('909');
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
