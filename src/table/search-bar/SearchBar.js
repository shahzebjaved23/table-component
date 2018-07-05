import React, { Component } from 'react';
import "./SearchBar.css";

export class SearchBar extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.tableData }
	}

	searchTableData(){
		let searchQuery = this.refs.searchInput.value;
		let searchedArray = []; 
		for(let i = 0; i < this.state.tableData.data.length; i++){
			let element = this.state.tableData.data[i];
			let elementKeys = Object.keys(element);
			for(let j = 0; j < elementKeys.length; j++){
				let elementKey = elementKeys[j];
				let elementTerm = element[elementKey];
				if(elementTerm.toString().includes(searchQuery)){
					searchedArray.push(element);
					break;
				}
			}
		}
		this.props.eventEmitter.emit("searchEvent", { data: searchedArray })
	}

	render(){
		return (
			<div className="search-bar">
				
				<div className="row">
					<div className="col-md-2">
						<div className="search-input-div">
							<span onClick={this.searchTableData.bind(this)} className="fa fa-search"></span>
							<input onKeyUp={this.searchTableData.bind(this)} ref="searchInput" className="search-input" placeholder="Search By Keyword..." />
						</div>
					</div>
					
					<div className="col-md-2">
						<div className="rules-selector">
							<div>
								<span className="fa fa-angle-down"></span>
								<span className="fa fa-search"></span>
								<input className="rules-selector-input" placeholder="View All Rules" />
							</div>
						</div>
					</div>

					<div className="col-md-6"></div>
					
					<div className="col-md-2"> 
						<button className="btn btn-success add-rules-button"> Add Ruleset </button>
					</div>
				</div>					

			</div>
		)
	}
}