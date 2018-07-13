import React, { Component } from 'react';

export class DisplayTable extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData, sortKey: "id" ,sortOrder: 1, sortIndex: 0, unPaginatedArray: props.tableData.data };
	}

	getTableHeaders(){
		if(this.state.tableData.headerMetadata != null){
			let headerMetaDataKeys = Object.keys(this.state.tableData.headerMetadata);
			let headersArray = [];
			
			for(let i=0; i< headerMetaDataKeys.length; i++){
				let headerObject = this.state.tableData.headerMetadata[headerMetaDataKeys[i]];
				headersArray.push(headerObject);
			}
			headersArray = this.applyEditButtonsToHeaders(headersArray);
			return headersArray;
		}else{
			return [];
		}
	}

	applyEditButtonsToHeaders(headersArray){
		if(this.props.editButtons){
			headersArray.push({}); headersArray.push({});
			return headersArray;
		}else{
			return headersArray;
		}	
	}

	getEditButtons(){
		if(this.props.editButtons){
			return [
				<td>
					<span style={{ color: "#1ba7f5", paddingTop: 4 }} className="fas fa-pen-square pull-right"></span>					
				</td>,
				<td>
					<span style={{ color: "#1ba7f5" }} className="fa fa-ellipsis-v"></span>
				</td>
			]
		}else{
			return []
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
			if(paginatedArray.data.length > 0) {
				this.setState({ 
					tableData: { 
						data: paginatedArray.data, 
						headerMetadata: this.state.tableData.headerMetadata 
					}, 
					sortOrder: this.state.sortOrder 
				}, this.applySortStyle)
			}
		}) 
	}

	listenSearchEvent(){
		this.props.eventEmitter.on("searchEvent", (searchedArray)=>{
			this.setState({ tableData:{ data: searchedArray.data, headerMetadata: this.state.tableData.headerMetadata } }, () => {
					if(searchedArray.data.length > 0){
						this.applySortStyle()
						this.props.eventEmitter.emit("paginateArray", searchedArray);
					} 
				}
			)	
		})
	}

	sortByHeader(key, index){
		this.setState({ sortKey: key, sortIndex: index });
		this.toggleSortOrder(this.applyTableSort);
	}

	applyTableSort(){
		let sortedArray = this.state.unPaginatedArray.sort(this.dynamicSort(this.state.sortKey, parseInt(this.state.sortOrder)));
		this.props.eventEmitter.emit("paginateArray", { data: sortedArray });
		this.removePrevSortStyle();
		this.applySortStyle();	
	}

	applySortStyle(){
		if(this.refs.displayTableBody && this.refs.displayTableHead){
			let bodyRows = this.refs.displayTableBody.childNodes;
			for(let i=0; i < bodyRows.length; i++){
				bodyRows[i].childNodes[this.state.sortIndex].style.color = "#71aedb"
			}

			let headerRows = this.refs.displayTableHead.childNodes;
			for(let i=0; i < headerRows.length; i++){
				if(this.state.sortOrder === 1){
					headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[0].style.display = "block";
					headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[1].style.display = "none";	
				}else if(this.state.sortOrder === -1){
					headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[1].style.display = "block";
					headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[0].style.display = "none";
				}
			}
		}
	}

	removePrevSortStyle(){
		let bodyRows = this.refs.displayTableBody.childNodes;
		for(let i=0; i < bodyRows.length; i++){
			bodyRows[i].childNodes.forEach( (node) => {
				node.style.color = "#3d3833"	
			})
		}

		let headerRows = this.refs.displayTableHead.childNodes;
		for(let i=0; i < headerRows.length; i++){
			headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[0].style.display = "none";
			headerRows[i].childNodes[this.state.sortIndex].getElementsByTagName("i")[1].style.display = "none";	
		}	
	}


	toggleSortOrder(callback){
		if(this.state.sortOrder === 1) this.setState({ sortOrder: -1 }, callback)
		if(this.state.sortOrder === -1) this.setState({ sortOrder: 1 }, callback)
	}

	dynamicSort(property, sortOrder) {
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	componentDidMount(){
		this.applySortStyle();
	}

	componentWillMount(){
		this.listenPaginationEvent();
		this.listenSearchEvent();
	}

	render(){
		return (
			<div>
				<table ref="displayTable" align="center" className="table text-centered">
					
					<thead ref="displayTableHead" style={{ backgroundColor: "#f6f7fb", color: "#62656c", borderTop: "1px solid #f2f2f2", borderBottom: "1px solid #f2f2f2" }}>
					    <tr>
							{
								this.getTableHeaders().map((headerObj, index)=>{ 
									return (
										<th style={{ textAlign: "center", fontWeight: "normal", borderTop: "none", border: "none" }} key={index}>
											<span onClick={this.sortByHeader.bind(this,headerObj.name, index)} style={{ position: "relative" ,cursor: "pointer" }}>
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
										{ this.getEditButtons().map( obj => obj ) }
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