import React, {useState} from "react";
import {useRestaurantDispatch, useRestaurantState} from "../RestaurantContext";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";
import {addFile, checkIfManagerHasRestaurant, removeFile, updateRestaurant} from "../RestaurantActions";
import {withRouter} from "react-router-dom";
import {useLoginState} from "../../auth/AuthContext";

const EditRestaurant = () => {
    const dispatch = useRestaurantDispatch();
    const restaurantState = useRestaurantState();
    const logInState = useLoginState();
    const {loggedUser} = logInState;
    const {restaurant, file} = restaurantState;
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
        console.log(values)
        updateRestaurant({
            restaurantId: restaurant.id,
            changeLogo: !fromUrl,
            values: values,
            file: file,
            callBack: () => {
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
                                    console.log(values)

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