// src/main.tsx or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './app/store'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='997785840858-98tge9f5fb548ukv3sh2mb646dpq594b.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

     