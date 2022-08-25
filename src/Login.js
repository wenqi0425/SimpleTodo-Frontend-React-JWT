import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Login = ({onLoggedIn}) => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
      axios.get('')
    })
  
    return (
      <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
          UserName
          <input value={userName} onChange={e => setUsername(e.target.value)}  />
          Password
          <input type="password" value={password} onChange={e => setPassword(e?.target.value)} />
          
          <button onClick={async () => {
              console.log(userName, password)
              try {
                const res = await axios.post('https://localhost:44353/api/Authentication/login', {
                    Username: userName,
                    Password: password
                  })
                  onLoggedIn(res.data)
              } catch(err) {
                // handle error
              }          
            }}>Submit
          </button>
      </div>)
}

