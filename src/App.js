import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';


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
