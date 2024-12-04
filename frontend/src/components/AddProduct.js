import React, { useState } from "react";
import axios from "axios";
import "../css/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/products",
        { name, description, price: parseFloat(price), stock: parseInt(stock) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Produto adicionado com sucesso!");
      navigate("/products");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setMessage("Erro ao adicionar o produto.");
    }
  };

  return (
    <div className="add-product">
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome do Produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label>Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />

        <label>Estoque</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
        />

        <button type="submit">Salvar Produto</button>
        {message && <p className="message">{message}</p>}
        <button
          onClick={() => navigate("/products")}
          className="backhome-button"
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
