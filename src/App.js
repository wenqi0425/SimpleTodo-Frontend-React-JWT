import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import { TodosList } from './TodosList';
import { CreateTodos } from './TodosList';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [todos, setTodos] = useState([])  
  const [newRegister, setRegister] = useState([])  

  return <BrowserRouter>
      <Routes>
          <Route path="/" element={
              <div>Home <br></br>
                  <Link to="/register">Register</Link> <br></br>
                  <Link to="/login">Login</Link>
              </div>} />

          <Route path="register" 
              element={
                <Register newRegister={newRegister}/> } />          
          
          <Route path="login" 
              element={
                <Login onLoggedIn={(authData => {
                    setIsLoggedIn(true)
                    axios.interceptors.request.use(function (config) {
                        const token = authData.token
                        config.headers.Authorization = token;      
                        return config;
                  });
          })} /> 
      } />          
    </Routes>
  </BrowserRouter>

  // add try catch later
  const getTodos = async () => {
      const res = await axios.get("https://localhost:44353/api/TodoTask")
      setTodos(res.data)
  }

  const getRegister = async () => {
    const res = await axios.get("https://localhost:44353/api/Authentication/register")
    setRegister(res.data)
}

  useEffect(() => {
      getTodos()
      getRegister()
  }, [])

  if(newRegister) {
    return <>
    <Register newRegister={newRegister}/>    
    </>
  }
  else if(isLoggedin) {
    return <>
    <TodosList todos={todos}/>
    <CreateTodos getTodos={getTodos}/>
    </> 
  } else {
    return (
      <Login onLoggedIn={(authData => {
          setIsLoggedIn(true)
          axios.interceptors.request.use(function (config) {
            const token = authData.token
            config.headers.Authorization = token;      
            return config;
          });
      })} />
    );
  }
}

export default App;
