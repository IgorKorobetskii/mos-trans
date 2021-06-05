import React, { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function App() {
  const [auth, setAuth] = useState()

  return (
    <div className="App">
      {auth && <p>{auth!.username}</p>}
      {!auth && <RegisterForm />}
      {!auth && <LoginForm setAuth={setAuth}/>}
    </div>
  );
}

export default App;
