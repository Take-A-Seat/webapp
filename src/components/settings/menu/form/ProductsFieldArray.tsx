import React from "react";
import {FieldArray, FieldArrayRenderProps} from "formik";
import {PagesFieldsValuesTypes} from "./PagesFieldArray";
import {FieldWrapper} from "../../../globals/formComponents/style";

export type ProductFormValuesTypes = {
    id: string;
    name: string;
    ingredients: string;
    price: number;
}

type ProductsFormProps = {
    name: string;
    helpers: FieldArrayRenderProps;
}

export const ProductsFieldArray = ({name, helpers}: ProductsFormProps) => {
    return <FieldWrapper>
        {
            helpers.form.values[name] &&
            helpers.form.values[name].map((element: ProductFormValuesTypes, index: number) => {
                console.log("productField", element, index)
                return <>
                    {index}
                </>
            })
        }
    </FieldWrapper>
}