import React from 'react'
import {
    CustomDiv,
    CustomDivText,
    FieldError,
    FieldLabel,
    FieldText,
    FieldWrapper,
    InputDivider,
    StyledInput
} from "./style";
import {FieldProps} from "formik";

interface TextFieldProps extends FieldProps {
    labelText: string;
    customWidth?: string;
    withoutMarginBottom?: boolean;
}

const StyledTextField = ({
                             field,
                             customWidth,
                             form,
                             meta,
                             labelText,
                             withoutMarginBottom,
                             ...props
                         }:
                             TextFieldProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper customWidth={customWidth} withoutMarginBottom={withoutMarginBottom} error={error}>
            <FieldText>
                <FieldLabel
                    error={error}
                >
                    {labelText}
                </FieldLabel>
                <StyledInput
                    {...field}
                    {...props}
                    error={error}
                />
                <CustomDiv  {...field}
                            {...props}
                            error={error}>
                    <InputDivider/>
                    <CustomDivText>mp</CustomDivText>
                </CustomDiv>
            </FieldText>
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
};

export default StyledTextField
