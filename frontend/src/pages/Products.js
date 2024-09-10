import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  
  // Função para buscar os produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); 
        setProducts(response.data);
      } catch (error) {
        setError('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Gestão de Produtos</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="products-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-button">Adicionar Produto</button>
    </div>
  );
}

export default Products;
