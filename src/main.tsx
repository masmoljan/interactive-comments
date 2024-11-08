import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
