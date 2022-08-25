import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';

export const TodosList = ({todos}) => {
    return (<div>
      <h1>Todos</h1>
      const [todos, setStatus] = useState([]) 
      {todos.map(t => {
        return <div>
            Task Id: {t.taskId} <br></br>
            Task Name: {t.taskName} <br></br>
            Task Description: {t.taskDescription} <br></br>
            IsCompleted?: <checkbox value={t.taskStatus}></checkbox>
            <br></br>
            <br></br>
        </div>
      })}      
    </div>)
}

export const CreateTodos = ({getTodos}) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    
    useEffect(() => {
        axios.get('')
        // add try catch later
    }, [])
    return (
        <div>
            <h2>Please Add New Task Below</h2>                              
                    Task Name:  
                    <input value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    <br></br>
                    Task Description:
                    <input value={taskDescription} onChange={e => setTaskDescription(e?.target.value)} />
                    
                    <button onClick={async () => {
                        console.log(taskName, taskDescription)
                    try {
                        const res = await axios.post('https://localhost:44353/api/TodoTask', {
                            TaskName: taskName,
                            TaskDescription: taskDescription
                        })
                    } catch(err) {
                        // handle error
                    } finally {
                        getTodos()
                    }            
                }}>Submit</button>
        </div>)
}