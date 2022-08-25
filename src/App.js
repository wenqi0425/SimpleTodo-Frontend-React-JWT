import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import { TodosList } from './TodosList';
import { CreateTodos } from './TodosList';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [todos, setTodos] = useState([])  

  // add try catch later
  const getTodos = async () => {
      const res = await axios.get("https://localhost:44353/api/TodoTask")
      setTodos(res.data)
  }

  useEffect(() => {
      getTodos()
  }, [])
  
  if(isLoggedin) {
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
