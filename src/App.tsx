import React from 'react';
import './App.css';
import {LoginProvider} from "./components/auth/AuthContext";
import AppRouter from "./router/AppRouter";
import {SettingsProvider} from "./components/settings/SettingsContext";
import {ToastProvider} from 'react-toast-notifications';

function App() {
    return (
        <div className="App">
            <ToastProvider placement={"bottom-right"} autoDismiss={true} autoDismissTimeout={3000}>
                <SettingsProvider>
                    <LoginProvider>
                        <AppRouter/>
                    </LoginProvider>
                </SettingsProvider>
            </ToastProvider>
        </div>
    );
}

export default App;
