import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './components/home.jsx';
import Rules from './components/Rules';
import Donate from './components/Donate';
import Team from './components/Team';
import Blog from './components/blog.jsx';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
