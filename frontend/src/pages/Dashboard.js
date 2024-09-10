import React from 'react';
import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <nav className="dashboard-nav">
          <ul>
            <li><a href="/products">Produtos</a></li>
            <li><a href="/orders">Pedidos</a></li>
            <li><a href="/clients">Clientes</a></li>
            <li><a href="/suppliers">Fornecedores</a></li>
          </ul>
        </nav>
      </header>
      <main className="dashboard-content">
        <p>Bem-vindo ao sistema de gerenciamento do Empório Mutinga.</p>
        {/* Aqui você pode adicionar mais seções conforme as funcionalidades */}
      </main>
    </div>
  );
}

export default Dashboard;
