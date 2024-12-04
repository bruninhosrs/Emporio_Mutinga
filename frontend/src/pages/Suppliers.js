import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Supplier.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();

  // Função para carregar a lista de fornecedores do banco
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Funções para os botões
  const handleAdd = () => navigate("/add-supplier");
  const handleEdit = () => {
    if (selectedSupplier) {
      navigate(`/edit-supplier/${selectedSupplier.id}`);
    } else {
      alert("Selecione um fornecedor para editar.");
    }
  };
  const handleDelete = async () => {
    if (selectedSupplier) {
      try {
        await axios.delete(
          `http://localhost:3000/suppliers/${selectedSupplier.id}`
        );
        setSuppliers(
          suppliers.filter((supplier) => supplier.id !== selectedSupplier.id)
        );
        setSelectedSupplier(null);
      } catch (error) {
        console.error("Erro ao deletar fornecedor:", error);
      }
    } else {
      alert("Selecione um fornecedor para deletar.");
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
