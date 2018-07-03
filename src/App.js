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
        console.log(this.state.data)
        return (
            <div>
                <Table data={this.state.data} />   
            </div>
        );
    }
}

export default App;
