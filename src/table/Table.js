import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";

export class Table extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.data };
	}

	render(){
		let eventEmitter = new EventEmitter();
		return (
			<div>
				<SearchBar eventEmitter={eventEmitter} tableData={this.state.tableData} searchBar={this.props.searchBar} />
				<DisplayTable eventEmitter={eventEmitter} tableData={this.state.tableData} editButtons={this.props.editButtons} />
				<Footer eventEmitter={eventEmitter} tableData={this.state.tableData} footer={this.props.footer} />
			</div>
		)	
	}
}

class EventEmitter {

	eventsArray = [];

	on(eventName, callback){
		let eventObj = {
			name: eventName,
			callback: callback
		}
		this.eventsArray.push(eventObj);
	}

	emit(eventName, ... args){
		this.eventsArray.forEach((obj)=>{
			if(obj.name == eventName){
				console.log(args);
				obj.callback(args[0])
			}
		})
	}
}
