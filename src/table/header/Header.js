import React, { Component } from 'react';
import "./Header.css"

export class Header extends Component {

	constructor(props){
		super(props);
		this.state = { tableData : props.tableData }
	}

	getTableHeaders(){
		var objectKeys = Object.keys(this.state.tableData.data[0]);
		objectKeys.push("")
		objectKeys.push("")
		objectKeys.push("")
		return objectKeys;
	}

	render(){
		return (
			<div>
				<table align="center" className="table text-centered">
					
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
										<td>
											<span style={{ color: "#1ba7f5" }} className="fas fa-pen-square"></span>					
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