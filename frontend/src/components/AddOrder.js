import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Order.css";

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Pendente");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    // Carregar os produtos disponíveis para selecionar ao criar um pedido
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/orders", {
        productId,
        quantity,
        status,
        date,
      });
      setMessage("Pedido adicionado com sucesso!");
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);
      setMessage("Erro ao adicionar pedido.");
    }
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  return (
    <div className="add-order">
      <h1>Adicionar Novo Pedido</h1>
      <form onSubmit={handleAddOrder}>
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
          Adicionar Pedido
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Voltar
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddOrder;
