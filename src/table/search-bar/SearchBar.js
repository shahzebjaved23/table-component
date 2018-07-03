import React, { Component } from 'react';
import "./SearchBar.css";

export class SearchBar extends Component {

	render(){
		return (
			<div className="search-bar">
				
				<div className="row">
					<div className="col-md-2">
						<div className="search-input-div">
							<span className="fa fa-search"></span>
							<input className="search-input" placeholder="Search By Keyword..." />
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