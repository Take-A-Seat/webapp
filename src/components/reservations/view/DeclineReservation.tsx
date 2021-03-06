import {Field, Formik} from "formik";
import React, {useCallback, useState} from "react";
import {FormWrapper} from "../../globals/formComponents/style";
import TextField from "../../globals/formComponents/TextField";
import {AreaWithTables, useReservationsState} from "../ReservationsContext";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import * as Yup from "yup";

type DeclineReservationProps = {
    initialValues: any;
    onSubmit: (values: any) => void;
    cancel: () => void;
}

export const DeclineReservation = ({onSubmit, initialValues, cancel}: DeclineReservationProps) => {
    return (<Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => onSubmit(values)}>
        {
            ({values, handleSubmit}) => {
                return <FormWrapper
                    onSubmit={handleSubmit}>
                    <Field name={"messageToClient"} column={true} textArea={true} customMaxWidth={"100%"}
                           customWidthInput={"100%"} alignRight
                           customHeight={"100px"} component={TextField} labelText={"Message"}/>
                    <Wrapper>
                        {cancel && <Button
                            onClick={() => {
                                cancel()
                            }} cancelButton>
                            <MaterialIcon iconName={"cancel"}/>
                            Cancel
                        </Button>}
                        <Button
                            alignedLeft
                            onClick={() => {
                                onSubmit(values)
                            }}
                            blueButton>
                            <MaterialIcon iconName={"save"}/>Decline reservation</Button>

                    </Wrapper>
                </FormWrapper>
            }
        }
    </Formik>)
}