import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import Products from '../src/pages/Products';
import AddProduct from '../src/components/AddProduct';
import EditProduct from '../src/components/EditProduct';
import Orders from './pages/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';
import Clients from './pages/Clients';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import Suppliers from './pages/Suppliers';
import AddSupplier from './components/AddSupplier';
import EditSupplier from './components/EditSupplier';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/products/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/products/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path='/orders' element= {<PrivateRoute><Orders /></PrivateRoute>}/>
        <Route path="/orders/add" element={<PrivateRoute><AddOrder /></PrivateRoute>} />
        <Route path="/orders/edit/:id" element={<PrivateRoute><EditOrder /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>}/>
        <Route path="/clients/add" element={<PrivateRoute><AddClient /></PrivateRoute>}/>
        <Route path="/clients/edit/:id" element={<PrivateRoute><EditClient /></PrivateRoute>}/>
        <Route path="/suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>}/>
        <Route path="/suppliers/add" element={<PrivateRoute><AddSupplier /></PrivateRoute>}/>
        <Route path="/suppliers/edit/:id" element={<PrivateRoute><EditSupplier /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
