import React from "react"
import {FieldError, FieldLabel, FieldText, FieldWrapper, TextArea} from "./style";
import {FieldProps} from "formik";

interface TextAreaField extends FieldProps {
    labelText: string;
    smallFields?: string;
}

const TextAreaField = ({
                           field,
                           form,
                           labelText,
                           smallFields,
                           ...props
                       }
                           : TextAreaField
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper
            error={error}
            smallFields={smallFields}
        >
            <FieldText>
                <FieldLabel error={error}>
                    {labelText}
                </FieldLabel>
                <TextArea
                    {...field}
                    {...props}
                    error={error}
                />
            </FieldText>
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
};

export default TextAreaField