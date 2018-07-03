import React, { Component } from 'react';
import "./Footer.css";

export class Footer extends Component {

	constructor(props){
		super(props);
		this.state = { tableDate: props.tableData }
	}

	render(){
		return (
			<div className="footer-div">
					
				<span> Items per Page </span>
				<div className="footer-select">
					<span className="select-number">10</span>
					<span className="fa fa-angle-down selector-control"></span>
				</div>
				<span className="item-description"> 1 - 10 of 40 items </span>
					
			</div>
		)
	}
}