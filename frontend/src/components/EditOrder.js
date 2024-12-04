import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Order.css";

const EditOrder = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`);
        const { productId, quantity, status, date } = response.data;
        setProductId(productId);
        setQuantity(quantity);
        setStatus(status);
        setDate(new Date(date).toISOString().slice(0, 10));
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      }
    };

    fetchProducts();
    fetchOrder();
  }, [id]);

  const handleEditOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/orders/${id}`, {
        productId,
        quantity,
        status,
        date,
      });
      setMessage("Pedido atualizado com sucesso!");
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      setMessage("Erro ao atualizar pedido.");
    }
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  return (
    <div className="edit-order">
      <h1>Editar Pedido</h1>
      <form onSubmit={handleEditOrder}>
        <div className="form-group">
          <label>Produto</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Selecione um Produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - R${product.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Atualizar Pedido
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Voltar
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default EditOrder;
