import React, {useState} from "react";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";
import {
    addFile,
    checkIfManagerHasRestaurant,
    getAreasByRestaurantId, getOwnerRestaurants,
    removeFile,
    updateRestaurant
} from "../SettingsActions";
import {withRouter} from "react-router-dom";
import {useLoginState} from "../../auth/AuthContext";

const EditRestaurant = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const logInState = useLoginState();
    const {loggedUser} = logInState;
    const {restaurant, file} = settingsState;
    const [fromUrl, setLogoFrom] = useState(true)
    const initialValues: RestaurantSettingsFormValuesTypes = {
        id: restaurant.id,
        address: restaurant.address,
        logo: restaurant.logo,
        website: restaurant.website,
        twitter: restaurant.twitter,
        program: restaurant.program,
        postCode: restaurant.postCode,
        phone: restaurant.phone,
        name: restaurant.name,
        instagram: restaurant.instagram,
        facebook: restaurant.facebook,
        email: restaurant.email,
        description: restaurant.description,
        country: restaurant.country,
        province: restaurant.province,
        streetAndNumber: restaurant.streetAndNumber,
        city: restaurant.city
    }

    const onSubmit = (values: RestaurantSettingsFormValuesTypes) => {
        updateRestaurant({
            restaurantId: restaurant.id,
            changeLogo: !fromUrl,
            values: values,
            file: file,
            callBack: () => {
                checkIfManagerHasRestaurant({dispatch: dispatch,managerId:loggedUser.UserId})
            },
            dispatch: dispatch
        })
    }

    const addNewFile = (file: File) => {
        addFile({dispatch: dispatch, file: file})
    }

    const removeFileFunc = () => {
        removeFile({dispatch: dispatch})
        if (fromUrl) {
            setLogoFrom(!fromUrl)
        }
    }
    return <PageWrapper centerPage>
        <RestaurantFormSettings initialValues={initialValues}
                                onSubmit={(values) => {
                                    onSubmit(values)
                                }}
                                addNewFile={addNewFile} removeFile={removeFileFunc} file={file}
                                urlImage={initialValues.logo != undefined ? initialValues.logo.path : ""}
                                fromUrl={fromUrl}
                                cancel={() => {
                                    checkIfManagerHasRestaurant({dispatch: dispatch, managerId: loggedUser.UserId})
                                }}/>

    </PageWrapper>
}

export default withRouter(EditRestaurant)