import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  //Removing StrictMode to prevent double API calls during development
  //<StrictMode>
    <App />
    //</StrictMode
) 
