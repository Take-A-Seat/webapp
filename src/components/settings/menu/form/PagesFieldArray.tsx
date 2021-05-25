import React, {useState} from "react";
import {SectionsFieldArray, SectionsFormValuesTypes} from "./SectionsFieldArray";
import {Field, FieldArray, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../../globals/formComponents/style";
import TextField from "../../../globals/formComponents/TextField";
import {Button, PageWrapper, Wrapper} from "../../../globals/GlobalStyles";
import {PageMenu} from "./style";
import MaterialIcon from "../../../globals/MaterialIcons";
import _ from "lodash";
import {DeletePopup} from "../../../globals/deletePopup/DeletePopUp";

export type PagesFieldsValuesTypes = {
    number: number;
    sections: SectionsFormValuesTypes[];
}

type PagesFormProps = {
    name: string;
    helpers: FieldArrayRenderProps;
}


export const PagesFieldArray = ({name, helpers}: PagesFormProps) => {
    const [showPopup, setPopup] = useState({show:false,index:-1})
    return (<FieldWrapper>
        {
            helpers.form.values[name] &&
            helpers.form.values[name].map((element: PagesFieldsValuesTypes, index: number) => {
                return (
                    <PageMenu>
                        <PageWrapper noPaddingBottom>
                            <FieldArray name={"sections"}
                                        render={fieldProps => (<SectionsFieldArray name={`[pages][${index}]`}
                                                                                   helpers={fieldProps}
                                                                                   indexPage={index}/>)}/>
                            <Field name={`pages.${index}.number`} type={"number"} component={TextField}
                                   labelText={"page"}/>
                            <Wrapper>
                                <Wrapper>
                                    <Button lastElement customWidth={"180px"} onClick={() => {
                                        setPopup({show:true,index:index})
                                    }}> <MaterialIcon iconName={"delete"}/>
                                        Delete page</Button>

                                </Wrapper>
                            </Wrapper>
                        </PageWrapper>
                    </PageMenu>

                )
            })
        }
        <Wrapper>
            <Button blueButton alignedLeft customWidth={"200px"} onClick={() => {
                helpers.push({
                    number: helpers.form.values && !_.isEmpty(helpers.form.values[name]) ? helpers.form.values[name].length + 1 : 1,
                    sections: [{
                        titleSection: "",
                        products: [{
                            name: "",
                            ingredients: "",
                            price: 0
                        }]
                    }]
                })
            }}>Create a new page</Button>
        </Wrapper>
        <DeletePopup
            show={showPopup.show}
            title={"Delete page?"}
            textDeleteButton={"Delete page"}
            deleteFunction={() => {
                helpers.remove(showPopup.index)
                setPopup({show:false,index:-1})
            }}
            whatDelete={["page", "sections", "products"]}
            cancelFunction={() => setPopup({show:false,index:-1})}/>
    </FieldWrapper>)

}