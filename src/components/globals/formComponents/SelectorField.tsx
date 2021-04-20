import React, {useEffect} from 'react'
import {FieldError, FieldLabel, FieldText, FieldWrapper} from "./style";
import {FieldProps} from "formik";
import Select, {ActionMeta, ValueType} from 'react-select';
import _ from 'lodash';

export type OptionsType = {
    label: string;
    value: string;
};

interface SelectorFieldProps extends FieldProps {
    labelText: string;
    error: string;
    options: OptionsType[];
    placeholder: string;
    fitContentWidth?: boolean;
    customWidth?: string;
    onChange?: (option: ValueType<OptionsType | OptionsType[], any>, action?: ActionMeta<OptionsType>) => void;
    withoutMarginBottom?: boolean;
    disabled?: boolean;
    required?: boolean;
    selectorStyles?: any;
    hasFullWidth?: boolean;
};

const selectorStyles = {
    container: (provided: any) =>
        ({
            ...provided,
            minWidth: '60%',
        }),
    menu: (provided: any) =>
        ({
            ...provided,
            minWidth: '60%',
            background: 'white',
        }),
    noLabel: (provided: any) =>
        ({
            ...provided,
            minWidth: '100%',
            background: 'white',
        }),
    control: (provided: any) => ({
        ...provided,
        height: "44px"
    })
};

const fullWidth = {
    ...selectorStyles,
    container: (provided: any) => ({
        ...provided,
        minWidth: '100%'
    })
}

const SelectorField = ({
                           options,
                           placeholder,
                           field,
                           labelText,
                           form,
                           fitContentWidth,
                           customWidth,
                           withoutMarginBottom,
                           onChange,
                           disabled,
                           required,
                           hasFullWidth
                       }: SelectorFieldProps) => {
    let error: boolean = false;
    if (required) {
        error = !form.values[field.name] && !!form.touched[field.name];
    }
    let selectedObject: OptionsType = {
        value: "",
        label: ""
    };
    if (field.value || field.value === 0 || field.value === false) {
        const selectedObjectIndex = _.findIndex(options, option => option.value === field.value);
        if (selectedObjectIndex > -1) {
            selectedObject = options[selectedObjectIndex]
        }
    }
    const onChangeFromInput = (option: ValueType<OptionsType | OptionsType[], any>, action: ActionMeta<OptionsType>) => {
        form.setFieldValue(
            field.name,
            (option as OptionsType).value
        )
    };
    return (
        <FieldWrapper
            fitContentWidth={fitContentWidth}
            customWidth={customWidth}
            alignCenter
            withoutMarginBottom={withoutMarginBottom}
            error={error}
        >
            <FieldText>
                <FieldLabel
                    error={!!error}
                >
                    {labelText}
                </FieldLabel>
                <Select
                    options={options}
                    placeholder={placeholder}
                    styles={hasFullWidth ? fullWidth : selectorStyles}
                    value={selectedObject}
                    onChange={onChange ? onChange : onChangeFromInput}
                    isDisabled={disabled}
                    onFocus={() => {
                        form.setFieldTouched(field.name, true, false)
                    }}
                />
            </FieldText>
            {
                error &&
                <FieldError>{"Camp obligatoriu"}</FieldError>
            }
        </FieldWrapper>
    )
};

export default SelectorField
