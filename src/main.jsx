import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </HeroUIProvider>
  </React.StrictMode>,
)