import React from 'react'
import {FieldLabelCheckbox, FieldWrapper} from "./style";
import {Field} from "formik";

type CheckboxFieldProps = {
    field: {};
    labelText: string;
    value: boolean;
    name: string;
    customWidth?: string;
    stair: boolean;
    withoutMarginBottom?: boolean;
}

const Checkbox = ({
                      field,
                      customWidth,
                      labelText,
                      name,
                      value,
                      stair,
                      withoutMarginBottom,
                  }:
                      CheckboxFieldProps
) => {
    return (
        <FieldWrapper customWidth={customWidth}
                      checkBoxMargin
                      withoutMarginBottom={withoutMarginBottom}>
            <FieldLabelCheckbox
                stair={stair}
            >
                {labelText}
            </FieldLabelCheckbox>

            <Field type="checkbox" name={name}/>
        </FieldWrapper>
    )
};

export default Checkbox
