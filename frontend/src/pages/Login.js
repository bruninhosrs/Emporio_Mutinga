import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Falha ao realizar login, por favor, verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome de Usuário" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;
