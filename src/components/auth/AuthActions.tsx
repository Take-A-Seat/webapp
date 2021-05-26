import {Dispatch} from "../../constants/globalTypes";
import {History} from 'history'
import {authFetch, login, logout, unauthenticatedFetch} from "../../helpers/createAuthProvider";

export const LOG_IN = 'log_in';
export const LOG_IN_SUCCESS = 'log_in_success';
export const LOG_IN_FAIL = 'log_in_fail';

interface InviteProps {
    isInvite: boolean,
    inviteId: string,
    userId: string
}

interface LoginProps {
    dispatch: Dispatch,
    values: {
        email: string,
        password: string
    },
    history: History,
    invite: InviteProps
}

export const logInAction = (
    {
        dispatch,
        values,
        history,
        invite
    }: LoginProps) => {
    dispatch({type: LOG_IN, payload: {}});

    let formData = new FormData();
    for (let key in values) {
        // @ts-ignore
        formData.append(key, values[key]);
    }
    unauthenticatedFetch('/auth/login', {
        method: "POST",
        body: formData,
    })
        .then((response: { ok: any; json: () => any; text: () => Promise<any>; }) => {
            if (response.ok) {
                return response.json()
            }
            return response.text().then(error => {
                dispatch({
                    type: LOG_IN_FAIL,
                    payload: {
                        message: "*Incorrect email or password",
                    }
                })
            })
        })
        .then((data: { auth_token: any; expire: any; refresh_token: any; }) => {
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: data
            });
            let authObject = {
                token: data.auth_token,
                expirationDate: data.expire,
                refreshToken: data.refresh_token
            };
            localStorage.setItem("email", values.email);
            localStorage.setItem("path", "home");

            login(authObject);

            history.push("/dashboard");

        })
        .catch((error: any) => {
            console.error("Error:", error);
            dispatch({
                type: LOG_IN_FAIL,
                payload: error
            });
        });
};

interface registerProps {
    dispatch: Dispatch,
    values: any,
    history: History,
    isInvite: boolean,
    inviteId: string
}

export const REGISTER_ACCOUNT = 'register_account';
export const REGISTER_ACCOUNT_SUCCESS = 'register_account_success';
export const REGISTER_ACCOUNT_FAIL = 'register_account_fail';
export const registerAction = ({
                                   dispatch,
                                   values,
                                   history,
                                   isInvite,
                                   inviteId
                               }: registerProps) => {
    dispatch({type: REGISTER_ACCOUNT, payload: {}});
    // @ts-ignore
    unauthenticatedFetch('/users/', {
        method: 'POST',
        body: JSON.stringify(values)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                response.text().then(error => {
                    dispatch({
                        type: REGISTER_ACCOUNT_FAIL,
                        payload: error
                    });
                });
                throw new Error("")
            }
        })
        .then(data => {
            dispatch({
                type: REGISTER_ACCOUNT_SUCCESS,
                payload: data
            });
            if (isInvite) {
                history.push(`/auth/login?inviteId=${inviteId}&userId=${data.userId}`);
            } else {
                history.push('/auth/login');
            }
        })
        .catch(error => {
            console.log(error)
        })
};

export const LOGOUT = 'logout';
export const logoutAction = ({dispatch, history}: { dispatch: Dispatch, history: History }) => {
    dispatch({type: LOGOUT, payload: {}});
    logout(() => {
        history.push('/auth/login');
    });

};

export const GET_LOGGED_USER = "get_logged_user";
export const GET_LOGGED_USER_SUCCESS = "get_logged_user_success";
export const GET_LOGGED_USER_FAIL = "get_logged_user_fail";

export const getLoggedUser = ({dispatch}: { dispatch: Dispatch }) => {
    dispatch({type: GET_LOGGED_USER, payload: {}})
    authFetch("/auth/isAuthenticated", {method: "GET"})
        .then(response => {
            if (!response.ok) {
                return response.text().then(error => {
                    dispatch({payload: JSON.parse(error), type: GET_LOGGED_USER_FAIL})
                })
            }
            return response.json()
        }).then(data => {
        return dispatch({type: GET_LOGGED_USER_SUCCESS, payload: data})
    }).catch(error => {
        console.log(error)
    })
}


