import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Pegando o token do localStorage

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      return;
    }

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/suppliers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        setErrorMessage('Erro ao buscar fornecedores. Tente novamente mais tarde.');
      }
    };

    fetchSuppliers();
  }, [token]);

  const handleDelete = async (supplierId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este fornecedor?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/suppliers/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
      setErrorMessage('Erro ao excluir o fornecedor.');
    }
  };

  return (
    <div>
      <h1>Fornecedores</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate('/suppliers/add')}>Adicionar Fornecedor</button>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>
            {`Nome: ${supplier.name} | CNPJ: ${supplier.cnpj} | Avaliação: ${supplier.supplierRating || 'N/A'}`}
            <button onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}>Editar</button>
            <button onClick={() => handleDelete(supplier.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suppliers;
