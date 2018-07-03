import React, { Component } from 'react';
import "./Footer.css";

export class Footer extends Component {

	constructor(props){
		super(props);
		this.state = { tableDate: props.tableData }
	}

	render(){
		return (
			<div>
				<div className="row">
					<div className="col-md-2">Items per Page</div>
					<div className="col-md-2">

					</div>
					<div className="col-md-2">

					</div>
					<div className="col-md-4"></div>
					
					<div className="col-md-2">

					</div>
				</div>
			</div>
		)
	}
}