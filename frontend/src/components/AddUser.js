import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/UserForm.css';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('atendente');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/users', {
                username,
                email,
                password,
                role
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            navigate('/users'); // Redireciona de volta à lista de usuários
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            setErrorMessage('Erro ao adicionar o usuário. Verifique os dados.');
        }
    };

    const handleBack = () => {
        navigate('/users'); // Redireciona para a lista de usuários
    };

    return (
        <div className="user-form-container">
            <h1 className="form-title">Adicionar Usuário</h1>
            <form onSubmit={handleAddUser}>
                <label>Nome de Usuário:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>Senha:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Função:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="atendente">Atendente</option>
                    <option value="sub-gerente">Sub-Gerente</option>
                    <option value="gerente">Gerente</option>
                    <option value="super-admin">Super Admin</option>
                </select>

                <button type="submit" className="form-button">Adicionar</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>

            <button onClick={handleBack} className="back-button">Voltar</button>
        </div>
    );
};

export default AddUser;
