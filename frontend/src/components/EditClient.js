import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Client.css";

const EditClient = () => {
  const { id } = useParams();
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

  // Função para buscar os dados do cliente existente
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/clients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
        alert("Erro ao carregar dados do cliente.");
      }
    };
    fetchClientData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para editar o cliente
  const handleEditClient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/clients/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cliente atualizado com sucesso!");
      setTimeout(() => navigate("/clients"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    }
  };

  // Função para cancelar e voltar
  const handleCancel = () => {
    navigate("/clients");
  };

  return (
    <div className="client-form-container">
      <h1>Editar Cliente</h1>
      <form onSubmit={handleEditClient} className="client-form">
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
          <button type="submit" className="edit-button">
            Salvar
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

export default EditClient;
