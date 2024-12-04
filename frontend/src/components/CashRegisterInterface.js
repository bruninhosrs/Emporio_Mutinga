import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CashRegister.css";

const CashRegisterInterface = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [ean, setEan] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setMessage(`${date} ${time}`);
    };
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/ean/${ean}`
      );
      const product = response.data;

      const unitPrice = parseFloat(product.price);
      const totalPrice = unitPrice * quantity * (1 - discount / 100);

      const newProduct = {
        name: product.name,
        quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice.toFixed(2),
      };
      setProducts([...products, newProduct]);
      setTotal((prevTotal) => prevTotal + parseFloat(totalPrice));
      setEan("");
      setQuantity(1);
      setDiscount(0);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setMessage("Produto não encontrado.");
    }
  };

  const handleRemoveProduct = (index) => {
    const productToRemove = products[index];
    setTotal((prevTotal) => prevTotal - parseFloat(productToRemove.totalPrice));
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="cash-register-container">
      <h1 className="title">Caixa Registradora</h1>
      <div className="date-time">{message}</div>

      <div className="product-entry">
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
          placeholder="Quantidade"
          min="1"
        />
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Desc%"
          min="0"
        />
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>R${parseFloat(product.unitPrice).toFixed(2)}</td>
              <td>R${product.totalPrice}</td>
              <td>
                <button onClick={() => handleRemoveProduct(index)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="total">Total a Pagar: R${total.toFixed(2)}</h2>

      <div className="buttons">
        <button className="btn gray">Sangria</button>
        <button className="btn gray">Sair</button>
        <button className="btn gray">Cancelar Item</button>
        <button className="btn gray">Finalizar</button>
      </div>
    </div>
  );
};

export default CashRegisterInterface;
