import React, {Component} from 'react';

import $ from 'jquery';

import MenuItem from 'material-ui/MenuItem';
import {Slider} from 'material-ui';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';


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

	constructor(props) {
		super();
		this.state = {
			activeMenu: 2,
			sliderSpeedValue: +props.speed
		};

		this.handleToUpdate = props.handleToUpdate;
		this.handleToRun = props.handleToRun;

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
						              secondary={true}
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


		);
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


}

export default Header;
