import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TourApp from './TourApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TourApp />
  </StrictMode>,
);
