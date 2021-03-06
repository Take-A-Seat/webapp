import React, {useEffect} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../../globals/GlobalStyles";
import {addFile, addRestaurant, checkIfManagerHasRestaurant, removeFile, setMark} from "../../SettingsActions";
import {useSettingsDispatch, useSettingsState} from "../../SettingsContext";
import {useLoginState} from "../../../auth/AuthContext";
import {LoaderComponent} from "../../../globals/Loading/Loader";


const CreateRestaurant = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {file, mark, loading} = settingsState;
    const accountState = useLoginState();
    const {loggedUser} = accountState
    let history = useHistory();

    const initialValues: RestaurantSettingsFormValuesTypes = {
        id: "",
        country: "",
        description: "",
        email: "",
        facebook: "",
        instagram: "",
        visibleOnline: true,
        name: "",
        phone: "",
        postCode: "",
        twitter: "",
        website: "",
        logo: "",
        streetAndNumber: "",
        province: "",
        city: "",
        lat: 0,
        lng: 0,
        program: [{
            day: 1,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 2,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 3,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 4,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 5,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 6,
            startAt: "",
            endAt: "",
            close: false,
        }, {
            day: 7,
            startAt: "",
            endAt: "",
            close: false,
        }]
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
        values.lat = mark.lat;
        values.lng = mark.lng;
        // console.log(values)

        addRestaurant({
            file: file, values: values, dispatch: dispatch, callBack: () => {
                checkIfManagerHasRestaurant({dispatch: dispatch, managerId: loggedUser.UserId})
                history.push("/");
            }
        })
    }
    console.log("loading", loading)
    return !loading ? <PageWrapper centerPage>
        <RestaurantFormSettings initialValues={initialValues}
                                onSubmit={(values) => {
                                    onsubmit(values as RestaurantSettingsFormValuesTypes)
                                }}
                                addNewFile={addNewFile} removeFile={removeFileFunc} file={file}/>

    </PageWrapper> : <LoaderComponent/>


}

export default withRouter(CreateRestaurant)