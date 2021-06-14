import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useSettingsDispatch, useSettingsState} from "../../settings/SettingsContext";
import {getStatisticsByRestaurantId} from "../../settings/SettingsActions";
import {ChartFull} from "../ChartFull";
import {ChartOneValue} from "../ChartOneValue";
import {ColumnContainer} from "../../globals/formComponents/style";
import {RowContainer} from "../../reservations/view/style";
import {TextLegend} from "../style";

const ViewDashBoard = () => {
    const dispatch = useSettingsDispatch();
    const {statistics, restaurant} = useSettingsState();

    useEffect(() => {
        if (restaurant.id != undefined)
            getStatisticsByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
    }, [restaurant])
    console.log(statistics)


    return <>
        <ColumnContainer>
            <RowContainer withWrap spaceAround customMarginTop={"15px"}>
                <ColumnContainer>
                    <ChartFull data={statistics.persons}/>
                    <TextLegend>Persons</TextLegend>
                </ColumnContainer>
                <ColumnContainer>
                    <ChartOneValue data={statistics.numberPeopleReturned}/>
                    <TextLegend>Persons returned</TextLegend>
                </ColumnContainer>
            </RowContainer>

            <RowContainer withWrap spaceAround  customMarginTop={"15px"}>
                <ColumnContainer>
                    <ChartFull data={statistics.totalPay}/>
                    <TextLegend>Reservations payment</TextLegend>

                </ColumnContainer>
                <ColumnContainer>
                    <ChartOneValue data={statistics.totalMoneyReceived}/>
                    <TextLegend>Total pay</TextLegend>

                </ColumnContainer>
            </RowContainer>

            <RowContainer withWrap spaceAround  customMarginTop={"15px"}>
                <ColumnContainer>
                    <ChartOneValue data={statistics.declined}/>
                    <TextLegend>Reservations declined</TextLegend>

                </ColumnContainer>

                <ColumnContainer>
                    <ChartOneValue data={statistics.finished}/>
                    <TextLegend>Reservations finished</TextLegend>

                </ColumnContainer>
            </RowContainer>
        </ColumnContainer>
    </>

}

export default withRouter(ViewDashBoard);