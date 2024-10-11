import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [methodsReport, setMethodsReport] = useState({
    totalCashSales: '0.00',
    totalPixSales: '0.00',
    totalDebitSales: '0.00',
    totalCreditSales: '0.00',
    totalVoucherSales: '0.00'
  });

  const fetchPaymentMethodsReport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cashRegisters/sales/1'); // ajuste a URL conforme necessário
      setMethodsReport(response.data);
    } catch (error) {
      console.error('Erro ao buscar o relatório de métodos de pagamento:', error);
    }
  };

  useEffect(() => {
    fetchPaymentMethodsReport();
  }, []);

  return (
    <div>
      <h1>Relatórios de Vendas</h1>
      <table>
        <thead>
          <tr>
            <th>Método de Pagamento</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dinheiro</td>
            <td>R$ {methodsReport.totalCashSales}</td>
          </tr>
          <tr>
            <td>PIX</td>
            <td>R$ {methodsReport.totalPixSales}</td>
          </tr>
          <tr>
            <td>Débito</td>
            <td>R$ {methodsReport.totalDebitSales}</td>
          </tr>
          <tr>
            <td>Crédito</td>
            <td>R$ {methodsReport.totalCreditSales}</td>
          </tr>
          <tr>
            <td>Voucher</td>
            <td>R$ {methodsReport.totalVoucherSales}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
