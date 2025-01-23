import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App.tsx'
import Chat from './components/Chat.tsx';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:zone" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
