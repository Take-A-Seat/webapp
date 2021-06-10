import {Field, Formik} from "formik";
import React from "react";
import DatePickerField from "../../globals/formComponents/DatePickerField";
import { FormWrapper } from "../../globals/formComponents/style";
import {HeaderWrapper} from "../../globals/header/style";
import {SectionTableSettings} from "./style";
import SelectorField from "../../globals/formComponents/SelectorField";

type HeaderReservationProps = {
    date: any;
    setDate: (value: any) => void;
    filter: any;
    setFilter: (value: any) => void;
    initialValues : any;
}

let listFilter: { label: string, value: string }[] = [
    {value: "All", label: "All"},
    {label: "Pending", value: "Pending"},
    {value: "Wait Client", label: "Wait Client"},
    {value: "Active", label: "Active"},
    {value: "Finished", label: "Finished"},
    {value: "Declined", label: "Declined"},
]


const HeaderReservations = ({date, setDate, filter, setFilter,initialValues}: HeaderReservationProps) => {
    return <HeaderWrapper area>
        <SectionTableSettings reservations>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values: any) => {

                }}
            >
                {
                    ({values, handleSubmit, errors, touched}) =>
            <FormWrapper inRow customPadding={"0"}>
                <Field
                    name={"date"}
                    component={DatePickerField}
                    specificFormat
                    customMarginRight={"0"}
                    labelText={"Date"}
                    noBorder
                    withoutMarginBottom={true}
                    customPadding={"0"}
                    customWidth={"auto"}
                    onChangeExtra={(value: any) => {
                        console.log(value)
                        setDate(value)
                    }}
                />

                <Field name={"filter"}
                       component={SelectorField}
                       noBorder
                       customPadding={"0"}
                       withoutMarginBottom={true}
                       customWidth={"auto"}
                       options={listFilter}
                       onChange={(value:any)=>setFilter(value.label)}
                       selectedValue={values.filter}
                />
            </FormWrapper>}
            </Formik>
        </SectionTableSettings>
    </HeaderWrapper>
}

export default HeaderReservations