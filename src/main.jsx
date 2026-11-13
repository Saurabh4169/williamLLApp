import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts via @fontsource (weights 600, 700, 800 for Plus Jakarta Sans, 400, 500, 600 for Inter)
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
