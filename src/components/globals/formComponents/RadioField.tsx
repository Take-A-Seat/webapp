import React from 'react'
import {
    FieldError,
    FieldLabel,
    FieldWrapper,
    RadioElementInput,
    RadioElementLabel,
    RadioElementWrapper,
    RadioWrapper
} from "./style";
import {FieldProps} from "formik";

interface RadioFieldProps extends FieldProps {
    labelText: string;
    customWidth?: string;
    withoutMarginBottom?: boolean;
    options: { id: string, name: string }[];
}

const RadioField = ({
                        labelText,
                        field,
                        form,
                        customWidth,
                        withoutMarginBottom,
                        options
                    }
                        : RadioFieldProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper
            customWidth={customWidth}
        >
            <FieldLabel
                error={error}
            >
                {labelText}
            </FieldLabel>
            <RadioWrapper>
                {
                    options.map((option) => {
                        return (
                            <RadioElementWrapper>
                                <RadioElementInput
                                    type={"radio"}
                                    id={option.id}
                                    name={field.name}
                                    value={option.id}
                                    checked={field.value === option.id}
                                    onClick={() => form.setFieldValue(field.name, option.id)}
                                />
                                <RadioElementLabel
                                    for={option.id}
                                >
                                    {option.name}
                                </RadioElementLabel>
                            </RadioElementWrapper>
                        )
                    })
                }
            </RadioWrapper>
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
}

export default RadioField