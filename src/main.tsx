import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure App.tsx exists
import { Toaster } from 'sonner';
import 'flowbite/dist/flowbite.min.css';

const rootElement = document.getElementById('root');

// Add a type guard to ensure rootElement is not null
if (!rootElement) {
  throw new Error("Root element not found. Ensure there is an element with id 'root' in your HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);