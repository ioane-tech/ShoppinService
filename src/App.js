import React from 'react';
import {Route,Routes} from 'react-router-dom'


import './components/Css/App.css'
import Header from './components/Header';
import HomePage from './components/HomePage';
import MyOrders from './components/MyOrders';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/myOrders' element={<MyOrders/>}/>
      </Routes>

    </div>
  );
}

export default App;
