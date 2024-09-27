import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Pegando o token do localStorage

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token de autenticação não encontrado. Faça login.');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `Bearer ${token}` // Autorização com token JWT
          }
        });
        setOrders(response.data);
        setErrorMessage(''); // Limpa a mensagem de erro, se houve sucesso
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setErrorMessage('Erro ao buscar pedidos. Verifique sua conexão.');
      }
    };

    fetchOrders();
  }, [token]);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este pedido?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Autorização com token JWT
        }
      });
      setOrders(orders.filter(order => order.id !== orderId));
      setSuccessMessage('Pedido excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      setErrorMessage('Erro ao excluir o pedido.');
    }
  };

  return (
    <div>
      <h1>Pedidos</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button onClick={() => navigate('/orders/add')}>Adicionar Pedido</button>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {`Data: ${order.date} | Quantidade: ${order.quantity} | Status: ${order.status}`}
            <button onClick={() => navigate(`/orders/edit/${order.id}`)}>Editar</button>
            <button onClick={() => handleDelete(order.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
