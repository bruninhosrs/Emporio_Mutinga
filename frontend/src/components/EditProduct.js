import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); // Pegando o ID do produto via URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Estado para o produto
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // Buscar o produto ao carregar a página
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adicionando o token na requisição
          },
        });
        setProduct(response.data); // Colocar os dados do produto no estado
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para enviar a atualização do produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluindo o token na requisição PUT
        },
      });
      navigate('/products'); // Redireciona de volta para a lista de produtos
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  // Caso esteja carregando ou o produto não seja encontrado
  if (isLoading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado</p>;

  // Formulário de edição do produto
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={product.name} 
        onChange={(e) => setProduct({ ...product, name: e.target.value })} 
      />
      <input 
        type="number" 
        value={product.price} 
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} 
      />
      <input 
        type="number" 
        value={product.stock} 
        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value, 10) })} 
      />
      <input 
        type="text" 
        value={product.description} 
        onChange={(e) => setProduct({ ...product, description: e.target.value })} 
      />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
}

export default EditProduct;