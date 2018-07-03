import React, { Component } from 'react';
import "./SearchBar.css";

export class SearchBar extends Component {

	render(){
		return (
			<div className="search-bar">
				<div className="search-input-div">
					<span className="fa fa-search"></span>
					<input className="search-input" placeholder="Search By Keyword..." />
				</div>
			</div>
		)
	}
}