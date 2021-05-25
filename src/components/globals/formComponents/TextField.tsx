import React from 'react'
import {CustomStyledInput, FieldError, FieldLabel, FieldText, FieldTextTitleSection, FieldWrapper} from "./style";
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
    description?: string;
    noDescription?: boolean;
    customFontSize?: number;
    noBorder?:boolean;
    customHeight?: number;
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
                       description,
                       customInputWidth,
                       disabled,
                       onBlur,
                       noDescription,
                   noBorder,
                       customFontSize,
                       customHeight,
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
            noBorder={noBorder}
            smallFields={smallFields}
        >
            <FieldText>
                {!noDescription && <FieldTextTitleSection>
                    <FieldLabel
                        title
                        error={error}
                    >
                        {labelText}
                    </FieldLabel>
                    {description && <FieldLabel description>
                        {description}
                    </FieldLabel>}
                </FieldTextTitleSection>}

                <CustomStyledInput
                    {...field}
                    {...props}
                    error={error}
                    customWidth={!labelText && `100%`}
                    customMarginLeft={!labelText && `0`}
                    biggerInput={biggerInput}
                    noDescription={!noDescription}
                    customInputWidth={customInputWidth}
                    customHeight={customHeight}
                    customFontSize={customFontSize}
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
