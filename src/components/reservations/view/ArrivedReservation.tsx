import {Formik} from "formik";
import React from "react";
import {FormWrapper} from "../../globals/formComponents/style";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import {ArrivedText} from "./style";

type ArrivedReservationProps = {
    initialValues: any;
    onSubmit: (values: any) => void;
    cancel: () => void;
}

export const ArrivedReservation = ({onSubmit, initialValues, cancel}: ArrivedReservationProps) => {
    return (<Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => onSubmit(values)}>
        {
            ({values, handleSubmit}) => {
                return <FormWrapper
                    onSubmit={handleSubmit}>
                    <ArrivedText>Mr/Ms {values.firstName} {values.lastName} arrived?</ArrivedText>
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
                            <MaterialIcon iconName={"save"}/>Confirm</Button>

                    </Wrapper>
                </FormWrapper>
            }
        }
    </Formik>)
}