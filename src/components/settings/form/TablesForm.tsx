import {Field, Formik} from "formik";
import React, {useCallback, useState} from "react";
import {FormWrapper} from "../../globals/formComponents/style";
import TextField from "../../globals/formComponents/TextField";
import SelectorField from "../../globals/formComponents/SelectorField";
import SwitchField from "../../globals/formComponents/SwitchField";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";

export type TablesFormValues = {
    id: string;
    tableGroupId: string;
    areaId: string;
    number: string;
    priority: string;
    availableOnline: boolean;
    minPeople: number;
    maxPeople: number;
}

type TableFormProps = {
    initialValues: TablesFormValues;
    onSubmit: (values: TablesFormValues) => void;
    optionsNumberPeople?: { label: string, value: number }[];
    cancel?: () => void;
}

export const TableForm = ({initialValues, onSubmit, cancel, optionsNumberPeople}: TableFormProps) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);


    return (<Formik enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(values: TablesFormValues) => {
            onSubmit(values)
        }}>{
            ({values, handleSubmit}) => {
                return <FormWrapper onSubmit={handleSubmit}>
                    <Field name={"number"}
                           type={"number"}
                           component={TextField}
                           withoutMarginBottom={true}
                           labelText={"Table number"}
                           customWidth={"100%"}/>
                    <Field name={"minPeople"}
                           component={SelectorField}
                           labelText={"Minim people"}
                           options={optionsNumberPeople}
                           selectedValue={values.minPeople}
                    />
                    <Field name={"maxPeople"}
                           component={SelectorField}
                           labelText={"Maxim people"}
                           selectorStyles={"container"}
                           options={optionsNumberPeople}
                           selectedValue={values.maxPeople}
                    />
                    <Field name={"availableOnline"}
                           labelText={"Available online"}
                           component={SwitchField}
                           checked={values.availableOnline}
                           onChange={(check: boolean) => {
                               values.availableOnline = check;
                               forceUpdate();
                           }}
                    />

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

            }
        }

        </Formik>

    )
}