import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Client.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
    } catch (error) {
      setMessage('Erro ao buscar clientes.');
      console.error(error);
    }
  };

  const handleAddClient = () => navigate("/add-client");

  const handleEditClient = () => {
    if (selectedClient) {
      navigate(`/edit-client/${selectedClient.id}`);
    } else {
      alert("Selecione um cliente para editar.")
    }
  }

  const handleDeleteClient = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Erro: Token de autenticação não encontrado.');
        alert('Erro: Token de autenticação não encontrado.');
        return;
    }

    // Verifica se há um cliente selecionado
    if (selectedClient) {
        try {
            
            await axios.delete(`http://localhost:3000/clients/${selectedClient.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            // Atualiza a lista de clientes e reseta a seleção
            await fetchClients();
            setSelectedClient(null);
            alert('Cliente deletado com sucesso.');
        } catch (error) {
            // Verifica se o erro é relacionado ao token
            if (error.response && error.response.status === 401) {
                console.error('Erro: Token inválido ou não autorizado.');
                alert('Erro: Token inválido ou não autorizado.');
            } else {
                console.error('Erro ao deletar cliente:', error);
                alert('Erro ao deletar cliente.');
            }
        }
    } else {
      alert('Erro: Nenhum cliente selecionado.');
    }
};

  const handleGoBack = () => navigate("/dashboard");

  return (
    <div className="client-list-container">
      <h1>Listar Cliente</h1>
      <button className="home-button" onClick={handleGoBack}>🏠</button>
      {message && <p>{message}</p>}
      <div className="client-table">
        <table>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={selectedClient?.id === client.id ? "selected" : ""}
              >
                <td>{client.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="action-buttons">
        <button className="add-button" onClick={handleAddClient}>Adicionar</button>
        <button className="edit-button" onClick={handleEditClient}>Editar</button>
        <button className="delete-button" onClick={handleDeleteClient}>Deletar</button>
      </div>
    </div>
  );
};

export default Clients;
