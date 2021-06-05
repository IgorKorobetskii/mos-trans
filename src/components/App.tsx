import React, { useState } from 'react';
import { User } from '../types';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UsersList from './UsersList';


function App() {
  const [auth, setAuth] = useState<User>()

  return (
    <div className="App">
      {auth && <UsersList auth={auth}/>}
      {!auth && <RegisterForm />}
      {!auth && <LoginForm setAuth={setAuth} />}
    </div>
  );
}

export default App;
