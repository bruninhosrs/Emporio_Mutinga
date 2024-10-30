import React from 'react';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <h1>Cadastros</h1>
        <nav className="cadastro-nav">
          <ul>
            <li><a href="/products">Produtos</a></li>
            <li><a href="/orders">Pedidos</a></li>
            <li><a href="/clients">Clientes</a></li>
            <li><a href="/suppliers">Fornecedores</a></li>
          </ul>
        </nav>
      </header>
      <main className="cadastro-content">
        <p>Tela de Cadastro.</p>
        {/* Aqui você pode adicionar mais seções conforme as funcionalidades */}
      </main>
    </div>
  );
}

export default Dashboard;
