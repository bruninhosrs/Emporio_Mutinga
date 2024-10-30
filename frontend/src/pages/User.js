import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/User.css'; // Importando o CSS externo

function User() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    // Busca todos os usuários
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    // Função para deletar um usuário
    const handleDeleteUser = async () => {
        if (!selectedUser) {
            alert("Selecione um usuário para deletar.");
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/users/${selectedUser.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(users.filter(user => user.id !== selectedUser.id));
            setSelectedUser(null); // Resetar seleção
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    // Função para navegar para a página de edição de usuário
    const handleEditUser = () => {
        if (!selectedUser) {
            alert("Selecione um usuário para editar.");
            return;
        }
        navigate(`/users/edit/${selectedUser.id}`);
    };

    // Função para navegar para a página de adição de usuário
    const handleAddUser = () => {
        navigate('/users/add');
    };

    return (
        <div className="user-list-container">
            <h1 className="title">Usuários</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => setSelectedUser(user)} className={selectedUser && selectedUser.id === user.id ? "selected" : ""}>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="buttons">
                <button className="add-button" onClick={handleAddUser}>Adicionar</button>
                <button className="edit-button" onClick={handleEditUser}>Editar</button>
                <button className="delete-button" onClick={handleDeleteUser}>Deletar</button>
            </div>
        </div>
    );
}

export default User;
