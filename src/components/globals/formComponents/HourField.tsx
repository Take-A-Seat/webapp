import React from "react"
import {FieldProps} from "formik";
import {CustomStyledInput, FieldLabel, FieldText, FieldWrapper, InputsWrapper} from "./style";

interface HourFieldProps extends FieldProps {
    labelText: string;
    smallFields?: boolean;

}

const HourField = ({
                       field,
                       form,
                       labelText,
                       smallFields,
                       ...props
                   }
                       : HourFieldProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper
            error={error}
            smallFields={smallFields}
        >
            <FieldText>
                <FieldLabel error={error}>{labelText}</FieldLabel>
                <InputsWrapper>
                    <CustomStyledInput
                        {...props}
                        error={error}
                        type={"number"}
                        min={"0"}
                        max={"24"}
                        step={"1"}
                        // value={"00"}
                        customWidth={"85px"}
                        customMarginLeft={"0px"}
                        onBlur={(e: InputEvent) => {
                            const target = e.target as HTMLInputElement;
                            let regex = /[012][0-9]/;
                            if (!regex.test(target.value)) {
                                target.value = "00";
                            }
                            if (Number(target.value) > 24) {
                                target.value = "00";
                            }
                            let newFieldValue = "";
                            if (field.value !== "") {
                                let fieldValues = field.value.split(":");
                                newFieldValue = `${target.value}:${fieldValues[1]}`
                            } else {
                                newFieldValue = `${target.value}:00`
                            }
                            form.setFieldValue(field.name, newFieldValue);
                        }}
                    />
                    <div
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        :
                    </div>
                    <CustomStyledInput
                        {...props}
                        error={error}
                        type={"number"}
                        min={"0"}
                        max={"59"}
                        customWidth={"85px"}
                        customMarginLeft={"10px"}
                        // value={"00"}
                        onBlur={(e: InputEvent) => {
                            const target = e.target as HTMLInputElement;
                            let regex = /[0-6][0-9]/;
                            if (!regex.test(target.value)) {
                                target.value = "00"
                            }
                            if (Number(target.value) > 60) {
                                target.value = "00"
                            }
                            let newFieldValue = "";
                            if (field.value !== "") {
                                let fieldValues = field.value.split(":");
                                newFieldValue = `${fieldValues[0]}:${target.value}`
                            } else {
                                newFieldValue = `00:${target.value}`
                            }
                            form.setFieldValue(field.name, newFieldValue);
                        }}
                    />
                </InputsWrapper>

            </FieldText>
        </FieldWrapper>
    )
};

export default HourField