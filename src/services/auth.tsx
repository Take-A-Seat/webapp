const isAuthenticated = () => {
    const authObject = JSON.parse(localStorage.getItem('authTakeASeat') as string);
    return !!authObject;
};

//authObject

const setLocalStorage = (token: string, date: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expireDate", date);
};

export {isAuthenticated, setLocalStorage};
