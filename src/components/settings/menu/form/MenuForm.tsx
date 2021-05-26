import {FieldArray, Formik} from "formik";
import React, {useCallback, useState} from "react";
import {PagesFieldArray, PagesFieldsValuesTypes} from "./PagesFieldArray";
import {FormWrapper} from "../../../globals/formComponents/style";
import {Button, Wrapper} from "../../../globals/GlobalStyles";
import _ from "lodash";
import MaterialIcon from "../../../globals/MaterialIcons";

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
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    return (<Formik enableReinitialize={true} initialValues={initialValues}
                    onSubmit={(values: MenuFieldsValues) => onSubmit(values)}>
            {
                ({values, handleSubmit}) => {
                    return <FormWrapper onSubmit={handleSubmit} center customMaxWidth={"1430px"}>
                        <FieldArray name={"pages"}>
                            {
                                fieldArrayProps => {
                                    return <PagesFieldArray name={`pages`} helpers={fieldArrayProps}/>
                                }
                            }
                        </FieldArray>
                        <Wrapper flexStart>
                            <Button  secondaryButton onClick={() => {
                                values.pages.push({
                                    number: values.pages && !_.isEmpty(values.pages) ? values.pages.length + 1 : 1,
                                    sections: [{
                                        titleSection: "",
                                        products: [{
                                            name: "",
                                            ingredients: "",
                                            price: 0
                                        }]
                                    }]
                                } as PagesFieldsValuesTypes);
                                forceUpdate()
                            }}><MaterialIcon iconName={"add"}/> Add page</Button>
                            <Button blueButton onClick={() => onSubmit(values)}>Save changes</Button>

                        </Wrapper>
                    </FormWrapper>
                }
            }

        </Formik>

    )
}