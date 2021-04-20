import React from 'react'
import {CustomStyledInput, FieldError, FieldLabel, FieldText, FieldWrapper} from "./style";
import {FieldProps} from "formik";

interface TextFieldProps extends FieldProps {
    labelText: string;
    customWidth?: string;
    withoutMarginBottom?: boolean;
    smallFields?: boolean;
    biggerInput?: boolean;
    disabled?: boolean;
    customInputWidth?: string;
    onBlur?: () => void;
}

const TextField = ({
                       field,
                       customWidth,
                       form,
                       meta,
                       labelText,
                       withoutMarginBottom,
                       smallFields,
                       biggerInput,
                       customInputWidth,
                       disabled,
                       onBlur,
                       ...props
                   }:
                       TextFieldProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper
            customWidth={customWidth}
            withoutMarginBottom={withoutMarginBottom}
            error={error}
            smallFields={smallFields}
        >
            <FieldText>
                <FieldLabel
                    error={error}
                >
                    {labelText}
                </FieldLabel>
                <CustomStyledInput
                    {...field}
                    {...props}
                    error={error}
                    customWidth={!labelText && `100%`}
                    customMarginLeft={!labelText && `0`}
                    biggerInput={biggerInput}
                    customInputWidth={customInputWidth}
                    disabled={disabled}
                    onBlur={(e: any) => {
                        if (onBlur) {
                            form.handleBlur(e);
                            onBlur();
                        }
                    }}
                />
            </FieldText>
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
};

export default TextField
