import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Client.css";

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    fantasyName: "",
    cpfCnpj: "",
    address: "",
    contactName1: "",
    contactEmail1: "",
    contactPhone1: "",
    purchaseHistory: "",
    creditLimit: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para adicionar o cliente
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/clients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Cliente adicionado com sucesso!");
      setTimeout(() => navigate("/clients"), 1500);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      setMessage("Erro ao adicionar cliente.");
    }
  };

  // Função para cancelar e voltar
  const handleCancel = () => {
    navigate("/clients");
  };

  return (
    <div className="client-form-container">
      <h1>Adicionar Cliente</h1>
      <form onSubmit={handleAddClient} className="client-form">
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Nome Fantasia:</label>
        <input
          type="text"
          name="fantasyName"
          value={formData.fantasyName}
          onChange={handleInputChange}
        />

        <label>CPF/CNPJ:</label>
        <input
          type="text"
          name="cpfCnpj"
          value={formData.cpfCnpj}
          onChange={handleInputChange}
          required
        />

        <label>Endereço:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <label>Contato Nome 1:</label>
        <input
          type="text"
          name="contactName1"
          value={formData.contactName1}
          onChange={handleInputChange}
        />

        <label>Contato Email 1:</label>
        <input
          type="email"
          name="contactEmail1"
          value={formData.contactEmail1}
          onChange={handleInputChange}
        />

        <label>Contato Telefone 1:</label>
        <input
          type="text"
          name="contactPhone1"
          value={formData.contactPhone1}
          onChange={handleInputChange}
        />

        <label>Histórico de Compras:</label>
        <input
          type="text"
          name="purchaseHistory"
          value={formData.purchaseHistory}
          onChange={handleInputChange}
        />

        <label>Limite de Crédito:</label>
        <input
          type="number"
          name="creditLimit"
          value={formData.creditLimit}
          onChange={handleInputChange}
        />

        <div className="form-buttons">
          <button type="submit" className="add-button">
            Adicionar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddClient;
