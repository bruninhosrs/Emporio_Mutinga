import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adicionei o useNavigate

function AddOrder() {
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('pendente');
  const [productId, setProductId] = useState(''); // Relacionado ao produto
  const [userId, setUserId] = useState(''); // Relacionado ao usuário
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token'); // Pegando o token do localStorage
  const navigate = useNavigate(); // Inicialize o navigate

  const handleAddOrder = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!quantity || parseInt(quantity) <= 0 || !productId || !userId) {
      setErrorMessage('Preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/orders', {
        quantity: parseInt(quantity),
        status,
        productId,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Autorização com token JWT
        }
      });
      setSuccessMessage('Pedido adicionado com sucesso!');
      setErrorMessage('');
      
      // Redireciona para a tela de pedidos após 1 segundo
      setTimeout(() => {
        navigate('/orders');
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      setErrorMessage('Erro ao adicionar o pedido. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleAddOrder}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <input 
        type="number" 
        placeholder="Quantidade" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        required 
        min="1"
      />
      
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendente">Pendente</option>
        <option value="concluída">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>

      <input 
        type="text" 
        placeholder="ID do Produto" 
        value={productId} 
        onChange={(e) => setProductId(e.target.value)} 
        required 
      />

      <input 
        type="text" 
        placeholder="ID do Usuário" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        required 
      />
      
      <button type="submit">Adicionar Pedido</button>
    </form>
  );
}

export default AddOrder;
