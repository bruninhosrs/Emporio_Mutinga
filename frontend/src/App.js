import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Products from '../src/pages/Products';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> Redireciona para login */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
        } />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;