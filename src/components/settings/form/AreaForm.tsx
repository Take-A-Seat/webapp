import {Field, Formik} from "formik";
import React from "react";
import {FormWrapper} from "../../globals/formComponents/style";
import TextField from "../../globals/formComponents/TextField";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";

export type AreaFormValuesTypes = {
    id: string;
    name: string;
    displayName: string;
    priority: number;
    restaurantId: string;
    onlineCapacity: number;
}

type AreaFormProps = {
    initialValues: AreaFormValuesTypes;
    onSubmit: (values: AreaFormValuesTypes) => void;
    cancel?: () => void;
    withDisplayName: boolean;
}

export const AreaForm = ({initialValues, onSubmit, cancel, withDisplayName}: AreaFormProps) => {
    return (
        <Formik enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values: AreaFormValuesTypes) => {
            onSubmit(values)
        }}>{({values, handleSubmit}) => {

            return <FormWrapper onSubmit={handleSubmit}>
                <Field name={"name"} type={"text"} component={TextField} labelText={"Area name"} customWidth={"100%"}/>
                {withDisplayName &&
                <Field name={"displayName"} type={"text"} component={TextField} labelText={"Display name"}
                       customWidth={"100%"}/>}
                <Wrapper>
                    {cancel && <Button
                        previewButton
                        onClick={() => {
                            cancel()
                        }} cancelButton>
                        <MaterialIcon iconName={"cancel"}/>
                        Cancel
                    </Button>}
                    <Button previewButton onClick={() => onSubmit(values)} blueButton>
                        <MaterialIcon iconName={"save"}/>
                        Save</Button>
                </Wrapper>
            </FormWrapper>
        }}

        </Formik>)
}