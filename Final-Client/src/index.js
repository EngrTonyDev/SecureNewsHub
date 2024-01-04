import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  localStorage.setItem('token', token);
  window.location.href = `http://localhost:3000/`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

