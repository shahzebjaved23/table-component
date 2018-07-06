import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";
import * as  EventEmitter from "event-emitter";

export class Table extends Component {
	
	constructor(props){
		super(props);
		this.state = { tableData: props.data };
	}

	render(){
		let eventEmitter = EventEmitter();
		return (
			<div>
				<SearchBar eventEmitter={eventEmitter} tableData={this.state.tableData} searchBar={this.props.searchBar} />
				<DisplayTable eventEmitter={eventEmitter} tableData={this.state.tableData} />
				<Footer eventEmitter={eventEmitter} tableData={this.state.tableData} footer={this.props.footer} />
			</div>
		)	
	}
}
