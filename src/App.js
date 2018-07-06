import React, { Component } from 'react';
import { Table } from './table/Table.js';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            data: require("./data.json")
        }
    }

    render() {
        return <Table data={this.state.data} searchBar={true} footer={true} />
    }
}

export default App;
