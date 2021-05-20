import React from "react";
import {useHistory, withRouter} from "react-router-dom";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";
import {addFile, addRestaurant, checkIfManagerHasRestaurant, removeFile} from "../SettingsActions";
import {useSettingsState,useSettingsDispatch} from "../SettingsContext";
import {useLoginState} from "../../auth/AuthContext";

const CreateRestaurant = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {file} = settingsState;
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
        city: ""
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
                checkIfManagerHasRestaurant({dispatch: dispatch, managerId: loggedUser.UserId})
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