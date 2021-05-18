import {Dispatch} from "../../constants/globalTypes";
import {authFetch} from "../../helpers/createAuthProvider";
import _ from "lodash";


export const CHECK_MANAGER_RESTAURANT = "check_manager_restaurant";
export const CHECK_MANAGER_RESTAURANT_SUCCESS = "check_manager_restaurant_success";
export const CHECK_MANAGER_RESTAURANT_FAIL = "check_manager_restaurant_fail";
export const CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT = "check_manager_restaurant_fail_should_create_restaurant";

export const checkIfManagerHasRestaurant = ({dispatch, managerId}: { dispatch: Dispatch, managerId: string }) => {
    dispatch({type: CHECK_MANAGER_RESTAURANT, payload: {}});
    authFetch(`/restaurants/managerId/${managerId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                response.text().then(error => {
                    return dispatch({type: CHECK_MANAGER_RESTAURANT_FAIL, payload: JSON.parse(error)})
                })
            } else if (response.status === 404) {
                response.text().then(error => {
                    return dispatch({type: CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT, payload: {error}})
                })
            } else {
                return response.json()
            }
        }
    }).then(data => {
        return dispatch({type: CHECK_MANAGER_RESTAURANT_SUCCESS, payload: data})
    }).catch(error => {
        console.log(error)
    })
}


export const GET_RESTAURANTS = "get_restaurants";
export const GET_RESTAURANTS_SUCCESS = "get_restaurants_success";
export const GET_RESTAURANTS_FAIL = "get_restaurants_fail";
export const getOwnerRestaurants = ({dispatch}: { dispatch: Dispatch }) => {
    dispatch({
        type: GET_RESTAURANTS,
        payload: []
    });

    authFetch(`/restaurants/owned`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESTAURANTS_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_RESTAURANTS_SUCCESS, payload: data})
    }).catch(error => {
        console.log("err", error)
    })
}

export const ADD_RESTAURANT = "add_restaurant";
export const ADD_RESTAURANT_SUCCESS = "add_restaurant_success";
export const ADD_RESTAURANT_FAIL = "add_restaurant_fail";
export const addRestaurant = ({
                                  dispatch,
                                  values,
                                  file,
                                  callBack
                              }: { dispatch: Dispatch, values: any, callBack?: () => void, file: File }) => {
    dispatch({type: ADD_RESTAURANT, payload: {}})

    let data = new FormData();

    _.forOwn(values, (value, key) => {
        if (key !== "logo") {
            if (value) {
                data.append(key, value as string);
            }
        }
    });

    data.append('logo', file)

    authFetch("/restaurants/", {method: "POST", body: data}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: ADD_RESTAURANT_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: ADD_RESTAURANT_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("error", error)
    })
}


export const UPDATE_RESTAURANT = "update_restaurant";
export const UPDATE_RESTAURANT_SUCCESS = "update_restaurant_success";
export const UPDATE_RESTAURANT_FAIL = "update_restaurant_fail";
export const updateRestaurant = ({
                                     dispatch,
                                     restaurantId,
                                     values,
                                     callBack
                                 }: { dispatch: Dispatch, restaurantId: string, values: any, callBack: () => void }) => {
    dispatch({type: UPDATE_RESTAURANT, payload: {}})
    authFetch(`/restaurants/id/${restaurantId}`, {method: "PUT", body: JSON.stringify(values)}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_RESTAURANT_FAIL, payload: JSON.parse(error)})
            })
        }

        return response.json()
    }).then(data => {
        dispatch({type: UPDATE_RESTAURANT_SUCCESS, payload: data})
        callBack()
    }).catch(error => {
        console.log(error)
    })
}

export const GET_RESTAURANT_BY_ID = "get_restaurant_by_id";
export const GET_RESTAURANT_BY_ID_SUCCESS = "get_restaurant_by_id_success";
export const GET_RESTAURANT_BY_ID_FAIL = "get_restaurant_by_id_fail";
export const getRestaurantById = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_RESTAURANT_BY_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESTAURANT_BY_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}

export const ADD_FILE = 'add_file';
export const addFile = ({dispatch, file}: { dispatch: Dispatch, file: File }) => {
    dispatch({type: ADD_FILE, payload: file})
}

export const REMOVE_FILE = "remove_file";
export const removeFile = ({dispatch}: { dispatch: Dispatch, }) => {
    dispatch({type: REMOVE_FILE, payload: {}})
}