import React from "react";
import {useHistory, withRouter} from "react-router-dom";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";
import {addFile, addRestaurant, checkIfManagerHasRestaurant, removeFile} from "../RestaurantActions";
import {useRestaurantDispatch, useRestaurantState} from "../RestaurantContext";
import {useLoginState} from "../../auth/AuthContext";

const CreateRestaurant = () => {
    const dispatch = useRestaurantDispatch();
    const restaurantState = useRestaurantState();
    const {file} = restaurantState;
    const accountState = useLoginState();
    const {loggedUser}=accountState
    let history = useHistory();

    const initialValues: RestaurantSettingsFormValuesTypes = {
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
        logo:""
    }

    const addNewFile = (file: File) => {
        addFile({dispatch: dispatch, file: file})
    }

    const removeFileFunc = () => {
        removeFile({dispatch: dispatch})
    }
    const onsubmit = (values: RestaurantSettingsFormValuesTypes) => {
        addRestaurant({
            file: file, values: values, dispatch: dispatch, callBack: () => {
                checkIfManagerHasRestaurant({dispatch:dispatch,managerId:loggedUser.UserId})
                history.push("/");
            }
        })
    }
    return <PageWrapper centerPage>
        <RestaurantFormSettings initialValues={initialValues}
                                onSubmit={(values) => {
                                    console.log(values)
                                    onsubmit(values as RestaurantSettingsFormValuesTypes)
                                }}
                                addNewFile={addNewFile} removeFile={removeFileFunc} file={file}/>

    </PageWrapper>
}

export default withRouter(CreateRestaurant)