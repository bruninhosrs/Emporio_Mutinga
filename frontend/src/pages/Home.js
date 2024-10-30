import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(''); // Role do usuário, atualizada no useEffect
    const [showCadastro, setShowCadastro] = useState(false);

    // Recuperar a role do usuário do localStorage e atualizar o estado
    useEffect(() => {
        const userRole = localStorage.getItem('role');
        console.log('Role armazenada no localStorage:', userRole);
    
        if (userRole && ['sub-gerente', 'gerente', 'super-admin'].includes(userRole)) {
            setShowCadastro(true);  // Exibe o botão Cadastro apenas para usuários autorizados
        }
        setRole(userRole);  // Armazena a role no estado para usar posteriormente
    }, []);
    

    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        //localStorage.removeItem('role'); // Remover a role do localStorage
        navigate('/login');
    };

    // Funções para navegar entre as páginas
    const handleCashRegisterClick = () => {
        navigate('/caixa');
    };

    const handleRegisterClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="home-container">
            <h1>Bem-vindo ao sistema, Empório Mutinga</h1>
            <div className="buttons-container">
                <button className="btn-caixa" onClick={handleCashRegisterClick}>
                    <img src="/icons/cash-register-icon.png" alt="Caixa" />
                    Caixa
                </button>

                {/* Exibe o botão de cadastro somente se a role for uma das permitidas */}
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
