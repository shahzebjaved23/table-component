import React, { Component } from 'react';

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
		if(this.props.searchBar){
			return (
				<div style={{ backgroundColor: "#f6f7fb" }} >
					
					<div className="row">
						<div className="col-sm-3">
							<div style={{ padding: "10px", border: "1px solid #f3f2f2", borderRadius: "5px", position: "relative" }} >
								<span onClick={this.searchTableData.bind(this)} className="fa fa-search" style={{ position: "absolute", top: "20px", left: "180px", fontSize: "15px", color: "#72aedb" }} ></span>
								<input onKeyUp={this.searchTableData.bind(this)} ref="searchInput" style={{ border: "1px solid #f3f2f2", borderRadius: "2px", fontSize: "14px", padding: "6px", width: "200px", textIndent: "5px" }} placeholder="Search By Keyword..." />
							</div>
						</div>
						
						<div className="col-sm-2">
							<div style={{ margin: "10px", position: "relative" }} >
								<div>
									<span className="fa fa-angle-down" style={{ position: "absolute", top: "10px", left: "140px", fontSize: "15px", color: "#72aedb" }}></span>
									<span className="fa fa-search" style={{ position: "absolute", top: "10px", left: "10px", fontSize: "15px", color: "#72aedb" }}></span>
									<input style={{ textIndent: "30px" , backgroundColor: "white", borderRadius: "none", border: "1px solid #f3f2f2", borderRadius: "2px", fontSize: "14px", padding: "6px" }} placeholder="View All Rules" />
								</div>
							</div>
						</div>

						<div className="col-md-5"></div>
						
						<div className="col-md-2"> 
							<button className="btn btn-success add-rules-button" style={{ margin: "10px" }} > Add Ruleset </button>
						</div>
					</div>					

				</div>
			)
		}else{
			return (<div></div>)
		}
	}
}