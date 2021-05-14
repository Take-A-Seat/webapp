import React from "react"
import {FieldArrayRenderProps} from "formik";
import {FieldLabel, FieldsWrapper} from "./style";
import SwitchField from "./SwitchField";
import _ from "lodash";

type SwitchFieldArray = {
    helpers: FieldArrayRenderProps;
    title?: string;
    elements: { label: string, value: string, checked: boolean }[];
    name: string;
    getElementValue: (value: string) => any
    isFund?: boolean
}

const SwitchFieldArray = ({
                              helpers,
                              title,
                              elements,
                              name,
                              getElementValue,
                              isFund
                          }: SwitchFieldArray) => {
    const array = helpers.form.values[name];
    return (
        <FieldsWrapper>
            {
                title &&
                <FieldLabel
                    marginBottom={"20px"}
                >
                    {title}
                </FieldLabel>
            }
            {
                elements &&
                elements.map((element, index) => {
                    let arrayIndex = -1;
                    if (isFund) {
                        arrayIndex = _.findIndex(array, (value: { fundId: string }) => value.fundId === element.value);

                    } else {
                        arrayIndex = _.findIndex(array, value => value === element.value);
                    }
                    const checked = arrayIndex > -1;

                    return (
                        <SwitchField
                            key={index}
                            labelText={element.label}
                            checked={checked}
                            onChange={(checked: boolean) => {
                                if (checked) {
                                    helpers.push(getElementValue(element.value));
                                } else {
                                    helpers.remove(arrayIndex);
                                }
                            }}
                        />
                    )
                })
            }
        </FieldsWrapper>
    )
}

export default SwitchFieldArray