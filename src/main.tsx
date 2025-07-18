import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcessoRapido from './AcessoRapido.tsx';
import { setTotemMode, isTotemMode } from './totemMode';
import './index.css';

// Configurar modo totem se detectado
if (isTotemMode()) {
  setTotemMode();
}

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado com sucesso:', registration);
      })
      .catch((registrationError) => {
        console.log('Falha no registro do SW:', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AcessoRapido />} />
        <Route path="/acesso-rapido" element={<AcessoRapido />} />
        <Route path="*" element={<AcessoRapido />} />
      </Routes>
    </Router>
  </React.StrictMode>,
); 