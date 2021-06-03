import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {PageWrapper} from "../../../globals/GlobalStyles";
import {useSettingsDispatch, useSettingsState} from "../../SettingsContext";
import {getMenuByRestaurantId, saveMenu} from "../../SettingsActions";
import {MenuFieldsValues, MenuForm} from "../form/MenuForm";
import _ from "lodash";
import {LoaderComponent} from "../../../globals/Loading/Loader";


const MenuView = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {restaurant, menu, loading} = settingsState;

    useEffect(() => {
        if (restaurant.id != undefined) {
            getMenuByRestaurantId({restaurantId: restaurant.id, dispatch: dispatch})
        }
    }, [restaurant])


    const onSubmit = (values: MenuFieldsValues) => {
        saveMenu({
            dispatch: dispatch, values: values, restaurantId: restaurant.id, callBack: () => {
                getMenuByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
            }
        })
    }

    const initialValues = {
        restaurantId: restaurant.id,
        pages: [
            {
                sections: [{
                    titleSection: "", products: [{
                        name: "",
                        ingredients: "",
                        price: 0
                    }]
                }],

                number: 1,
            }]
    }
    return !loading ? <PageWrapper noPadding centerPage>
        <MenuForm initialValues={menu != {} && !_.isEmpty(menu) ? menu : initialValues}
                  onSubmit={(values) => {
                      onSubmit(values)
                  }}/>
    </PageWrapper> : <LoaderComponent/>
}

export default withRouter(MenuView)