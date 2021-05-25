import {FieldArray, Formik} from "formik";
import React from "react";
import {PagesFieldArray, PagesFieldsValuesTypes} from "./PagesFieldArray";
import {FormWrapper} from "../../../globals/formComponents/style";
import {Button} from "../../../globals/GlobalStyles";

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
// console.log(initialValues)
    return (<Formik enableReinitialize={true} initialValues={initialValues}
                    onSubmit={(values: MenuFieldsValues) => onSubmit(values)}>
            {
                ({values, handleSubmit}) => {
                    console.log(values)
                    return <FormWrapper onSubmit={handleSubmit} center customMaxWidth={"1430px"}>
                        <FieldArray name={"pages"}>
                            {
                                fieldArrayProps => {
                                    return  <PagesFieldArray name={`pages`} helpers={fieldArrayProps}/>
                                }
                            }
                        </FieldArray>
                        <Button onClick={()=>onSubmit(values)}>Save</Button>

                    </FormWrapper>
                }
            }

        </Formik>

    )
}