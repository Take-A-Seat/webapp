import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginProvider} from "./components/auth/AuthContext";
import AppRouter from "./router/AppRouter";
import {RestaurantProvider} from "./components/restaurant/RestaurantContext";

function App() {
    return (
        <div className="App">
            <RestaurantProvider>
                <LoginProvider>
                    <AppRouter/>
                </LoginProvider>
            </RestaurantProvider>
        </div>
    );
}

export default App;
