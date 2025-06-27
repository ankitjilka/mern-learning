import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {Toaster} from "react-hot-toast";
import { NotesProvider } from "./context/NotesContext";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <NotesProvider>
      <App />
      </NotesProvider>
      <Toaster />
    </BrowserRouter>

)
