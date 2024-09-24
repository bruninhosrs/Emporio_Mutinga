// AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Busque o token JWT armazenado
      const response = await axios.post('http://localhost:3000/products', {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        description,
        barcode,
        category,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Inclui o token no cabeçalho
        }
      });
      console.log('Produto adicionado com sucesso:', response.data);
      onAdd(); // Chama a função de callback para atualizar a lista de produtos
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <input 
      type="text"
      placeholder="Nome" 
      value={name} 
      onChange={(e) => setName(e.target.value)} required 
      />
      <input 
      type="number" 
      placeholder="Preço" 
      value={price} onChange={(e) => 
      setPrice(e.target.value)} required 
      />
      
      <input 
      type="number" 
      placeholder="Estoque" 
      value={stock} 
      onChange={(e) => setStock(e.target.value)} required 
      />

      <input
       type="text" 
       placeholder="Descrição" 
       value={description} 
       onChange={(e) => setDescription(e.target.value)} 
       />

      <input 
      type="text" 
      placeholder="Código de Barras" 
      value={barcode} 
      onChange={(e) => setBarcode(e.target.value)} 
      />

      <input 
      type="text" 
      placeholder="Categoria" 
      value={category} 
      onChange={(e) => setCategory(e.target.value)} 
      />
      
      <button type="submit">Adicionar Produto</button>
    </form>
  );
}

export default AddProduct;
