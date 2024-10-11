import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CashRegister = () => {
  const [balance, setBalance] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const [amount, setAmount] = useState('');

  // Consulta o saldo atual do caixa
  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cashRegisters/balance/1'); // ajuste a URL conforme necessário
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Erro ao buscar o saldo do caixa:', error);
    }
  };

  // Abrir Caixa
  const openCashRegister = async () => {
    try {
      await axios.post('http://localhost:3000/cashRegisters/open', { registerNumber: 1, openingBalance });
      setRegisterStatus('aberto');
      fetchBalance();
    } catch (error) {
      console.error('Erro ao abrir o caixa:', error);
    }
  };

  // Fechar Caixa
  const closeCashRegister = async () => {
    try {
      await axios.post('http://localhost:3000/cashRegisters/close/1');
      setRegisterStatus('fechado');
      fetchBalance();
    } catch (error) {
      console.error('Erro ao fechar o caixa:', error);
    }
  };

  // Adicionar Entrada
  const addCashEntry = async () => {
    try {
      await axios.post('http://localhost:3000/cashRegisters/addEntry', { registerNumber: 1, amount });
      fetchBalance();
    } catch (error) {
      console.error('Erro ao adicionar entrada:', error);
    }
  };

  // Realizar Sangria
  const withdrawFromCash = async () => {
    try {
      await axios.post('http://localhost:3000/cashRegisters/withdraw', { registerNumber: 1, withdrawalAmount: amount });
      fetchBalance();
    } catch (error) {
      console.error('Erro ao realizar sangria:', error);
    }
  };

  useEffect(() => {
    fetchBalance(); // Carregar o saldo ao montar o componente
  }, []);

  return (
    <div>
      <h1>Gestão de Caixa</h1>
      <p>Saldo Atual: R$ {balance}</p>
      <button onClick={openCashRegister}>Abrir Caixa</button>
      <button onClick={closeCashRegister}>Fechar Caixa</button>
      <div>
        <h3>Adicionar Entrada</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor"
        />
        <button onClick={addCashEntry}>Adicionar</button>
      </div>
      <div>
        <h3>Realizar Sangria</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor"
        />
        <button onClick={withdrawFromCash}>Sangria</button>
      </div>
    </div>
  );
};

export default CashRegister;
