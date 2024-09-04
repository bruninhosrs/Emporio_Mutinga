// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', { username, password });
      alert('Login bem-sucedido!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
         type="text" 
         placeholder="Username" 
         value={username} onChange={(e) => 
         setUsername(e.target.value)} />

        <input 
        type="password" 
        placeholder="Password" 
        value={password} onChange={(e) => 
        setPassword(e.target.value)} />

        <button type="submit">Entrar</button>

      </form>
    </div>
  );
}

export default Login;