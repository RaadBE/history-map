import logo from './logo.svg';
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  Home from './homepage/homepage'
import History from "./maps/history";
import  Test from './maps/test'
import Navbar from "./common/navbar";
import Bigmap from "./maps/bigmap.js";
import DataProvider from "./maps/ContexProvider";
function App() {
    return (
        <Router>
            <DataProvider>
                <div className="App">
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/blog' element={<Bigmap/>}/>
                        <Route path='/test1' element={<Test/>}/>
                    </Routes>
                    <Test/>  {/* You might want to include this inside the Routes */}
                </div>
            </DataProvider>
        </Router>
    );
}
export default App;
