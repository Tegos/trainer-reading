import React, {Component} from 'react';

import $ from 'jquery';

import MenuItem from 'material-ui/MenuItem';
import {Slider} from 'material-ui';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';


import PlayCircle from 'react-mdi/icons/play-circle';
import PauseCircle from 'react-mdi/icons/pause-circle';
import FormatAlignCenter from 'react-mdi/icons/format-align-center';
import FormatAlignLeft from 'react-mdi/icons/format-align-left';
import FormatAlignRight from 'react-mdi/icons/format-align-right';
import FormatAlignJustify from 'react-mdi/icons/format-align-justify';

import NumberInput from 'material-ui-number-input';


class Header extends Component {
	handleToUpdate;
	handleToRun;
	handleFromMenu;

	constructor(props) {
		super();
		this.state = {
			activeMenu: 0,
			sliderSpeedValue: +props.speed
		};

		this.handleToUpdate = props.handleToUpdate;
		this.handleToRun = props.handleToRun;
		this.handleFromMenu = props.handleFromMenu;

		// event for font size input
		this.onChangeFontSize = (event, value) => {
			const e = event;
			const min = +e.target.min;
			const max = +e.target.max;
			value = +value;
			if (min <= value && value <= max) {
				this.handleToUpdate({
					fontSize: value
				});
			}
		};

		this.handleOfButtonTextAlign = this.handleOfButtonTextAlign.bind(this);
	}

	render() {

		const {onChangeFontSize} = this;

		return (

			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<IconMenu
							menuStyle={{width: 250}}
							onChange={this.handleChangeMenu}
							iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}>
							<MenuItem value="1" primaryText="Open file" secondaryText="Ctrl + O"/>
							<MenuItem value="2" primaryText="Paste" secondaryText="Ctrl + V"/>
							<Divider/>
							<MenuItem value="3" primaryText="Reset" secondaryText="F5"/>
						</IconMenu>
						<ToolbarSeparator/>
					</ToolbarGroup>

					<ToolbarGroup>
						<div style={{marginRight: 5}}>
							<span>Speed: &nbsp;</span>
							<b style={{
								width: 40,
								display: 'inline-block'
							}}><span>{this.state.sliderSpeedValue}</span></b>
						</div>
						<div style={{width: 200, marginTop: 12, marginLeft: 10}}>
							<Slider onChange={this.handleSliderSpeed} step={1} min={900} max={10000}
							        style={{height: 56}}
							        defaultValue={this.state.sliderSpeedValue}/>
						</div>
						<RaisedButton data-run="1" onClick={this.handleOfButtonRun}
						              primary={true}
						              icon={
							              <PlayCircle className="button_icons"/>
						              }
						/>
						<RaisedButton data-run="0" onClick={this.handleOfButtonRun}
						              primary={true}
						              icon={
							              <PauseCircle className="button_icons"/>
						              }
						/>
						<ToolbarSeparator/>

					</ToolbarGroup>

					<ToolbarGroup>
						<NumberInput
							floatingLabelText="Enter Font Size"
							hintText="Font Size"
							id="input_font_size"
							floatingLabelFixed={false}
							defaultValue={+this.props.fontSize}
							min={10}
							max={30}
							required={true}
							strategy="warn"
							onChange={onChangeFontSize}
						/>
						<ToolbarSeparator/>

					</ToolbarGroup>

					<ToolbarGroup>
						<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
							<RaisedButton onClick={this.handleOfButtonTextAlign} data-value="left"
							              label={<FormatAlignLeft className="button_icons"/>}
							              style={{display: 'inline-block', width: 'auto', marginRight: 3}}/>
							<RaisedButton onClick={this.handleOfButtonTextAlign} data-value="center"
							              label={<FormatAlignCenter className="button_icons"/>}
							              style={{display: 'inline-block', width: 'auto', marginRight: 3}}/>
							<RaisedButton onClick={this.handleOfButtonTextAlign} data-value="justify"
							              label={<FormatAlignJustify className="button_icons"/>}
							              style={{display: 'inline-block', width: 'auto', marginRight: 3}}/>
							<RaisedButton onClick={this.handleOfButtonTextAlign} data-value="right"
							              label={<FormatAlignRight className="button_icons"/>}
							              style={{display: 'inline-block', width: 'auto'}}/>
						</div>
					</ToolbarGroup>
				</Toolbar>

			</div>


		)
	}

	handleOfButtonTextAlign(event) {
		const button = $(event.target).closest('button');
		const align = button.data('value');

		this.handleToUpdate({
			textAlign: align
		});
	}

	handleSliderSpeed = (event, value) => {
		this.setState({sliderSpeedValue: value});
		this.handleToUpdate({
			speed: value
		});
	};

	handleOfButtonRun = (event) => {
		const button = $(event.target).closest('button');
		const status = +button.data('run');

		this.handleToRun(status);
	};

	handleChangeMenu = (event, value) => {
		this.setState({
			activeMenu: +value,
		});
		this.handleFromMenu(value);
	};




}

export default Header;
