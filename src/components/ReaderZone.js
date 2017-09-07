import React, {Component} from 'react';


var colorable = require('colorable');

var colors = {
	red: 'red',
	green: 'green',
	blue: 'blue'
};
var result = colorable(colors, {compact: true, threshold: 0});


class ReaderZone extends Component {
	constructor() {
		super();
		this.state = {
			text: 'Text',
			width: 100
		};


		this.db_click = this.db_click.bind(this);
	}

	render() {
		//alert('909');

		return (
			<div style={{width: this.state.width}} id={'reader_zone'}>
				<div>
					{this.state.text}
				</div>
			</div>
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

ReaderZone.defaultProps = {text: 'Tegos 909'};

export default ReaderZone;
