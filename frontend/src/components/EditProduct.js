import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Product.css";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  // Busca os dados do produto ao carregar a página
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para atualizar o produto
  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      const updatedProduct = { name, description, price, stock };
      await axios.put(`http://localhost:3000/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Produto atualizado com sucesso!");
      navigate("/products");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar o produto. Verifique os detalhes no console.");
    }
  };

  return (
    <div className="edit-product">
      <h1>Editar Produto</h1>
      <label>Nome:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Descrição:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Preço:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Estoque:</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={handleUpdateProduct} className="update-button">
        Salvar Alterações
      </button>

      <button onClick={() => navigate("/products")} className="backhome-button">
        Voltar
      </button>
    </div>
  );
};

export default EditProduct;
