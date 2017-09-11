import React, {Component} from 'react';

import {Range} from 'rc-slider';
import $ from 'jquery';
import './ReaderZone.css';
import Mark from 'mark.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Header from './Header';

import Mousetrap from "mousetrap";


class ReaderZone extends Component {
	fileUploader;

	constructor() {
		super();
		this.state = {
			text: `Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English 
			to emphasise design elements over content. It's also called placeholder (or filler) text. 
			It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. 
			Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. 
			Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical;
			 it's not genuine, correct, or comprehensible Latin anymore. 
			 While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. 
			 As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, 
			 and others are often inserted randomly to mimic the typographic appearence of European languages, 
			 as are digraphs not to be found in the original.

In a professional context it often happens that private or corporate clients corder a publication to be made and presented 
with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. 
However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. 
The are likely to focus on the text, disregarding the layout and its elements. Besides, 
random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. 
Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century.`,
			marginLeft: 100,
			marginRight: 100,
			widthWindow: 500,
			heightWindow: 500,
			rangeValue: [10, 10],
			fontSize: 14,
			textAlign: 'left',
			speed: 900,
			intervalId: null,
			status: 0, // 0 - stop, 1 - run
			currentPositionText: 0,
			contextOfText: null,
			instanceMark: null,
			menuValue: 0,
			messageDialogOpen: false,
			messageDialogText: ''
		};


		// bind events
		this.updateDimensions = this.updateDimensions.bind(this);
		this.handleToRun = this.handleToRun.bind(this);
		this.handleFromMenu = this.handleFromMenu.bind(this);
		this.handleToUpdate = this.handleToUpdate.bind(this);


	}

	options = {
		element: 'span',
		className: 'mark animate'
	};


	render() {
		const header = <Header handleFromMenu={this.handleFromMenu} handleToRun={this.handleToRun}
		                       speed={this.state.speed} fontSize={this.state.fontSize}
		                       handleToUpdate={this.handleToUpdate}/>;

		return (
			<div>
				{header}
				<div style={{overflow: 'hidden'}}>
					<Range allowCross={false} step={1} min={1} max={this.state.widthWindow}
					       value={this.state.rangeValue}
					       className="rangeSlider"
					       railStyle={{backgroundColor: 'black'}}
					       trackStyle={[{backgroundColor: 'rgb(0, 188, 212)'}]}
					       handleStyle={[{backgroundColor: '#f0f0f0'}, {backgroundColor: '#f0f0f0'}]}
					       onChange={this.onSliderChange}
					/>
				</div>
				<div id={'reader_zone_wrap'}>
					<div className="unselectable" style={{
						marginLeft: this.state.marginLeft,
						marginRight: this.state.widthWindow - this.state.marginRight,
						fontSize: this.state.fontSize,
						textAlign: this.state.textAlign
					}} id={'reader_zone'}>
						<div>
							{this.state.text}
						</div>
					</div>
				</div>
				<input accept="text/plain" type="file" id="fileUploader" ref={(input) => {
					this.fileUploader = input;
				}} style={{display: 'none'}}/>
				<Dialog
					title="Error"
					actions={<RaisedButton primary={true} onClick={this.handleCloseMessageDialog} label="Ok"/>}
					open={this.state.messageDialogOpen}
				>
					{this.state.messageDialogText}
				</Dialog>
			</div>


		);
	}

	componentDidMount() {
		const _t = this;
		window.addEventListener('resize', this.updateDimensions);

		let contextOfText = document.querySelector('#reader_zone div');
		let instanceMark = new Mark(contextOfText);
		this.setState({
			contextOfText,
			instanceMark
		});

		document.addEventListener('paste', function (event) {

			_t.processingPastText(event);
			return false;

		});

		document.getElementById('fileUploader').addEventListener('change', this.processingFileUpload, false);
	}

	updateDimensions() {
		const width = parseInt($(window).width(), 10);
		const height = parseInt($(window).height(), 10);


		this.setState({
			widthWindow: width,
			heightWindow: height
		});

		this.setState(function (prevState) {
			return {
				marginRight: width - prevState.marginLeft
			};
		}, function () {
			this.setState({
				rangeValue: [this.state.marginLeft, this.state.marginRight]
			});
		});


	}

	componentWillMount() {
		const _t = this;
		this.updateDimensions();


		Mousetrap.bind(['command+o', 'ctrl+o'], function () {
			_t.openFileUpload();
			return false;
		});

		Mousetrap.bind('f5', function () {
			_t.resetHighLightText();
			return false;
		});

	};


	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
	}

	onSliderChange = (value) => {
		this.setState({
			marginLeft: +value[0],
			marginRight: +value[1],
			rangeValue: value
		});
	};

	handleToUpdate(update) {
		console.log(update);
		this.setState(update);
	}

	handleToRun(status) {
		if (status) {
			this.runHighLightText();
		} else {
			this.stopHighLightText();
		}
		this.setState({
			status
		});
	}

	highLightText = () => {


		let lengthText = this.state.text.length;
		let speed = this.state.speed; // per min
		let lengthHighLight = parseInt(speed / 60, 10);
		let instanceMark = this.state.instanceMark;

		let i = this.state.currentPositionText;

		if (i > lengthText) {
			this.stopHighLightText();
		}

		instanceMark.markRanges([{
			start: i,
			length: lengthHighLight
		}], this.options);

		this.setState({
			currentPositionText: i + lengthHighLight
		});


	};

	runHighLightText = () => {
		this.highLightText();
		const intervalId = setInterval(this.highLightText, 1000);
		this.setState(
			{
				intervalId: intervalId
			}
		);
	};

	stopHighLightText = () => {
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
		this.setState({
			status: 0
		})
	};

	resetHighLightText = () => {
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
		this.setState({
			status: 0,
			currentPositionText: 0

		});

		//let lengthText = this.state.text.length;
		let instanceMark = this.state.instanceMark;
		instanceMark.unmark();

	};

	handleFromMenu(menu) {
		this.setState({
			menuValue: menu
		});

		let method = this.getTableMenuMethods(menu);

		if (method) {
			method();
		}
	}


	getTableMenuMethods(menu) {
		let table = {
			1: this.openFileUpload,
			2: this.triggerProcessingPastText,
			3: this.resetHighLightText
		};
		return table[menu];
	}

	openFileUpload = () => {
		this.fileUploader.click();
	};

	triggerProcessingPastText = () => {

	};

	processingFileUpload = (event) => {
		const _t = this;
		let file = event.target.files[0];
		if (file && file.type.match('text.*')) {
			const r = new FileReader();
			console.dir(file);
			r.onload = function (e) {
				const contents = e.target.result;
				console.log(contents);
				_t.resetHighLightText();
				_t.setState({
					text: contents
				})
			};
			r.readAsText(file);
		} else {
			_t.setState({
				messageDialogText: 'Failed to load file. Please select correct text file',
				messageDialogOpen: true
			});
		}
	};

	processingPastText = (e) => {
		const _t = this;

		e.stopPropagation();
		e.preventDefault();

		const clipText = e.clipboardData.getData('Text');

		if (clipText && clipText.length) {
			_t.resetHighLightText();
			_t.setState({
				text: clipText
			})
		} else {
			_t.setState({
				messageDialogText: 'Failed to past text. Please try again',
				messageDialogOpen: true
			});
		}
	};

	handleCloseMessageDialog = () => {
		this.setState({messageDialogOpen: false});
	};


}

export default ReaderZone;
