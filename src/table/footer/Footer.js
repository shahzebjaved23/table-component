import React, { Component } from 'react';
import "./Footer.css";

export class Footer extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.tableData, itemsPerPage: 10, currentPage: 1 };
		document.addEventListener("click", this.closeAllSelect);
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
		let selectNode = this.refs.pageSelect;
		let selectedPage = selectNode.options[selectNode.selectedIndex].value;
		this.setState({currentPage: parseInt(selectedPage) }, this.paginateTableData);
	}

	getPagesNumbersList(){
		let pagesNumber = this.getPagesNumber();
		let pagesNumebrsList = [];
		while(pagesNumber != 0){
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
		if(this.state.currentPage != this.getPagesNumber()){
			this.setState({currentPage: this.state.currentPage + 1} , this.paginateTableData)
		}
	}

	prevPage(){
		this.props.eventEmitter.emit("prevPage", { itemsPerPage: this.state.itemsPerPage, currentPage: this.state.currentPage})
		if(this.state.currentPage != 1){
			this.setState({ currentPage: this.state.currentPage - 1}, this.paginateTableData)
		}
	}

	componentDidMount(){ this.paginateTableData() }

	render(){
		console.log(this.pageEndingIndex())
		return (
			<div className="footer-div">
				
				<span> Items per Page </span>
				
				<div className="items-select">
					<span className="fa fa-angle-down cursor-pointer"></span>
					<select ref="itemsSelect" onChange={this.itemsSelectorChanged.bind(this)}>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
				
				<span className="item-description"> {this.pageStartingIndex()} - {this.pageEndingIndex()} of {this.state.tableData.data.length} items </span>

				<div className="left-arrow">
					<span onClick={this.prevPage.bind(this)} className="fa fa-caret-left cursor-pointer"></span>
				</div>
				
				<div className="page-selector">
					<span className="fa fa-angle-down cursor-pointer"></span>
					<select ref="pageSelect" onChange={this.pageSelectorChanged.bind(this)}>
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
					<span onClick={this.nextPage.bind(this)} className="fa fa-caret-right cursor-pointer"></span>
				</div>
					
			</div>
		)
	}
}