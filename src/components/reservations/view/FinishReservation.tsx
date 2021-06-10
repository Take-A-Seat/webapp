import {Formik} from "formik";
import React from "react";
import {FormWrapper} from "../../globals/formComponents/style";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import {ArrivedText} from "./style";

type FinishReservationProps = {
    initialValues: any;
    onSubmit: (values: any) => void;
    cancel: () => void;
}

export const FinishReservation = ({onSubmit, initialValues, cancel}: FinishReservationProps) => {
    return (<Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => onSubmit(values)}>
        {
            ({values, handleSubmit}) => {
                return <FormWrapper
                    onSubmit={handleSubmit}>
                    <ArrivedText>Confirm finish reservation!</ArrivedText>
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