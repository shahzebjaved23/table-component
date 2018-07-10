import React, { Component } from 'react';
import { Table } from './table/Table.js';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = { tableData: require("./data.json") };
    }

    render() {
        return <Table data={this.state.tableData} searchBar={true} footer={true} editButtons={false} />
    }
}

export default App;
