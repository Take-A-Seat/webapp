import React, {useState} from "react";
import {SectionsFieldArray, SectionsFormValuesTypes} from "./SectionsFieldArray";
import {Field, FieldArray, FieldArrayRenderProps} from "formik";
import {CenterContainer, ContainerIcon, FieldWrapper} from "../../../globals/formComponents/style";
import TextField from "../../../globals/formComponents/TextField";
import {Button, PageWrapper, Wrapper} from "../../../globals/GlobalStyles";
import {PageMenu} from "./style";
import MaterialIcon from "../../../globals/MaterialIcons";
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
    const [showPopup, setPopup] = useState({show: false, index: -1})
    return (<FieldWrapper noBorder>
        {
            helpers.form.values[name] &&
            helpers.form.values[name].map((element: PagesFieldsValuesTypes, index: number) => {
                return (
                    <PageMenu>
                        <PageWrapper noPaddingBottom>
                            <FieldArray name={"sections"}
                                        render={fieldProps => (
                                            <SectionsFieldArray
                                                name={`[pages][${index}]`}
                                                helpers={fieldProps}
                                                indexPage={index}/>
                                        )}
                            />

                            <CenterContainer>
                                <Field name={`pages.${index}.number`}
                                       type={"number"}
                                       noBorder={true}
                                       noMarginTitle={true}
                                       component={TextField}
                                       customPaddingRight={"0px"}
                                       customWidthField={"200px"}
                                       customInputWidth={"65px"}
                                       labelText={"page"}/>
                                <ContainerIcon  onClick={() => {
                                    setPopup({show: true, index: index})
                                }}>
                                    <Button
                                        tertiaryButton
                                        customMarginBottom={"15px"}
                                       >
                                        <MaterialIcon iconName={"delete"}/>
                                        Delete page
                                    </Button>
                                </ContainerIcon>
                            </CenterContainer>
                        </PageWrapper>
                    </PageMenu>

                )
            })
        }

        <DeletePopup
            show={showPopup.show}
            title={"Delete page?"}
            textDeleteButton={"Delete page"}
            deleteFunction={() => {
                helpers.remove(showPopup.index)
                setPopup({show: false, index: -1})
            }}
            whatDelete={["page", "sections", "products"]}
            cancelFunction={() => setPopup({show: false, index: -1})}/>
    </FieldWrapper>)

}