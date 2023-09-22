import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  Home from './homepage/homepage'
import History from "./maps/history";
import React from "react";
import Navbar from "./common/navbar";
import Bigmap from "./maps/bigmap.js";

function App() {
    return (
        <Router>
            <div className="App">
            <Navbar/>
            <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/blog' element={<Bigmap/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;