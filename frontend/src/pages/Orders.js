import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import "../css/Order.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    navigate("/add-order");
  };

  const handleEditOrder = () => {
    if (selectedOrderId) {
      navigate(`/edit-order/${selectedOrderId}`);
    } else {
      alert("Selecione um pedido para editar");
    }
  };

  const handleDeleteOrder = async () => {
    if (selectedOrderId) {
      try {
        await axios.delete(`http://localhost:3000/orders/${selectedOrderId}`);
        setOrders(orders.filter((order) => order.id !== selectedOrderId));
        setSelectedOrderId(null);
      } catch (error) {
        console.error("Erro ao deletar pedido:", error);
      }
    } else {
      alert("Selecione um pedido para deletar");
    }
  };

  return (
    <div className="order-list">
      <h1>Listar Pedidos</h1>
      <button className="home-button" onClick={() => navigate("/dashboard")}>
        <FaHome size={20} /> Voltar
      </button>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Status</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              onClick={() => setSelectedOrderId(order.id)}
              className={order.id === selectedOrderId ? "selected" : ""}
            >
              <td>Pedido {String.fromCharCode(65 + index)}</td>
              <td>{order.status}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button className="add-button" onClick={handleAddOrder}>
          Adicionar
        </button>
        <button className="edit-button" onClick={handleEditOrder}>
          Editar
        </button>
        <button className="delete-button" onClick={handleDeleteOrder}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default Orders;
