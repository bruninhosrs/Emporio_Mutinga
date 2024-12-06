import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Supplier.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      setMessage("Erro ao buscar fornecedores.");
      console.error(error);
    }
  };

  const handleAdd = () => navigate("/add-supplier");

  const handleEdit = () => {
    if (selectedSupplier) {
      navigate(`/edit-supplier/${selectedSupplier.id}`);
    } else {
      alert("Selecione um fornecedor para editar.");
    }
  };

  // Função para deletar um cliente
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Erro: Token de autenticação não encontrado.");
      alert("Erro: Token de autenticação não encontrado.");
      return;
    }

    // Verifica se há um fornecedor selecionado
    if (selectedSupplier) {
      try {
        await axios.delete(`http://localhost:3000/suppliers/${selectedSupplier.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        await fetchSuppliers();
        setSelectedSupplier(null);
        alert("Fornecedor deletado com sucesso.");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Erro: Token inválido ou não autorizado.");
          alert("Erro: Token inválido ou não autorizado.");
        } else {
          console.error("Erro ao deletar fornecedor:", error);
          alert("Erro ao deletar fornecedor.");
        }
      }
    } else {
      alert("Erro: Nenhum fornecedor selecionado.");
    }
  };

  const handleBackToHome = () => navigate("/dashboard");

  return (
    <div className="supplier-list-container">
      <h1>Lista de Fornecedores</h1>

      <table className="supplier-table">
        <thead>
          <tr>
            <th>Nome do Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              onClick={() => setSelectedSupplier(supplier)}
              className={selectedSupplier?.id === supplier.id ? "selected" : ""}
            >
              <td>{supplier.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="back-button" onClick={handleBackToHome}>
          🏠
        </button>
        <button className="add-button" onClick={handleAdd}>
          Adicionar
        </button>
        <button className="edit-button" onClick={handleEdit}>
          Editar
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default Suppliers;
