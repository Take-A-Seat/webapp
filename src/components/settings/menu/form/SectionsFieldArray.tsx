import React, {useCallback, useState} from "react";
import {ProductFormValuesTypes, ProductsFieldArray} from "./ProductsFieldArray";
import {Field, FieldArray, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../../globals/formComponents/style";
import {PagesFieldsValuesTypes} from "./PagesFieldArray";
import TextField from "../../../globals/formComponents/TextField";
import {Button, PageWrapper, Wrapper} from "../../../globals/GlobalStyles";
import {SectionPage} from "./style";
import {DeletePopup} from "../../../globals/deletePopup/DeletePopUp";

export type SectionsFormValuesTypes = {
    titleSection: string;
    products: ProductFormValuesTypes[]
}

type SectionsFormProps = {
    name: any;
    indexPage: number;
    helpers: FieldArrayRenderProps;
}

export const SectionsFieldArray = ({name, helpers, indexPage}: SectionsFormProps) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [showPopup, setPopup] = useState({show:false,index:-1})

    return <>
        <FieldWrapper noBorder>
            {
                helpers.form.values &&
                helpers.form.values.pages[indexPage].sections.map((element: PagesFieldsValuesTypes, index: number) => {
                    return <SectionPage>
                        <Field name={`pages.${indexPage}.sections.${index}.titleSection`}
                               type={"text"}
                               placeholder={"Title"}
                               component={TextField}
                               customWidth={"200px"}
                               noDescription={true}
                               noBorder={true}
                               customFontSize={"20px"}
                               customHeight={"40px"}/>
                        <FieldArray name={"products"}>
                            {
                                fieldArrayProps => (
                                    <ProductsFieldArray name={"products"} helpers={fieldArrayProps}
                                                        indexPage={indexPage} indexSection={index} deleteCall={()=>{
                                        setPopup({show:true,index: index})
                                    }}/>
                                )
                            }
                        </FieldArray>

                    </SectionPage>
                })
            }
            <Wrapper>
                <Button blueButton alignedLeft customWidth={"200px"} onClick={() => {
                    helpers.form.values.pages[indexPage].sections.push(Object.assign({
                        titleSection: "",
                        products: [{
                            name: "",
                            ingredients: "",
                            price: 0

                        }]
                    }))
                    forceUpdate()
                }}>Create a new section</Button></Wrapper>

            <DeletePopup
                show={showPopup.show}
                title={"Delete section?"}
                textDeleteButton={"Delete section"}
                deleteFunction={() => {
                    helpers.form.values.pages[indexPage].sections.splice(showPopup.index, 1)
                    setPopup({show:false,index:-1})
                }}
                whatDelete={ ["section", "products"]}
                cancelFunction={() => setPopup({show:false,index:-1})}/>
        </FieldWrapper>
    </>
}