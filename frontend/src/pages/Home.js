import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    console.log("Role armazenada no localStorage:", userRole);

    if (
      userRole &&
      ["sub-gerente", "gerente", "super-admin"].includes(userRole)
    ) {
      setShowCadastro(true);
    }
    setRole(userRole);
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Funções para navegar entre as páginas
  const handleCashRegisterClick = () => {
    navigate("/caixa");
  };

  const handleRegisterClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao sistema, Empório Mutinga</h1>
      <div className="buttons-container">
        <button className="btn-caixa" onClick={handleCashRegisterClick}>
          <img src="/icons/cash-register-icon.png" alt="Caixa" />
          Caixa
        </button>

        {showCadastro && (
          <button className="btn-cadastro" onClick={handleRegisterClick}>
            <img src="/icons/register-icon.png" alt="Cadastro" />
            Cadastro
          </button>
        )}

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Home;
