import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { SearchBar } from "./search-bar/SearchBar";
import * as  EventEmitter from "event-emitter";

export class Table extends Component {

	eventEmitter : EventEmitter;
	
	constructor(props){
		super(props);
		this.eventEmitter = EventEmitter();
		this.state = { tableData: props.data }
	}

	render(){
		return (
			<div>
				<SearchBar eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
				<Header eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
				<Footer eventEmitter={this.eventEmitter} tableData={this.state.tableData} />
			</div>
		)	
	}
}
