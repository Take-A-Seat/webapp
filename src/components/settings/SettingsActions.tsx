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
                    dispatch({type: CHECK_MANAGER_RESTAURANT_FAIL, payload: JSON.parse(error)})
                })
            } else if (response.status === 404) {
                response.text().then(error => {
                    dispatch({type: CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT, payload: {error}})
                })
            }
        }
        return response.json()

    }).then(data => {
        if (data) {
            dispatch({type: CHECK_MANAGER_RESTAURANT_SUCCESS, payload: data})
        }
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
        if (key !== "logo" && key !=="program") {
            if (value) {
                data.append(key, value as string);
            }
        }
    });

    data.append('logo', file)
    data.append('program',JSON.stringify(values.program))


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


export const SAVE_MENU = "save_menu";
export const SAVE_MENU_SUCCESS = "save_menu_success";
export const SAVE_MENU_FAIL = "save_menu_fail";
export const saveMenu = ({
                             dispatch,
                             restaurantId,
                             values,
                             callBack,
                         }: { dispatch: Dispatch, restaurantId: string, values: any, callBack: () => void }) => {

    dispatch({type: SAVE_MENU, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/menu`, {
        method: "POST",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: SAVE_MENU_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: SAVE_MENU_SUCCESS, payload: data})
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
                                     file,
                                     changeLogo,
                                     callBack
                                 }: { dispatch: Dispatch, restaurantId: string, changeLogo: boolean, file: any, values: any, callBack: () => void }) => {
    dispatch({type: UPDATE_RESTAURANT, payload: {}})
    let data = new FormData();
    _.forOwn(values, (value, key) => {
        if (key !== "logo" && key !=="program") {
            if (value) {
                data.append(key, value as string);
            }
        }
    });

    data.append('logo', file)
    data.append('changeLogo', `${changeLogo}`)
    data.append('program',JSON.stringify(values.program))

    authFetch(`/restaurants/id/${restaurantId}`, {method: "PUT", body: data}).then(response => {
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

export const GET_TABLES_BY_AREA_ID = "get_table_by_area_id";
export const GET_TABLES_BY_AREA_ID_SUCCESS = "get_table_by_area_id_success";
export const GET_TABLES_BY_AREA_ID_FAIL = "get_table_by_area_id_fail";

export const getTablesByAreaId = ({
                                      dispatch,
                                      restaurantId,
                                      areaId
                                  }: { dispatch: Dispatch, restaurantId: string, areaId: string }) => {
    dispatch({type: GET_TABLES_BY_AREA_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/areas/${areaId}/tables`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_TABLES_BY_AREA_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_TABLES_BY_AREA_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}

export const CREATE_TABLE = "create_table";
export const CREATE_TABLE_SUCCESS = "create_table_success";
export const CREATE_TABLE_FAIL = "create_table_fail";

export const createTable = ({
                                dispatch,
                                restaurantId,
                                areaId,
                                values,
                                callBack,
                            }: { dispatch: Dispatch, restaurantId: string, areaId: string, values: any, callBack: () => void }) => {

    dispatch({type: CREATE_TABLE, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}/table`, {
        method: "POST",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: CREATE_TABLE_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: CREATE_TABLE_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("error", error)
    })
}


export const CREATE_NEW_AREA = "create_area";
export const CREATE_NEW_AREA_SUCCESS = "create_area_success";
export const CREATE_NEW_AREA_FAIL = "create_area_fail";
export const addArea = ({
                            dispatch,
                            values,
                            callBack
                        }: { dispatch: Dispatch, values: any, callBack?: () => void }) => {
    dispatch({type: CREATE_NEW_AREA, payload: {}})


    authFetch(`/restaurants/id/${values.restaurantId}/area`, {
        method: "POST",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: CREATE_NEW_AREA_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: CREATE_NEW_AREA_SUCCESS, payload: data})
            if (callBack) {
                callBack()
            }
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const UPDATE_AREA = "update_area";
export const UPDATE_AREA_SUCCESS = "update_area_success";
export const UPDATE_AREA_FAIL = "update_area_fail";

export const updateArea = ({
                               dispatch,
                               values,
                               callBack
                           }: { dispatch: Dispatch, values: any, callBack?: () => void }) => {
    dispatch({type: UPDATE_AREA, payload: {}})


    authFetch(`/restaurants/id/${values.restaurantId}/area/${values.id}`, {
        method: "PUT",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_AREA_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: UPDATE_AREA_SUCCESS, payload: data})
            if (callBack) {
                callBack()
            }
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const UPDATE_TABLE = "update_table";
export const UPDATE_TABLE_SUCCESS = "update_table_success";
export const UPDATE_TABLE_FAIL = "update_table_fail";

export const updateTable = ({
                                dispatch,
                                values,
                                restaurantId,
                                areaId,
                                tableId,
                                callBack
                            }: {
    dispatch: Dispatch,
    values: any,
    callBack?: () => void,
    restaurantId: string,
    areaId: string,
    tableId: string
}) => {
    dispatch({type: UPDATE_TABLE, payload: {}})
    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}/table/${tableId}`, {
        method: "PUT",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_TABLE_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: UPDATE_TABLE_SUCCESS, payload: data})
            if (callBack) {
                callBack()
            }
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const DELETE_AREA = "delete_area";
export const DELETE_AREA_SUCCESS = "delete_area_success";
export const DELETE_AREA_FAIL = "delete_area_fail";
export const deleteArea = ({
                               dispatch,
                               areaId,
                               restaurantId,
                               callBack
                           }: { dispatch: Dispatch, areaId: string, restaurantId: string, callBack?: () => void }) => {
    dispatch({type: DELETE_AREA, payload: {}})


    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}`, {
        method: "DELETE",
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: DELETE_AREA_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: DELETE_AREA_SUCCESS, payload: data})
            if (callBack) {
                callBack()
            }
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const DELETE_TABLE = "delete_table";
export const DELETE_TABLE_SUCCESS = "delete_table_success";
export const DELETE_TABLE_FAIL = "delete_table_fail";


export const deleteTable = ({
                                dispatch,
                                areaId,
                                restaurantId,
                                tableId,
                                callBack
                            }: { dispatch: Dispatch, areaId: string, restaurantId: string, callBack?: () => void, tableId: string }) => {
    dispatch({type: DELETE_TABLE, payload: {}})
    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}/table/${tableId}`, {
        method: "DELETE",
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: DELETE_TABLE_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: DELETE_TABLE_SUCCESS, payload: data})
            if (callBack) {
                callBack()
            }
        }
    }).catch(error => {
        console.log("error", error)
    })
}


