import React from "react";
import {withRouter} from "react-router-dom";
import {RestaurantFormSettings, RestaurantSettingsFormValuesTypes} from "../form/RestaurantSettingsForm";
import {PageWrapper} from "../../globals/GlobalStyles";

const CreateRestaurant = () => {
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
        website: ""
    }

    return <PageWrapper centerPage>
        <RestaurantFormSettings initialValues={initialValues} onSubmit={(values) => {
            console.log(values)
        }}/>

    </PageWrapper>
}

export default withRouter(CreateRestaurant)