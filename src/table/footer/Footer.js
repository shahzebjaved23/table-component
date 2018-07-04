import React, { Component } from 'react';
import "./Footer.css";

export class Footer extends Component {

	constructor(props){
		super(props);
		this.state = { tableData: props.tableData, itemsPerPage: 4, currentPage: 1 };
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
		console.log("current page items: ", this.itemsInCurrentPage())
		return this.pageStartingIndex() + this.itemsInCurrentPage() - 1;
	}

	itemsInCurrentPage(){
		console.log("paginationItemsArray: ",this.paginationItemsArray())
		return this.paginationItemsArray()[this.state.currentPage - 1];
	}

	closeAllSelect(elem){
		// let excludedClassNames = [ "fa fa-caret-left cursor-pointer","fa fa-caret-right cursor-pointer","fa fa-angle-down cursor-pointer"];

		// var clickTargetExcluded = Array.find( element => element == elem.target.className )
		// if(clickTargetExcluded != undefined){
		// 	this.refs.itemsSelectList
		// }
	}

	createItemsSelectList(){
		console.log(this.refs)
	}

	createPageSelectList(){
		console.log(this.refs)
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

	componentDidMount(){
		this.paginateTableData();
	}

	render(){
		return (
			<div className="footer-div">
				
				<span> Items per Page </span>
				
				<div ref="itemsSelector" className="footer-select">
					<span className="select-number">{ this.state.itemsPerPage }</span>
					<span className="fa fa-angle-down cursor-pointer"></span>
				</div>
				
				<span className="item-description"> {this.pageStartingIndex()} - {this.pageEndingIndex()} of {this.state.tableData.data.length} items </span>

				<div className="left-arrow">
					<span onClick={this.prevPage.bind(this)} className="fa fa-caret-left cursor-pointer"></span>
				</div>
				
				<div className="page-selector">
					<span className="page-selector-number">{ this.state.currentPage }</span>
					<span className="fa fa-angle-down cursor-pointer"></span>
				</div>
				
				<div className="right-arrow">
					<span onClick={this.nextPage.bind(this)} className="fa fa-caret-right cursor-pointer"></span>
				</div>
					
			</div>
		)
	}
}