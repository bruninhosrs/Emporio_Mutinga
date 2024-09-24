import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Aqui você pode buscar o token armazenado no localStorage ou o estado de autenticação
  const isAuthenticated = localStorage.getItem('token') !== null;

  // Se o usuário estiver autenticado, renderiza o componente filho
  // Caso contrário, redireciona para a página de login
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
