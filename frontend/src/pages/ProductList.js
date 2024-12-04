import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../css/Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => navigate("/add-product");

  const handleEditProduct = () => {
    if (selectedProductId) {
      navigate(`/edit-product/${selectedProductId}`);
    } else {
      alert("Selecione um produto para editar.");
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) {
      alert("Selecione um produto para deletar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/products/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Produto excluído com sucesso!");

      // Atualize a lista de produtos após a exclusão
      fetchProducts();
      setSelectedProductId(null);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <div className="product-list">
      <h1>Lista de Produtos</h1>
      <button className="home-button" onClick={() => navigate("/dashboard")}>
        <FaHome size={20} /> Voltar
      </button>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => setSelectedProductId(product.id)}
              className={product.id === selectedProductId ? "selected" : ""}
            >
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>R${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button className="add-button" onClick={handleAddProduct}>
          Adicionar
        </button>
        <button className="edit-button" onClick={handleEditProduct}>
          Editar
        </button>
        <button className="delete-button" onClick={handleDeleteProduct}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default ProductList;
