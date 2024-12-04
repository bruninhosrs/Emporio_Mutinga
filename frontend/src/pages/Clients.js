import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Client.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Função para selecionar um cliente
  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  // Função para adicionar um cliente
  const handleAddClient = () => {
    navigate("/add-client");
  };

  // Função para editar um cliente
  const handleEditClient = () => {
    if (selectedClient) {
      navigate(`/edit-client/${selectedClient.id}`);
    }
  };

  // Função para deletar um cliente
  const handleDeleteClient = async () => {
    if (selectedClient) {
      try {
        await axios.delete(
          `http://localhost:3000/clients/${selectedClient.id}`
        );
        fetchClients();
        setSelectedClient(null);
      } catch (error) {
        console.error("Erro ao deletar cliente:", error);
      }
    }
  };

  // Função para voltar para a tela de Cadastro
  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="client-list-container">
      <h1>Listar Cliente</h1>
      <button className="home-button" onClick={handleGoBack}>
        🏠
      </button>

      <div className="client-table">
        <table>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                onClick={() => handleSelectClient(client)}
                className={
                  selectedClient && selectedClient.id === client.id
                    ? "selected"
                    : ""
                }
              >
                <td>{client.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="add-button" onClick={handleAddClient}>
          Adicionar
        </button>
        <button className="edit-button" onClick={handleEditClient}>
          Editar
        </button>
        <button className="delete-button" onClick={handleDeleteClient}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default Clients;
