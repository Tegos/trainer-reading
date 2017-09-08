import React, {Component} from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {fullWhite} from 'material-ui/styles/colors';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';


import PlayCircle from 'react-mdi/icons/play-circle';
import PauseCircle from 'react-mdi/icons/pause-circle';

const iconStyles = {
	marginRight: 24,
};


let colorable = require('colorable');

let colors = {
	red: 'red',
	green: 'green',
	blue: 'blue'
};
let result = colorable(colors, {compact: true, threshold: 0});


class Header extends Component {
	constructor() {
		super();
		this.state = {
			activeMenu: 2
		};
	}

	render() {

		return (

			<Toolbar>
				<ToolbarGroup firstChild={true}>
					<DropDownMenu value={this.state.activeMenu} onChange={this.handleChange}>
						<MenuItem value={1} primaryText="All Broadcasts"/>
						<MenuItem value={2} primaryText="All Voice"/>
						<MenuItem value={3} primaryText="All Text"/>
						<MenuItem value={4} primaryText="Complete Voice"/>
						<MenuItem value={5} primaryText="Complete Text"/>
						<MenuItem value={6} primaryText="Active Voice"/>
						<MenuItem value={7} primaryText="Active Text"/>
					</DropDownMenu>
					<ToolbarSeparator/>
				</ToolbarGroup>

				<ToolbarGroup>
					<RaisedButton
						primary={true}
						icon={
							<PlayCircle className="button_icons"/>
						}
					/>
					<RaisedButton
						secondary={true}
						icon={
							<PauseCircle className="button_icons"/>
						}
					/>
					<ToolbarSeparator/>

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
}

export default Header;
