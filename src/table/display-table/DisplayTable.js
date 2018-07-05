import React, { Component } from 'react';
import "./DisplayTable.css"

export class DisplayTable extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData, sortOrder: 1, indexSorted: 0 };
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
		this.removePrevHeaderStyles(this.state.indexSorted);
		this.setState({ indexSorted: index });
		this.applyHeaderStyle(index);
	}

	applyHeaderStyle(index){
		let bodyRows = this.refs.displayTableBody.childNodes;
		for(var i=0; i < bodyRows.length; i++){
			bodyRows[i].childNodes[index].style.color = "#71aedb"
		}

		let headerRows = this.refs.displayTableHead.childNodes;
		for(var i=0; i < headerRows.length; i++){
			if(this.state.sortOrder === 1){
				headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "block";
				headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "none";	
			}else if(this.state.sortOrder === -1){
				headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "block";
				headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
			}
			
		}
	}

	removePrevHeaderStyles(index){
		let bodyRows = this.refs.displayTableBody.childNodes;
		for(var i=0; i < bodyRows.length; i++){
			bodyRows[i].childNodes.forEach( (node) => {
				node.style.color = "#3d3833"	
			})
		}

		let headerRows = this.refs.displayTableHead.childNodes;
		for(var i=0; i < headerRows.length; i++){
			headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
			headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "none";	
		}	
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
				<table ref="displayTable" align="center" className="table text-centered">
					
					<thead ref="displayTableHead">
					    <tr>
							{
								this.getTableHeaders().map((key, index)=>{ 
									return (
										<th onClick={this.sortByHeader.bind(this, key, index)} style={{ textAlign: "center", cursor: "pointer" }} key={index}>
											<span style={{ position: "relative" }}>
												<i style={{ position: "absolute", right: -20, top:1 , color: "#71aedb" , display: "none"}} className="fas fa-angle-down"></i>
												<i style={{ position: "absolute", right: -20, top:1 , color: "#71aedb" , display: "none"}} className="fas fa-angle-up"></i>
												{key}
											</span>
										</th>
									) 
								})
							}
						</tr>
					</thead>
					
					<tbody ref="displayTableBody">
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