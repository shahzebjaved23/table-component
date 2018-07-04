import React, { Component } from 'react';
import "./DisplayTable.css"

export class DisplayTable extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData, sortOrder: 1 };
	}

	getTableHeaders(){
		if(this.state.tableData.data.length > 0){
			var objectKeys = Object.keys(this.state.tableData.data[0]);
			objectKeys.push(""); objectKeys.push("");
			return objectKeys;
		}else{
			return [];
		}
	}

	listenPaginationEvent(){
		this.props.eventEmitter.on("paginationEvent", (paginatedArray)=>{ 
			if(paginatedArray.data.length > 0)
				this.setState({ tableData: paginatedArray }); 
		}) 
	}

	listenSearchEvent(){
		this.props.eventEmitter.on("searchEvent", (searchedArray)=>{
			this.setState({ tableData: searchedArray });
		})
	}

	componentWillMount(){
		this.listenPaginationEvent();
		this.listenSearchEvent();
	}

	sortByHeader(key, index){
		this.toggleSortOrder();
		let sortedArray = this.state.tableData.data.sort(this.dynamicSort(key, this.state.sortOrder));
		this.setState({ tableData: { data: sortedArray } });
	}

	toggleSortOrder(){
		if(this.state.sortOrder == 1) this.setState({ sortOrder: -1 })
		if(this.state.sortOrder == -1) this.setState({ sortOrder: 1 })
	}

	dynamicSort(property, sortOrder) {
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	render(){
		return (
			<div>
				<table align="center" className="table text-centered">
					
					<thead>
					    <tr>
							{
								this.getTableHeaders().map((key, index)=>{ 
									return (
										<th onClick={this.sortByHeader.bind(this, key, index)} style={{ textAlign: "center", cursor: "pointer"}} key={index}>{key}</th>
									) 
								})
							}
						</tr>
					</thead>
					
					<tbody>
						{
							this.state.tableData.data.map((dataObject,index)=>{
								return (
									<tr key={index}> 
										{
											Object.keys(dataObject).map((key, keyIndex)=>{
												return (<td style={{ textAlign: "center"}} key={keyIndex}>{dataObject[key]}</td>)
											})
										}
										<td>
											<span style={{ color: "#1ba7f5", paddingTop: 4 }} className="fas fa-pen-square pull-right"></span>					
										</td>
										<td>
											<span style={{ color: "#1ba7f5" }} className="fa fa-ellipsis-v"></span>
										</td>
									</tr>
								)
							})
						}
					</tbody>

				</table>
			</div>
		)
	}
}