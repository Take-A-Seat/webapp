import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginProvider} from "./components/auth/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
    return (
        <div className="App">
            <LoginProvider>
                <AppRouter/>
            </LoginProvider>
        </div>
    );
}

export default App;
