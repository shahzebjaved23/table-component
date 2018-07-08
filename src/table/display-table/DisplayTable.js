import React, { Component } from 'react';
import "./DisplayTable.css"

export class DisplayTable extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData, sortOrder: 1, indexSorted: 0 };
	}

	getTableHeaders(){
		if(this.state.tableData.headerMetadata != null){
			let headerMetaDataKeys = Object.keys(this.state.tableData.headerMetadata);
			let headersArray = [];
			
			for(let i=0; i< headerMetaDataKeys.length; i++){
				let headerObject = this.state.tableData.headerMetadata[headerMetaDataKeys[i]];
				headersArray.unshift(headerObject);
			}
			return headersArray;
		}else{
			return [];
		}
	}

	isAmount(key){
		let amountVal = false;
		let headerMetaDataKeys = Object.keys(this.state.tableData.headerMetadata);

		for(let i=0; i< headerMetaDataKeys.length; i++){
			let headerObject = this.state.tableData.headerMetadata[headerMetaDataKeys[i]];
			if(headerObject.name == key){
				amountVal = headerObject.amount;
				break;
			}
		}
		return amountVal;
	}

	listenPaginationEvent(){
		this.props.eventEmitter.on("paginationEvent", (paginatedArray)=>{ 
			if(paginatedArray.data.length > 0) 
				this.setState({ tableData: { data: paginatedArray.data, headerMetadata: this.state.tableData.headerMetadata } }, () => this.applySortStyle(this.state.indexSorted) ) 
		}) 
	}

	listenSearchEvent(){
		this.props.eventEmitter.on("searchEvent", (searchedArray)=>{
			this.setState({ tableData:{ data: searchedArray.data, headerMetadata: this.state.tableData.headerMetadata } }, () => {
					if(searchedArray.data.length > 0) 
						this.applySortStyle(this.state.indexSorted) 
				}
			)	
		})
	}

	sortByHeader(key, index){
		this.toggleSortOrder();
		let sortedArray = this.state.tableData.data.sort(this.dynamicSort(key, this.state.sortOrder));
		this.setSortStyles(index);
		this.setState({ tableData: { data: sortedArray, headerMetadata: this.state.tableData.headerMetadata }, indexSorted: index });	
	}

	setSortStyles(index){
		this.removePrevSortStyle(this.state.indexSorted);
		this.applySortStyle(index);
	}

	applySortStyle(index){
		if(this.refs.displayTableBody && this.refs.displayTableHead){
			let bodyRows = this.refs.displayTableBody.childNodes;
			for(let i=0; i < bodyRows.length; i++){
				bodyRows[i].childNodes[index].style.color = "#71aedb"
			}

			let headerRows = this.refs.displayTableHead.childNodes;
			for(let i=0; i < headerRows.length; i++){
				if(this.state.sortOrder === 1){
					headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "block";
					headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "none";	
				}else if(this.state.sortOrder === -1){
					headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "block";
					headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
				}
			}
		}
	}

	removePrevSortStyle(index){
		let bodyRows = this.refs.displayTableBody.childNodes;
		for(let i=0; i < bodyRows.length; i++){
			bodyRows[i].childNodes.forEach( (node) => {
				node.style.color = "#3d3833"	
			})
		}

		let headerRows = this.refs.displayTableHead.childNodes;
		for(let i=0; i < headerRows.length; i++){
			headerRows[i].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
			headerRows[i].childNodes[index].getElementsByTagName("i")[1].style.display = "none";	
		}	
	}


	toggleSortOrder(){
		if(this.state.sortOrder === 1) this.setState({ sortOrder: -1 })
		if(this.state.sortOrder === -1) this.setState({ sortOrder: 1 })
	}

	dynamicSort(property, sortOrder) {
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	componentDidMount(){
		this.applySortStyle(this.state.indexSorted);
	}

	componentWillMount(){
		this.listenPaginationEvent();
		this.listenSearchEvent();
	}

	render(){
		console.log(this.state.tableData.data);
		return (
			<div>
				<table ref="displayTable" align="center" className="table text-centered">
					
					<thead ref="displayTableHead">
					    <tr>
							{
								this.getTableHeaders().map((headerObj, index)=>{ 
									return (
										<th style={{ textAlign: "center" }} key={index}>
											<span onClick={this.sortByHeader.bind(this, headerObj.name, index)} style={{ position: "relative" ,cursor: "pointer" }}>
												<i style={{ position: "absolute", right: -20, top:1 , color: "#71aedb" , display: "none"}} className="fas fa-angle-down"></i>
												<i style={{ position: "absolute", right: -20, top:1 , color: "#71aedb" , display: "none"}} className="fas fa-angle-up"></i>
												{headerObj.name}
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
												return (<td style={{ textAlign: this.isAmount(key) ? "right" : "center" }} key={keyIndex}>{dataObject[key]}</td>)
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