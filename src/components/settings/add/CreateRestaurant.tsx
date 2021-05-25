import React, {useEffect} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";
import {addFile, addRestaurant, checkIfManagerHasRestaurant, removeFile, setMark} from "../SettingsActions";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {useLoginState} from "../../auth/AuthContext";

const CreateRestaurant = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {file, mark} = settingsState;
    const accountState = useLoginState();
    const {loggedUser} = accountState
    let history = useHistory();

    const initialValues: RestaurantSettingsFormValuesTypes = {
        id: "",
        address: "",
        country: "",
        description: "",
        email: "",
        facebook: "",
        instagram: "",
        name: "",
        phone: "",
        postCode: "",
        program: "",
        twitter: "",
        website: "",
        logo: "",
        streetAndNumber: "",
        province: "",
        city: "",
        lat: 0,
        lng: 0
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
                setMark({dispatch: dispatch, mark: {lat: position.coords.latitude, lng: position.coords.longitude}})
            },
            function (error) {
                setMark({dispatch: dispatch, mark: {lat: 47.158455, lng: 27.601442}})
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        )
    }, [])

    const addNewFile = (file: File) => {
        addFile({dispatch: dispatch, file: file})
    }

    const removeFileFunc = () => {
        removeFile({dispatch: dispatch})
    }
    const onsubmit = (values: RestaurantSettingsFormValuesTypes) => {
        console.log(values)
        values.lat = mark.lat;
        values.lng = mark.lng;
        addRestaurant({
            file: file, values: values, dispatch: dispatch, callBack: () => {
                checkIfManagerHasRestaurant({dispatch: dispatch, managerId: loggedUser.UserId})
                history.push("/");
            }
        })
    }
    return <PageWrapper centerPage>
        <RestaurantFormSettings initialValues={initialValues}
                                onSubmit={(values) => {
                                    onsubmit(values as RestaurantSettingsFormValuesTypes)
                                }}
                                addNewFile={addNewFile} removeFile={removeFileFunc} file={file}/>

    </PageWrapper>
}

export default withRouter(CreateRestaurant)