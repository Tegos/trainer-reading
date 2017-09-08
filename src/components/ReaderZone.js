import React, {Component} from 'react';

import {Range} from 'rc-slider';
import $ from 'jquery';
import './ReaderZone.css';

import Header from './Header';

let colorable = require('colorable');

let colors = {
	red: 'red',
	green: 'green',
	blue: 'blue'
};
let result = colorable(colors, {compact: true, threshold: 0});


class ReaderZone extends Component {

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
			fontSize: 14
		};


		// bind events
		this.db_click = this.db_click.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);


	}


	render() {
		const header = <Header fontSize={this.state.fontSize} handleToUpdate={this.handleToUpdate.bind(this)}/>;

		return (
			<div>
				{header}
				<div style={{overflow: 'hidden'}}>
					<Range allowCross={false} step={1} min={1} max={this.state.widthWindow}
					       value={this.state.rangeValue}
					       onChange={this.onSliderChange}
					/>
				</div>
				<div style={{
					marginLeft: this.state.marginLeft,
					marginRight: this.state.widthWindow - this.state.marginRight,
					fontSize: this.state.fontSize
				}} id={'reader_zone'}>
					<div>
						{this.state.text}
					</div>
				</div>
			</div>

		);
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		const width = parseInt($(window).width());
		const height = parseInt($(window).height());


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


		console.log(this.state.rangeValue);
	}

	componentWillMount() {

		this.updateDimensions();
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	db_click(e) {
		let counter = this.state.clicked;
		counter++;
		this.setState({clicked: counter});
		console.log(e);
		console.log(result);

	}

	onSliderChange = (value) => {
		console.log(value);
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
}

export default ReaderZone;
