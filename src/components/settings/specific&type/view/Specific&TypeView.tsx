import React, {useEffect} from "react";
import {SpecificRestaurant, TypeRestaurant, useSettingsDispatch, useSettingsState} from "../../SettingsContext";
import {
    getAllSpecifics,
    getAllSpecificsByRestaurantId,
    getAllTypesByRestaurantId,
    getAllTypesRestaurant,
    updateSpecificRestaurant,
    updateTypeRestaurant
} from "../../SettingsActions";
import {SpecificTypeForm} from "../form/Specific&TypeForm";
import _ from "lodash";
import {PageWrapper} from "../../../globals/GlobalStyles";

const SpecificAndTypeView = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {fetchListTypes, fetchListSpecifics, listSpecifics, listTypes, restaurant} = settingsState;

    useEffect(() => {
        if (restaurant.id != undefined) {
            getAllSpecifics({dispatch: dispatch});
            getAllTypesRestaurant({dispatch: dispatch});
            getAllSpecificsByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id});
            getAllTypesByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
        }
    }, [restaurant])


    const initialValues: { specific: string[], types: string[] } = {
        specific: [],
        types: [],
    }
    fetchListSpecifics && !_.isEmpty(fetchListSpecifics) && fetchListSpecifics.map((item: SpecificRestaurant) => {
        initialValues.specific.push(item.specificRestaurantId)
    })

    fetchListTypes && !_.isEmpty(fetchListTypes) && fetchListTypes.map((item: TypeRestaurant) => {
        initialValues.types.push(item.typeRestaurantId)
    })

    const optionSpecific: { value: string, label: string }[] = [];
    const optionType: { value: string, label: string }[] = [];

    listTypes && !_.isEmpty(listTypes) && listTypes.map((item: any) => {
        optionType.push({value: item.id, label: item.name})
    })
    listSpecifics && !_.isEmpty(listSpecifics) && listSpecifics.map((item: any) => {
        optionSpecific.push({value: item.id, label: item.name})
    })

    const onSubmit = (values: any) => {
        console.log(values)
        updateSpecificRestaurant({
            dispatch: dispatch, restaurantId: restaurant.id, values: values.specific, callBack: () => {
                getAllSpecificsByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id});
            }
        })

        updateTypeRestaurant({
            dispatch: dispatch, restaurantId: restaurant.id, values: values.types, callBack: () => {
                getAllTypesByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
            }
        })
    }

    return <PageWrapper noPadding centerPage>
        <SpecificTypeForm onSubmit={(values) => onSubmit(values)}
                          initialValues={initialValues}
                          cancel={() => {
                              getAllSpecificsByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id});
                              getAllTypesByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
                          }}
                          optionsSpecific={optionSpecific}
                          optionsTypes={optionType}
        />
    </PageWrapper>
}

export default SpecificAndTypeView