export const GET_AREAS_BY_RESTAURANT_ID = "get_restaurant_by_restaurant_id";
export const GET_AREAS_BY_RESTAURANT_ID_SUCCESS = "get_restaurant_by_restaurant_id_success";
export const GET_AREAS_BY_RESTAURANT_ID_FAIL = "get_restaurant_by_restaurant_id_fail";

export const getAreasByRestaurantId = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_AREAS_BY_RESTAURANT_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/areas`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AREAS_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_AREAS_BY_RESTAURANT_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}


export const GET_MENU_BY_RESTAURANT_ID = "get_menu_by_restaurant_id";
export const GET_MENU_BY_RESTAURANT_ID_SUCCESS = "get_menu_by_restaurant_id_success";
export const GET_MENU_BY_RESTAURANT_ID_FAIL = "get_menu_by_restaurant_id_fail";


export const getMenuByRestaurantId = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_MENU_BY_RESTAURANT_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/menu`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_MENU_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_MENU_BY_RESTAURANT_ID_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const UPDATE_MENU = "update_menu";
export const UPDATE_MENU_SUCCESS = "update_menu_success";
export const UPDATE_MENU_FAIL = "update_menu_fail";


export const updateMenu = ({
                               dispatch,
                               restaurantId,
                               values,
                               callBack,
                           }: { dispatch: Dispatch, restaurantId: string, values: any, callBack: () => void }) => {
    dispatch({type: UPDATE_MENU, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/menu`, {method: "POST", body: JSON.stringify(values)}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_MENU_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: UPDATE_MENU_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("error", error)
    })
}

export const GET_AREA_BY_ID = "get_area_by_id";
export const GET_AREA_BY_ID_SUCCESS = "get_area_by_id_success";
export const GET_AREA_BY_ID_FAIL = "get_area_by_id_fail";

export const getAreaById = ({
                                dispatch,
                                areaId,
                                restaurantId
                            }: { dispatch: Dispatch, restaurantId: string, areaId: string }) => {
    dispatch({type: GET_AREA_BY_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AREA_BY_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_AREA_BY_ID_SUCCESS, payload: data})
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

export const SET_MARK = "set_mark";
export const setMark = ({dispatch, mark}: { dispatch: Dispatch, mark: any }) => {
    dispatch({type: SET_MARK, payload: mark})
}