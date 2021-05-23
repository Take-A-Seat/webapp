import React from "react";
import {SectionsFieldArray, SectionsFormValuesTypes} from "./SectionsFieldArray";
import {FieldArray, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../../globals/formComponents/style";

export type PagesFieldsValuesTypes = {
    number: number;
    sections: SectionsFormValuesTypes[];
}

type PagesFormProps = {
    name: string;
    helpers: FieldArrayRenderProps;
}


export const PagesFieldArray = ({ name,helpers}: PagesFormProps) => {
    console.log("helpers PageField",helpers)
    return <FieldWrapper>
        {
            helpers.form.values[name] &&
                helpers.form.values[name].map((element:PagesFieldsValuesTypes,index:number)=>{
                    console.log("pageField" ,element,index)
                    return <FieldArray name={`sections`}>
                        {
                            fieldArrayProps => (
                                <SectionsFieldArray name={`${fieldArrayProps.name}`} helpers={fieldArrayProps}/>
                            )
                        }
                    </FieldArray>
                })
        }
    </FieldWrapper>
}