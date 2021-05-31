import {FieldArray, Formik} from "formik";
import React from "react";
import {FormWrapper, SectionSettings, TextSection} from "../../../globals/formComponents/style";
import {groupsSelectorField} from "../../../globals/formComponents/GroupsSelectorField";
import {PageMenu} from "../../menu/form/style";
import {Button, Wrapper} from "../../../globals/GlobalStyles";
import MaterialIcon from "../../../globals/MaterialIcons";

type SpecificsTypesValuesForm = {
    optionsSpecific: { value: string, label: string }[]
    optionsTypes: { value: string, label: string }[],
    initialValues: any;
    onSubmit: (values: any) => void;
    cancel?: () => void;
}

export const SpecificTypeForm = ({
                                     optionsSpecific,
                                     optionsTypes,
                                     onSubmit,
                                     initialValues,
                                     cancel
                                 }: SpecificsTypesValuesForm) => {

    return <Formik enableReinitialize={true}
                   initialValues={initialValues}
                   onSubmit={(values: any) => {
                       onSubmit(values)
                   }}>{
        ({values, handleSubmit}) => {
            console.log(values)
            return (<FormWrapper noBorder>
                <PageMenu>
                    <SectionSettings column  firstSection>
                        <FieldArray
                            name={"specific"}
                            render={(arrayHelpers) =>
                                groupsSelectorField(arrayHelpers, {
                                    labelText: "Select specific restaurant:",
                                    fieldName: "specific",
                                    options: optionsSpecific
                                })
                            }
                        />
                    </SectionSettings>
                </PageMenu>
                <PageMenu>
                    <SectionSettings column firstSection>
                        <FieldArray
                            name={"types"}
                            render={(arrayHelpers) =>
                                groupsSelectorField(arrayHelpers, {
                                    labelText: "Select type restaurant:",
                                    fieldName: "types",
                                    options: optionsTypes
                                })
                            }
                        />
                    </SectionSettings>
                </PageMenu>
                <Wrapper>
                    {cancel && <Button
                        onClick={() => {
                            cancel()
                        }} cancelButton>
                        <MaterialIcon iconName={"cancel"}/>
                        Cancel
                    </Button>}
                    <Button alignedLeft onClick={() => onSubmit(values)} blueButton>
                        <MaterialIcon iconName={"save"}/>
                        Save changes</Button>
                </Wrapper>
            </FormWrapper>)
        }
    }</Formik>
}