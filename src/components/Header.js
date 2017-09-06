import React, {Component} from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {MuiThemeProvider} from 'material-ui/styles'

var colorable = require('colorable');

var colors = {
	red: 'red',
	green: 'green',
	blue: 'blue'
};
var result = colorable(colors, {compact: true, threshold: 0});


class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			welcome: "Добро пожаловать на сайт!",
			clicked: 0,
			value: 3,
		};


		this.db_click = this.db_click.bind(this);
	}

	render() {
		//alert('909');

		return (

			<Toolbar>
				<ToolbarGroup firstChild={true}>
					<DropDownMenu value={this.state.value} onChange={this.handleChange}>
						<MenuItem value={1} primaryText="All Broadcasts"/>
						<MenuItem value={2} primaryText="All Voice"/>
						<MenuItem value={3} primaryText="All Text"/>
						<MenuItem value={4} primaryText="Complete Voice"/>
						<MenuItem value={5} primaryText="Complete Text"/>
						<MenuItem value={6} primaryText="Active Voice"/>
						<MenuItem value={7} primaryText="Active Text"/>
					</DropDownMenu>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarTitle text="Options"/>
					<FontIcon className="muidocs-icon-custom-sort"/>
					<ToolbarSeparator/>
					<RaisedButton label="Create Broadcast" primary={true}/>
					<IconMenu
						iconButtonElement={
							<IconButton touch={true}>
								<NavigationExpandMoreIcon/>
							</IconButton>
						}
					>
						<MenuItem primaryText="Download"/>
						<MenuItem primaryText="More Info"/>
					</IconMenu>
				</ToolbarGroup>
			</Toolbar>

		);
	}

	db_click(e) {
		let counter = this.state.clicked;
		counter++;
		this.setState({clicked: counter});
		console.log(e);
		console.log(result);

	}
}

Header.defaultProps = {name: 'Tegos 909'};

export default Header;
