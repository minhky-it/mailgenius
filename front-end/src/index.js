import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { MessageProvider } from './context/MessageContext.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MessageProvider>
    <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </AuthContextProvider>
  </MessageProvider>
);
