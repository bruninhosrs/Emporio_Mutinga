import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from '../src/pages/Login';
import Home from './pages/Home';
import Dashboard from '../src/pages/Dashboard';

// Usuário
import User from './pages/User';
import AddUser from '../src/components/AddUser';
import EditUser from '../src/components/EditUser';

// Produto
import ProductList from '../src/pages/ProductList';
import AddProduct from '../src/components/AddProduct';
import EditProduct from '../src/components/EditProduct';

// Pedido
import Orders from './pages/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';

// Cliente
import Clients from './pages/Clients';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';

// Fornecedor
import Suppliers from './pages/Suppliers';
import AddSupplier from './components/AddSupplier';
import EditSupplier from './components/EditSupplier';

// Caixa
import CashRegisterInterface from './components/CashRegisterInterface';

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!token || token === 'undefined' || token === null) {
          
          navigate('/login');
      } else {
      
          navigate('/home');
      }
  }, [navigate]);

  return null;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/caixa" element={<PrivateRoute><CashRegisterInterface /></PrivateRoute>} />

        {/* PRODUTO */}
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />

        {/* PEDIDO */}
        <Route path='/orders' element= {<PrivateRoute><Orders /></PrivateRoute>}/>
        <Route path="/add-order" element={<PrivateRoute><AddOrder /></PrivateRoute>} />
        <Route path="/edit-order/:id" element={<PrivateRoute><EditOrder /></PrivateRoute>} />

        {/* CLIENTE */}
        <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>}/>
        <Route path="/add-client" element={<PrivateRoute><AddClient /></PrivateRoute>}/>
        <Route path="/edit-client/:id" element={<PrivateRoute><EditClient /></PrivateRoute>}/>

        {/* FORNECEDOR */}
        <Route path="/suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>}/>
        <Route path="/add-supplier" element={<PrivateRoute><AddSupplier /></PrivateRoute>}/>
        <Route path="/edit-supplier/:id" element={<PrivateRoute><EditSupplier /></PrivateRoute>}/>

        {/* USUARIO */}
        <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>}/>
        <Route path="/users/add" element={<PrivateRoute><AddUser /></PrivateRoute>}/>
        <Route path="/users/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>}/>

      </Routes>
    </Router>
  );
}

export default App;
