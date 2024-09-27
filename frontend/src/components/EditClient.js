import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      setIsLoading(false);
      return;
    }

    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        setErrorMessage('Erro ao buscar cliente. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/clients/${id}`, client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setErrorMessage('');
      navigate('/clients');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      setErrorMessage('Erro ao atualizar cliente. Tente novamente.');
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (!client) return <p>Cliente não encontrado</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={client.name} 
        onChange={(e) => setClient({ ...client, name: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        value={client.fantasyName || ''} 
        onChange={(e) => setClient({ ...client, fantasyName: e.target.value })} 
      />
      <input 
        type="text" 
        value={client.cpfCnpj} 
        onChange={(e) => setClient({ ...client, cpfCnpj: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        value={client.address || ''} 
        onChange={(e) => setClient({ ...client, address: e.target.value })} 
      />
      <input 
        type="text" 
        value={client.contactName1 || ''} 
        onChange={(e) => setClient({ ...client, contactName1: e.target.value })} 
      />
      <input 
        type="email" 
        value={client.contactEmail1 || ''} 
        onChange={(e) => setClient({ ...client, contactEmail1: e.target.value })} 
      />
      <input 
        type="text" 
        value={client.contactPhone1 || ''} 
        onChange={(e) => setClient({ ...client, contactPhone1: e.target.value })} 
      />
      <textarea 
        value={client.purchaseHistory || ''} 
        onChange={(e) => setClient({ ...client, purchaseHistory: e.target.value })} 
      />
      <input 
        type="number" 
        value={client.creditLimit || 0.00} 
        onChange={(e) => setClient({ ...client, creditLimit: parseFloat(e.target.value) || 0.00 })} 
        min="0"
        step="0.01"
      />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
}

export default EditClient;
