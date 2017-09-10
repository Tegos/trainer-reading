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


let colorable = require('colorable');

let colors = {
	red: 'red',
	green: 'green',
	blue: 'blue'
};
let result = colorable(colors, {compact: true, threshold: 0});


class Header extends Component {
	handleToUpdate;

	constructor(props) {
		super();
		this.state = {
			activeMenu: 2
		};

		this.handleToUpdate = props.handleToUpdate;

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
						<div style={{width: 200, marginTop: 6}}>
							<Slider style={{height: 56}} defaultValue={1}/>
						</div>
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
				<Toolbar style={{marginTop: 1}}>
					<ToolbarGroup>

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


}

export default Header;
