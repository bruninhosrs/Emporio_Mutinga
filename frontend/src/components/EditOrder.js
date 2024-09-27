import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Definindo o estado do sucesso
  const token = localStorage.getItem('token'); // Pegando o token do localStorage

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      setIsLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Certifique-se de que o token está correto
          },
        });
        if (response.data) {
          setOrder(response.data);
          setIsLoading(false);
        } else {
          setErrorMessage('Pedido não encontrado');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        setErrorMessage('Erro ao buscar pedido. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order.quantity || order.quantity <= 0) {
      setErrorMessage('A quantidade deve ser maior que zero.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/orders/${id}`, order, {
        headers: {
          Authorization: `Bearer ${token}`, // Autorização com token JWT
        },
      });
      setSuccessMessage('Pedido atualizado com sucesso!');
      setTimeout(() => {
        navigate('/orders'); // Redireciona para a tela de pedidos após 2 segundos
      }, 1000);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      setErrorMessage('Erro ao atualizar o pedido. Tente novamente mais tarde.');
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label>Quantidade:</label>
      <input 
        type="number" 
        value={order.quantity} 
        onChange={(e) => setOrder({ ...order, quantity: parseInt(e.target.value) || 0 })} 
        min="1"
        required
      />
      <label>Status:</label>
      <select value={order.status} onChange={(e) => setOrder({ ...order, status: e.target.value })}>
        <option value="pendente">Pendente</option>
        <option value="concluída">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>
      <button type="submit">Salvar Alterações</button>
    </form>
  );
}

export default EditOrder;
