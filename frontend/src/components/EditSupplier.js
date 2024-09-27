import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("ID capturado:", id); // Log para verificar o ID capturado
  
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      setIsLoading(false);
      return;
    }
  
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Dados do fornecedor recebidos:", response); // Log para verificar a resposta completa
        setSupplier(response.data); // Definir os dados do fornecedor
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar fornecedor:', error); // Verifique se há um erro específico
        setErrorMessage('Erro ao buscar fornecedor. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };
  
    fetchSupplier();
  }, [id, token]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/suppliers/${id}`, supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setErrorMessage('');
      navigate('/suppliers');
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      setErrorMessage('Erro ao atualizar fornecedor. Tente novamente.');
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (!supplier) return <p>Fornecedor não encontrado</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={supplier.name} 
        onChange={(e) => setSupplier({ ...supplier, name: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        value={supplier.fantasyName || ''} 
        onChange={(e) => setSupplier({ ...supplier, fantasyName: e.target.value })} 
      />
      <input 
        type="text" 
        value={supplier.cnpj} 
        onChange={(e) => setSupplier({ ...supplier, cnpj: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        value={supplier.address || ''} 
        onChange={(e) => setSupplier({ ...supplier, address: e.target.value })} 
      />
      <input 
        type="text" 
        value={supplier.contactName1 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactName1: e.target.value })} 
      />
      <input 
        type="email" 
        value={supplier.contactEmail1 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactEmail1: e.target.value })} 
      />
      <input 
        type="text" 
        value={supplier.contactPhone1 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactPhone1: e.target.value })} 
      />
      <input 
        type="text" 
        value={supplier.contactName2 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactName2: e.target.value })} 
      />
      <input 
        type="email" 
        value={supplier.contactEmail2 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactEmail2: e.target.value })} 
      />
      <input 
        type="text" 
        value={supplier.contactPhone2 || ''} 
        onChange={(e) => setSupplier({ ...supplier, contactPhone2: e.target.value })} 
      />
      <textarea 
        value={supplier.paymentConditions || ''} 
        onChange={(e) => setSupplier({ ...supplier, paymentConditions: e.target.value })} 
      />
      <textarea 
        value={supplier.purchaseHistory || ''} 
        onChange={(e) => setSupplier({ ...supplier, purchaseHistory: e.target.value })} 
      />
      <input 
        type="number" 
        value={supplier.supplierRating || 0} 
        onChange={(e) => setSupplier({ ...supplier, supplierRating: parseInt(e.target.value) || 0 })} 
        min="1"
        max="5"
      />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
}

export default EditSupplier;
