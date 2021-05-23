import React from "react";
import {ProductFormValuesTypes, ProductsFieldArray} from "./ProductsFieldArray";
import {FieldArray, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../../globals/formComponents/style";
import {PagesFieldsValuesTypes} from "./PagesFieldArray";

export type SectionsFormValuesTypes = {
    titleSection: string;
    products: ProductFormValuesTypes[]
}

type SectionsFormProps = {
    name: string;
    helpers: FieldArrayRenderProps;
}

export const SectionsFieldArray = ({name, helpers}: SectionsFormProps) => {
    console.log("helpers Section Field",helpers)

    return <FieldWrapper>
        {
            helpers.form.values[name] &&
            helpers.form.values[name].map((element:PagesFieldsValuesTypes,index:number)=>{
                console.log("sectionField" ,element,index)
                return <FieldArray name={"pages"}>
                    {
                        fieldArrayProps => (
                            <ProductsFieldArray name={"pages"} helpers={fieldArrayProps}/>
                        )
                    }
                </FieldArray>
            })
        }
    </FieldWrapper>
}