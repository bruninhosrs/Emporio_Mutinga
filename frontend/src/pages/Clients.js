import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Clients() {
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Pegando o token do localStorage

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      return;
    }

    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setErrorMessage('Erro ao buscar clientes. Tente novamente mais tarde.');
      }
    };

    fetchClients();
  }, [token]);

  const handleDelete = async (clientId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este cliente?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setErrorMessage('Erro ao excluir o cliente.');
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate('/clients/add')}>Adicionar Cliente</button>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {`Nome: ${client.name} | CPF/CNPJ: ${client.cpfCnpj} | Limite de Crédito: ${client.creditLimit}`}
            <button onClick={() => navigate(`/clients/edit/${client.id}`)}>Editar</button>
            <button onClick={() => handleDelete(client.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;
