import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ResultsBenefitsApp from './ResultsBenefitsApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResultsBenefitsApp />
  </StrictMode>,
);
