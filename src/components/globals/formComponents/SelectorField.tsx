import React from 'react'
import {FieldError, FieldLabel, FieldText, FieldWrapper} from "./style";
import {FieldProps} from "formik";
import Select, {ActionMeta, ValueType} from 'react-select';
import _ from 'lodash';
import {BACKGROUND_COLOR, BLUE_COLOR, SETTINGS_BACKGROUND_GREY, WHITE_COLOR} from "../../../constants/styleConstants";

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
    noBorder?: boolean;
}

const selectorStyles = {
    container: (provided: any) =>
        ({
            ...provided,
            minWidth: '135px',
            maxWidth: "190px",
            marginLeft: "auto",
        }),

    menu: (provided: any) =>
        ({
            ...provided,
            minWidth: '40%',
            backgroundColor: `transparent`,
            color: `${WHITE_COLOR}`,
            borderRadius: "5px",

        }),
    noLabel: (provided: any) =>
        ({
            ...provided,
            minWidth: '100%',
            background: 'white',
        }),
    control: (provided: any) => ({
        ...provided,
        backgroundColor: `${SETTINGS_BACKGROUND_GREY}`,
        ':hover': {
            borderColor: `${BLUE_COLOR}`
        },
        color: `${WHITE_COLOR}`,
        height: "14px;"
    }),

    valueContainer: (provided: any) => ({
        ...provided,
        backgroundColor: `${SETTINGS_BACKGROUND_GREY}`,
        color: `${WHITE_COLOR}`,

    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: `${WHITE_COLOR}`,
    }),

    indicatorsContainer: (provided: any) => ({
        ...provided,
        backgroundColor: `${SETTINGS_BACKGROUND_GREY}`,
        color: `${WHITE_COLOR}`
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? `${SETTINGS_BACKGROUND_GREY}` : `${BACKGROUND_COLOR}`
    })

};

const fullWidth = {
    ...selectorStyles,
    container: (provided: any) => ({
        ...provided,
        minWidth: '50%'
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
                           noBorder,
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
            noBorder={noBorder}
            withoutMarginBottom={withoutMarginBottom}
            error={error}
        >
            <FieldText>
                <FieldLabel
                    title
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
