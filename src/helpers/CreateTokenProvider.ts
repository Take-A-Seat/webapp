import moment from 'moment';
import {API_URL} from "../constants/globalConstants";

const createTokenProvider = () => {
    let _token: {
        token: string,
        expirationDate: string,
        refreshToken: string
    } = {
        token: '',
        expirationDate: '',
        refreshToken: ''
    };
    const authObject = JSON.parse(<string>localStorage.getItem('authTakeASeat'));
    if (authObject) {
        _token = authObject;
    }
    let observers: Array<(isLogged: boolean) => void> = [];

    const isExpired = (expirationDate: moment.Moment) => {
        if (!expirationDate) {
            return false;
        }

        const expireOn = moment(expirationDate).format('YYYY-MM-DD HH:mm:ss');
        const difference = moment().diff(expireOn, 'seconds');

        return difference >= -600;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }

        if (isExpired(moment(_token.expirationDate.split("UTC")[0]))) {
            const updateToken = await fetch(`${API_URL}/auth/refresh_token`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${_token.token}`,
                },
                body: JSON.stringify({
                    refresh_token: _token.refreshToken
                })
            })
                .then(response => {
                    if (!response.ok) {
                        return null;
                    }
                    return response.json();
                });
            let tokenObject = {
                token: '',
                expirationDate: '',
                refreshToken: ''
            };
            if (updateToken) {
                tokenObject = {
                    token: updateToken.auth_token,
                    expirationDate: updateToken.expire,
                    refreshToken: updateToken.refresh_token
                };
            }
            setToken(tokenObject);
        }
        return _token && _token.token;
    };
    const isLoggedIn = () => {
        return !!_token.token;
    };
    const subscribe = (observer: (isLogged: boolean) => void) => {
        observers.push(observer);
    };
    const unsubscribe = (observer: (isLogged: boolean) => void) => {
        observers = observers.filter(_observer => _observer !== observer);
    };
    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };
    const setToken = (token: typeof _token) => {
        if (token.token) {
            localStorage.setItem('authTakeASeat', JSON.stringify((token)));
        } else {
            localStorage.removeItem('authTakeASeat');
        }
        _token = token;
        notify();
    };
    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe
    }
};

export {createTokenProvider}
