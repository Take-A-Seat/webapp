import React, {useEffect, useState} from "react"
import {createTokenProvider} from "./CreateTokenProvider";
import {API_URL} from "../constants/globalConstants";
import {Redirect} from "react-router-dom"

const createAuthProvider = () => {
    const tokenProvider = createTokenProvider();

    const login: typeof tokenProvider.setToken = (newToken) => {
        tokenProvider.setToken(newToken);
    };
    const logout = (callback: () => void) => {
        tokenProvider.setToken({token: '', expirationDate: '', refreshToken: ''});
        callback();
    };
    const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const token = await tokenProvider.getToken();
        if (!token) {
            logout(() => {
                return <Redirect to={"/auth/login"}/>
            })
        }
        input = `${API_URL}${input}`;
        init = init || {};
        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`
        };
        return await fetch(input, init);
    };
    const unauthenticatedFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        input = `${API_URL}${input}`;
        init = init || {};
        init.headers = {
            ...init.headers,
        };
        return fetch(input, init);
    }
    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        useEffect(() => {
            const listener = (newIsLogged: boolean) => {
                setIsLogged(newIsLogged);
            };
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);
        return [isLogged] as [typeof isLogged];
    };

    return {
        useAuth,
        authFetch,
        login,
        logout,
        unauthenticatedFetch
    }
};

export const {useAuth, authFetch, login, logout, unauthenticatedFetch} = createAuthProvider();