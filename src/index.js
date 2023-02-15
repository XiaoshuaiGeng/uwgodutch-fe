import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import SignupLayout from "./pages/signup";
import LoginLayout from "./pages/login";

import MainLayer from "./pages/Mainlayer"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginLayout/>}/>
                <Route path="signup" element={<SignupLayout/>}/>
                <Route path="userLayout" element={<MainLayer/>}/>

            </Routes>
        </BrowserRouter>
    );
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
reportWebVitals();
