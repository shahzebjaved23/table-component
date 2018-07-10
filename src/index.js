import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";
import * as  EventEmitter from "event-emitter";

export class Table extends Component {

	constructor(props){
		super(props);
		this.eventEmitter = EventEmitter();
		this.state = { tableData: props.data };
	}

	render(){
		let eventEmitter = EventEmitter.default();
		return (
			<div>
				<SearchBar eventEmitter={eventEmitter} tableData={this.state.tableData} searchBar={this.props.searchBar} />
				<DisplayTable eventEmitter={eventEmitter} tableData={this.state.tableData} editButtons={this.props.editButtons} />
				<Footer eventEmitter={eventEmitter} tableData={this.state.tableData} footer={this.props.footer} />
			</div>
		)	
	}
}
