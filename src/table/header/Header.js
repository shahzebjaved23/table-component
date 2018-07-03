import React, { Component } from 'react';
import "./Header.css"

export class Header extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData }
	}

	getTableHeaders(){
		let keysArray = Object.keys(this.state.tableData.data[0]);
		keysArray.push(" "); 
		return keysArray;
	}

	render(){
		return (
			<div>
				<table align="center" className="table text-centered" style={{width:"100%"}}>
					
					<thead>
					    <tr>
							{this.getTableHeaders().map((k, i)=>{ return (<th style={{ textAlign: "center"}} key={i}>{k}</th>) })}
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