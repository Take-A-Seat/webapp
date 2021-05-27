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
    noBorder?: boolean;
    customHeight?: string;
    customWidthField?:string;
    customPaddingRight?:string;
    customMaxWidth?:string;
    customWidthInput?:string;
    noMarginTitle?:string;
}

const TextField = ({
                       field,
                       customWidth,
                       form,
                       meta,
                       labelText,
                       withoutMarginBottom,
                       smallFields,
                       customPaddingRight,
                       biggerInput,
                       description,
                       customInputWidth,
                       disabled,
                       onBlur,
                       customWidthField,
                       noDescription,
                       noBorder,
                       customFontSize,
                       customHeight,
                       customMaxWidth,
                       customWidthInput,
    noMarginTitle,
                       ...props
                   }:
                       TextFieldProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper
            customWidth={customWidthField}
            withoutMarginBottom={withoutMarginBottom}
            error={error}
            noBorder={noBorder}
            smallFields={smallFields}
        >
            <FieldText>
                {!noDescription && <FieldTextTitleSection customPaddingRight={customPaddingRight?customPaddingRight:"auto"}>
                    <FieldLabel
                        title
                        noMarginTitle={noMarginTitle}
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
                    customMaxWidth={customMaxWidth}
                    customWidthInput={customWidthInput}
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
