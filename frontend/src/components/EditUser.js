import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UserForm.css';

const EditUser = () => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('atendente');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const user = response.data;
                setUsername(user.username);
                setEmail(user.email);
                setRole(user.role);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setErrorMessage('Erro ao carregar os dados do usuário.');
            }
        };

        fetchUser();
    }, [id]);

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/users/${id}`, {
                username,
                email,
                role
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            navigate('/users'); // Redireciona de volta à lista de usuários
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            setErrorMessage('Erro ao editar o usuário.');
        }
    };

    const handleBack = () => {
        navigate('/users'); // Redireciona para a lista de usuários
    };

    return (
        <div className="user-form-container">
            <h1 className="form-title">Editar Usuário</h1>
            <form onSubmit={handleEditUser}>
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

                <label>Função:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="atendente">Atendente</option>
                    <option value="sub-gerente">Sub-Gerente</option>
                    <option value="gerente">Gerente</option>
                    <option value="super-admin">Super Admin</option>
                </select>

                <button type="submit" className="form-button">Salvar Alterações</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>

            <button onClick={handleBack} className="back-button">Voltar</button>
        </div>
    );
};

export default EditUser;

