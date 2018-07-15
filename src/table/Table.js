import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";

export class Table extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.data };
		this.eventEmitter = new EventEmitter();
	}

	render(){
		return (
			<div>
				<SearchBar eventEmitter={this.eventEmitter} tableData={this.state.tableData} searchBar={this.props.searchBar} />
				<DisplayTable eventEmitter={this.eventEmitter} tableData={this.state.tableData} editButtons={this.props.editButtons} />
				<Footer eventEmitter={this.eventEmitter} tableData={this.state.tableData} footer={this.props.footer} />
			</div>
		)	
	}
}


class EventEmitter {

	constructor(){ this.eventsArray = [] }

	on(eventName, callback){
		this.eventsArray.push({ name: eventName, callback: callback });
	}

	emit(eventName, args){
		this.eventsArray.forEach( obj => obj.name == eventName ? obj.callback(args) : null )
	}
}

