import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddClient() {
  const [name, setName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [contactName1, setContactName1] = useState('');
  const [contactEmail1, setContactEmail1] = useState('');
  const [contactPhone1, setContactPhone1] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAddClient = async (e) => {
    e.preventDefault();
    
    if (!name || !cpfCnpj) {
      setErrorMessage('Preencha os campos obrigatórios: Nome e CPF/CNPJ.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/clients', {
        name,
        fantasyName,
        cpfCnpj,
        address,
        contactName1,
        contactEmail1,
        contactPhone1,
        purchaseHistory,
        creditLimit: parseFloat(creditLimit) || 0.00
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('Cliente adicionado com sucesso!');
      setErrorMessage('');
      
      setTimeout(() => {
        navigate('/clients');
      }, 1000);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      setErrorMessage('Erro ao adicionar cliente. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleAddClient}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <input 
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Nome Fantasia" 
        value={fantasyName} 
        onChange={(e) => setFantasyName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="CPF/CNPJ" 
        value={cpfCnpj} 
        onChange={(e) => setCpfCnpj(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Endereço" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Nome de Contato" 
        value={contactName1} 
        onChange={(e) => setContactName1(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email de Contato" 
        value={contactEmail1} 
        onChange={(e) => setContactEmail1(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone de Contato" 
        value={contactPhone1} 
        onChange={(e) => setContactPhone1(e.target.value)} 
      />
      <textarea 
        placeholder="Histórico de Compras" 
        value={purchaseHistory} 
        onChange={(e) => setPurchaseHistory(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Limite de Crédito" 
        value={creditLimit} 
        onChange={(e) => setCreditLimit(e.target.value)} 
        min="0"
        step="0.01"
      />
      <button type="submit">Adicionar Cliente</button>
    </form>
  );
}

export default AddClient;
