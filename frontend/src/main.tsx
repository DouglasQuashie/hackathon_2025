import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import ChatPage from './ChatPage.tsx';
import Home from './homePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:zone" element={<ChatPage />} />
        <Route path="/homePage" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
