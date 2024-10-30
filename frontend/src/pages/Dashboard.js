import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div className="cadastro-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/users">Usuário</Link>
        <Link to="/products">Produto</Link>
        <Link to="/clients">Cliente</Link>
        <Link to="/orders">Pedido</Link>
        <Link to="/suppliers">Fornecedor</Link>
      </nav>

      <h1 className="titulo-cadastro">Cadastros</h1>

      <div className="botoes-container">
        <div className="botao-icone">
          <Link to="/users">
            {/* Substitua com um ícone de usuário escolhido */}
            <i className="fa fa-user"></i>
            Usuário
          </Link>
        </div>
        <div className="botao-icone">
          <Link to="/products">
            {/* Substitua com um ícone de products escolhido */}
            <i className="fa fa-box"></i>
            Produto
          </Link>
        </div>
        <div className="botao-icone">
          <Link to="/clients">
            {/* Substitua com um ícone de clients escolhido */}
            <i className="fa fa-users"></i>
            Cliente
          </Link>
        </div>
        <div className="botao-icone">
          <Link to="/orders">
            {/* Substitua com um ícone de pedido escolhido */}
            <i className="fa fa-file-invoice"></i>
            Pedido
          </Link>
        </div>
        <div className="botao-icone">
          <Link to="/suppliers">
            {/* Substitua com um ícone de suppliers escolhido */}
            <i className="fa fa-truck"></i>
            Fornecedor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
