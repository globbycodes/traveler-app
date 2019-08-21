import React, { Component } from 'react';
import Navbar from './Navbar'
import Router from "./Router"

class Home extends Component {
    render() {
        return (
            <div >
                <Navbar />
                <Router />
            </div>
        );
    }
}

export default Home;