import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginProvider} from "./components/auth/AuthContext";
import AppRouter from "./router/AppRouter";
import {SettingsProvider} from "./components/settings/SettingsContext";

function App() {
    return (
        <div className="App">
            <SettingsProvider>
                <LoginProvider>
                    <AppRouter/>
                </LoginProvider>
            </SettingsProvider>
        </div>
    );
}

export default App;
