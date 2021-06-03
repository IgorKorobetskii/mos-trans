import React, { useState } from 'react'

function RegisterForm() {
  const [test, setTest] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchTest = async (event: any) => {
    event.preventDefault()
    const response = await fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    setTest(JSON.stringify(data.message))
  }

  return (
    <form onSubmit={fetchTest}>
      <p>{test}</p>
      <input type="text" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default RegisterForm
