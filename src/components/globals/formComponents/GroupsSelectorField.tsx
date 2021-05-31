import React from "react"
import {
    FieldError,
    FieldWrapper,
    GroupSelectorsWrapper,
    GroupsSelectorElement,
    GroupsSelectorWrapper,
    SelectedGroupElement,
    SelectedGroupElementIconWrapper
} from "./style";
import {Field} from "formik";
import SelectorField from "./SelectorField";
import MaterialIcon from "../MaterialIcons";
import _ from "lodash"

type GroupsSelectorFieldProps = {
    labelText: string;
    fieldName: string;
    options: { value: string, label: string }[];
}

export const groupsSelectorField = (
    {
        form,
        push,
        remove,
    }: any,
    {
        labelText,
        fieldName,
        options
    }: GroupsSelectorFieldProps
) => {
    const error = form.errors && form.errors[fieldName]
    return (
        <FieldWrapper
            customWidth={"100%"}
            column
            noBorder
            flexStart
        >
            <GroupsSelectorWrapper error={error}>
                <GroupsSelectorElement>
                    <GroupSelectorsWrapper>
                        <Field
                            name={"groupSelector"}
                            labelText={`${labelText}`}
                            component={SelectorField}
                            options={options}
                            customWidth={"50%"}
                            fullWidth
                            noBorder={true}
                            withoutMarginBottom
                            onChange={(selectedOption: { value: string, label: string }) => {
                                let findId = false;
                                form.values[fieldName].map((item: any) => {
                                    if (item == selectedOption.value) {
                                        findId = true;
                                    }
                                })
                                if (!findId) {
                                    push(
                                        selectedOption.value
                                    )
                                }
                            }}
                        />

                    </GroupSelectorsWrapper>
                </GroupsSelectorElement>
                <GroupsSelectorElement withoutBorderBottom flexWrap>
                    {
                        form.values[fieldName] && form.values[fieldName].map((group: string, index: number) => {
                            const valueFromOptions = _.find(options, option => option.value === group)
                            return (
                                <SelectedGroupElement>
                                    {valueFromOptions && valueFromOptions.label}
                                    <SelectedGroupElementIconWrapper
                                        onClick={() => {
                                            remove(index)
                                        }}
                                    >
                                        <MaterialIcon
                                            iconName={"close"}
                                        />
                                    </SelectedGroupElementIconWrapper>

                                </SelectedGroupElement>
                            )
                        })
                    }
                </GroupsSelectorElement>
            </GroupsSelectorWrapper>
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>

    )
};
