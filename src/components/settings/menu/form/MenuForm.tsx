import {FieldArray, Formik} from "formik";
import React from "react";
import {PagesFieldArray, PagesFieldsValuesTypes} from "./PagesFieldArray";
import {FormWrapper} from "../../../globals/formComponents/style";

export type MenuFieldsValues = {
    id: string;
    restaurantId: string;
    pages: PagesFieldsValuesTypes[]
}

type MenuFormProps = {
    initialValues: MenuFieldsValues;
    onSubmit: (values: MenuFieldsValues) => void;
    cancel?: () => void;
}

export const MenuForm = ({initialValues, onSubmit, cancel}: MenuFormProps) => {

    return (<Formik enableReinitialize={true} initialValues={initialValues}
                    onSubmit={(values: MenuFieldsValues) => onSubmit(values)}>
            {
                ({values, handleSubmit}) => {
                    return <FormWrapper onSubmit={handleSubmit} center>
                        <FieldArray name={"pages"}>
                            {
                                fieldArrayProps => (

                                    <PagesFieldArray name={`pages`} helpers={fieldArrayProps}/>
                                )
                            }
                        </FieldArray>
                    </FormWrapper>
                }
            }

        </Formik>

    )
}