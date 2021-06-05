import React, { useState } from 'react'

const LoginForm = ({setAuth}:{setAuth:any})=> {
  const [test, setTest] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchTest = async (event: any) => {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.status === 200) {
      setAuth({username, password})
    }
    const data = await response.json()
    setTest(JSON.stringify(data.message))
  }

  return (
    <form onSubmit={fetchTest}>
      <h3>Login</h3>
      <p>{test}</p>
      <input type="text" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" />
      <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm
