import React, { useState } from 'react';
import axios from 'axios';

const CashRegisterInterface = () => {
    const [products, setProducts] = useState([]);
    const [ean, setEan] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState('');

    // Função para abrir o caixa
    const handleOpenCashRegister = async () => {
        try {
            const token = localStorage.getItem('token'); // Assumindo que o token está armazenado no localStorage
            const response = await axios.post('http://localhost:3000/cashRegisters/open', {
                registerNumber: 1, // Caixa 1, alterar conforme necessário
                openingBalance: 50 // Valor de abertura
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
                }
            });
            setMessage('Caixa aberto com sucesso!');
            console.log('Caixa aberto:', response.data);
        } catch (error) {
            console.error('Erro ao abrir caixa:', error);
            setMessage('Erro ao abrir o caixa.');
        }
    };

    // Função para adicionar produtos à lista de vendas
    const handleAddProduct = async () => {
        try {
            // Faz uma requisição para buscar o produto pelo EAN
            const response = await axios.get(`http://localhost:3000/products/ean/${ean}`);
            const product = response.data;

            // Atualiza a lista de produtos e o total
            const newProduct = { ...product, quantity: parseInt(quantity) };
            setProducts([...products, newProduct]);

            // Atualiza o total da venda
            setTotal(prevTotal => prevTotal + (product.price * quantity));

            // Limpa os campos de entrada
            setEan('');
            setQuantity(1);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            setMessage('Erro ao adicionar produto.');
        }
    };

    // Função para remover produtos da lista
    const handleRemoveProduct = (index) => {
        const productToRemove = products[index];
        setTotal(prevTotal => prevTotal - (productToRemove.price * productToRemove.quantity));

        // Remove o produto da lista
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    return (
        <div>
            <h1>Caixa Registradora</h1>
            <button onClick={handleOpenCashRegister}>Abrir com R$50,00</button>
            <p>{message}</p>

            <h2>Venda</h2>
            <input 
                type="text" 
                value={ean} 
                onChange={(e) => setEan(e.target.value)} 
                placeholder="EAN" 
            />
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                min="1" 
            />
            <button onClick={handleAddProduct}>Adicionar Produto</button>

            <h3>Lista de Produtos</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - Qtd: {product.quantity} - R${(product.price * product.quantity).toFixed(2)}
                        <button onClick={() => handleRemoveProduct(index)}>Remover</button>
                    </li>
                ))}
            </ul>

            <h2>Total da Venda: R${total.toFixed(2)}</h2>
        </div>
    );
};

export default CashRegisterInterface;
