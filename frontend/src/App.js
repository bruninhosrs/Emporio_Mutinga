import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import Products from '../src/pages/Products';
import AddProduct from '../src/components/AddProduct';
import EditProduct from '../src/components/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/products/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/products/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
