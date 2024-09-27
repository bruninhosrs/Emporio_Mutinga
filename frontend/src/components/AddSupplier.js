import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSupplier() {
  const [name, setName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [contactName1, setContactName1] = useState('');
  const [contactEmail1, setContactEmail1] = useState('');
  const [contactPhone1, setContactPhone1] = useState('');
  const [contactName2, setContactName2] = useState('');
  const [contactEmail2, setContactEmail2] = useState('');
  const [contactPhone2, setContactPhone2] = useState('');
  const [paymentConditions, setPaymentConditions] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [supplierRating, setSupplierRating] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    
    if (!name || !cnpj) {
      setErrorMessage('Preencha os campos obrigatórios: Nome e CNPJ.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/suppliers', {
        name,
        fantasyName,
        cnpj,
        address,
        contactName1,
        contactEmail1,
        contactPhone1,
        contactName2,
        contactEmail2,
        contactPhone2,
        paymentConditions,
        purchaseHistory,
        supplierRating: parseInt(supplierRating) || 0
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('Fornecedor adicionado com sucesso!');
      setErrorMessage('');
      
      setTimeout(() => {
        navigate('/suppliers');
      }, 1000);
    } catch (error) {
      console.error('Erro ao adicionar fornecedor:', error);
      setErrorMessage('Erro ao adicionar fornecedor. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleAddSupplier}>
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
        placeholder="CNPJ" 
        value={cnpj} 
        onChange={(e) => setCnpj(e.target.value)} 
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
        placeholder="Nome de Contato 1" 
        value={contactName1} 
        onChange={(e) => setContactName1(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email de Contato 1" 
        value={contactEmail1} 
        onChange={(e) => setContactEmail1(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone de Contato 1" 
        value={contactPhone1} 
        onChange={(e) => setContactPhone1(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Nome de Contato 2" 
        value={contactName2} 
        onChange={(e) => setContactName2(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email de Contato 2" 
        value={contactEmail2} 
        onChange={(e) => setContactEmail2(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone de Contato 2" 
        value={contactPhone2} 
        onChange={(e) => setContactPhone2(e.target.value)} 
      />
      <textarea 
        placeholder="Condições de Pagamento" 
        value={paymentConditions} 
        onChange={(e) => setPaymentConditions(e.target.value)} 
      />
      <textarea 
        placeholder="Histórico de Compras" 
        value={purchaseHistory} 
        onChange={(e) => setPurchaseHistory(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Avaliação do Fornecedor" 
        value={supplierRating} 
        onChange={(e) => setSupplierRating(e.target.value)} 
        min="1"
        max="5"
      />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
  );
}

export default AddSupplier;
