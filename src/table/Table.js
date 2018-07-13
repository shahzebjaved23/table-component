import React, { Component } from 'react';
import { Footer } from "./footer/Footer";
import { DisplayTable } from "./display-table/DisplayTable";
import { SearchBar } from "./search-bar/SearchBar";

export class Table extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.data, searchedArray: [], paginatedArray: [] };
	}

	tableSearchEvent(searchedArray){
		this.setState({ searchedArray: searchedArray })
	}

	paginationEvent(paginatedArray){
		this.setState({ paginatedArray: paginatedArray })
	}


	render(){
		return (
			<div>
				<SearchBar searchEvent={this.tableSearchEvent.bind(this)} tableData={this.state.tableData} searchBar={this.props.searchBar} />
				<DisplayTable paginatedArray={this.state.paginatedArray} searchedArray={this.state.searchedArray} tableData={this.state.tableData} editButtons={this.props.editButtons} />
				<Footer paginationEvent={this.paginationEvent.bind(this)} tableData={this.state.tableData} footer={this.props.footer} />
			</div>
		)	
	}
}
