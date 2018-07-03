import React, { Component } from 'react';

export class Footer extends Component {

	constructor(props){
		super(props);
		this.state = { tableDate: props.tableData }
	}

	render(){
		return (
			<div>
				Footer
			</div>
		)
	}
}