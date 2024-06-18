// import logo from './logo.svg';
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddTask } from './Components/AddTask'
import TaskList from './Components/TaskList'
import Header from './Components/Header'
import Footer from './Components/Footer'


function App () {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<TaskList/>}/>
        <Route path='/add' element={<AddTask/>}/>
        <Route path='/update/:id' element={<AddTask/>}/>
        <Route path='/delete/:id' element={<TaskList/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
