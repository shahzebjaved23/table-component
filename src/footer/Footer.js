import React, { Component } from 'react';

export class Footer extends Component {

	tableData: any;

	constructor(props){
		super(props);
		this.state = { tableData: props.tableData, itemsPerPage: 10, currentPage: 1 };
	}

	paginationItemsArray(){
		let pageItems = [];
		let totalItems = this.state.tableData.data.length;
		pageItems.push(this.state.itemsPerPage)
		while(true){
			totalItems = totalItems - this.state.itemsPerPage
			if( totalItems >= this.state.itemsPerPage ){
				pageItems.push(this.state.itemsPerPage);
			}else{
				pageItems.push(Math.abs(totalItems));
				break;
			}
		}
		return pageItems;
	}

	paginateTableData(){
		let paginatedArray = this.state.tableData.data.slice((this.state.currentPage - 1) * this.state.itemsPerPage, (this.state.currentPage) * this.state.itemsPerPage)
		this.props.eventEmitter.emit("paginationEvent", { data: paginatedArray} )
		this.refs.pageSelect.value = this.state.currentPage;
		this.refs.itemsSelect.value = this.state.itemsPerPage;
	}

	pageStartingIndex(){
		return this.state.itemsPerPage * this.state.currentPage - this.state.itemsPerPage + 1;
	}

	pageEndingIndex(){
		if(this.state.tableData.data.length <= this.state.itemsPerPage){
			return this.state.tableData.data.length;
		}else{
			return this.pageStartingIndex() + this.itemsInCurrentPage() - 1;	
		}
	}

	itemsInCurrentPage(){
		return this.paginationItemsArray()[this.state.currentPage - 1];
	}

	itemsSelectorChanged(){
		let selectNode = this.refs.itemsSelect;
		let selected = selectNode.options[selectNode.selectedIndex].value;
		this.setState({itemsPerPage: parseInt(selected) }, this.paginateTableData);
	}

	pageSelectorChanged(){
		let selectedPage = this.refs.pageSelect.value;
		this.setState({currentPage: parseInt(selectedPage) }, this.paginateTableData);
	}

	getPagesNumbersList(){
		let pagesNumber = this.getPagesNumber();
		let pagesNumebrsList = [];
		while(pagesNumber !== 0){
			pagesNumebrsList.unshift(pagesNumber);
			pagesNumber--;
		}
		return pagesNumebrsList;
	}

	getPagesNumber(){
		return Math.ceil(this.state.tableData.data.length / this.state.itemsPerPage);
	}

	nextPage(){
		this.props.eventEmitter.emit("nextPage", { itemsPerPage: this.state.itemsPerPage, currentPage: this.state.currentPage})
		if(this.state.currentPage !== this.getPagesNumber()){
			this.setState({currentPage: this.state.currentPage + 1} , this.paginateTableData)
		}
	}

	prevPage(){
		this.props.eventEmitter.emit("prevPage", { itemsPerPage: this.state.itemsPerPage, currentPage: this.state.currentPage})
		if(this.state.currentPage !== 1){
			this.setState({ currentPage: this.state.currentPage - 1}, this.paginateTableData)
		}
	}

	componentDidMount(){ 
		this.props.eventEmitter.on("paginateArray", (searchedArray)=>{
				this.setState({ tableData:{ data: searchedArray.data, headerMetadata: this.state.tableData.headerMetadata } }, this.paginateTableData.bind(this))
			}
		); 
		if(this.props.footer) this.paginateTableData() 
	}

	render(){
		if(this.props.footer){
			return (
				<div style={{ backgroundColor: "#ffffff", color: "#bbbbbd", padding: "20px", borderTop: "1px solid #f2f2f2", position: "relative" }}>
					
					<span> Items per Page </span>
					
					<div style={{ position: "absolute", display: "inline", backgroundColor: "white", border: "1px solid #f1f1f1", width: "60px", height: "30px", top: "15px", left: "130px" }}>
						<span style={{ position: "absolute", top: "8px", left: "40px", pointerEvents: "none" }} className="fa fa-angle-down cursor-pointer"></span>
						<select style={{ borderRadius: "0px", backgroundColor: "white", WebkitAppearance: "none", WebkitBorderRadius : "0px", width: "60px", height: "30px", border:  "1px solid #f1f1f1", textIndent: "10px", color: "black" }} ref="itemsSelect" onChange={this.itemsSelectorChanged.bind(this)}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</select>
					</div>
					
					<span style={{ position: "absolute", left: "200px" }} > {this.pageStartingIndex()} - {this.pageEndingIndex()} of {this.state.tableData.data.length} items </span>

					<div>
						<span onClick={this.prevPage.bind(this)} style={{ position: "absolute", right: "120px", top: "20px", border: "1px solid #f1f1f1", padding: "8px", height: "30px", color: "#71aedb" }} className="fa fa-caret-left cursor-pointer"></span>
					</div>
					
					<div style={{ position: "absolute", top: "20px", right: "50px" }} >
						<span style={{ 	position: "absolute", top: "8px", left: "40px", pointerEvents: "none" }} className="fa fa-angle-down cursor-pointer"></span>
						<select style={{ borderRadius: "0px", backgroundColor: "white", color: "black", WebkitAppearance: "none", WebkitBorderRadius: "0px", width: "60px", height: "30px", border: "1px solid #f1f1f1", textIndent: "10px" }} ref="pageSelect" onChange={this.pageSelectorChanged.bind(this)}>
							{
								this.getPagesNumbersList().map((number, index)=>{
									return (
										<option key={index} value={number}>{number}</option>
									)
								})
							}
						</select>
					</div>
					
					<div className="right-arrow">
						<span style={{ position: "absolute", border: "1px solid #f1f1f1", padding: "8px", top: "20px", right: "20px", height: "30px", color: "#71aedb" }} onClick={this.nextPage.bind(this)} className="fa fa-caret-right cursor-pointer"></span>
					</div>
						
				</div>
			)	
		}else{
			return (<div></div>)
		}
		
	}
}