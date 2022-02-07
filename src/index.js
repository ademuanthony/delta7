import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
AOS.init();

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
     <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>
  </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
