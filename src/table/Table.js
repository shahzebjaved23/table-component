import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";
import * as  EventEmitter from "event-emitter";

export class Table extends Component {

	eventEmitter : EventEmitter;
	
	constructor(props){
		super(props);
		this.eventEmitter = EventEmitter();
		this.state = { tableData: props.data };
		this.eventEmitter.on("nextPage", (args)=>{ console.log(args) });
		this.eventEmitter.on("prevPage", (args)=>{ console.log(args) });
	}

	render(){
		return (
			<div>
				<SearchBar eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
				<DisplayTable eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
				<Footer eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
			</div>
		)	
	}
}
