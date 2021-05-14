import {Dispatch} from "../../constants/globalTypes";
import {authFetch} from "../../helpers/createAuthProvider";


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