import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from 'stores/Store';
import Home from 'routes/Home';
import Login from 'routes/Auth/Login';
import Register from 'routes/Auth/Register';
import Layout from 'components/Layout';

function App() {
  return (
    <Store>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </Store>
  );
}

export default App;
