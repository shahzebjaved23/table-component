import React, { Component } from 'react';
import { Table as ReactTable } from './table/Table.js';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = { tableData: require("./data.json") };
    }

    render() {
        return <ReactTable data={this.state.tableData} searchBar={true} footer={true} editButtons={false} />
    }
}

export default App;
