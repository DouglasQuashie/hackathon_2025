import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App.tsx'

import './index.css'
import EventForm from './components/EventForm.tsx';
import { onEventCreated } from './services/Event.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/event" element={<EventForm onEventCreated={onEventCreated} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
