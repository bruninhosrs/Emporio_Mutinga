import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluindo o token na requisição DELETE
        },
      });
      console.log('Produto excluído com sucesso');
      setProducts(products.filter(product => product.id !== productId)); // Atualiza a lista de produtos
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <button className="add-button" onClick={() => navigate('/products/add')}>Adicionar Produto</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R${!isNaN(product.price) ? Number(product.price).toFixed(2) : 'Preço Inválido'}
            <button onClick={() => navigate(`/products/edit/${product.id}`)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;