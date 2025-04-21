import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Opportunities from './pages/Opportunities';
import EmailCampaigns from './pages/EmailCampaigns';
import WhatsApp from './pages/WhatsApp';
import Metrics from './pages/Metrics';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/email-campaigns" element={<EmailCampaigns />} />
          <Route path="/whatsapp" element={<WhatsApp />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;