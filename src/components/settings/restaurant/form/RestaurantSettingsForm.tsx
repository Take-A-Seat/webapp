import {Field, FieldArray, Formik} from "formik";
import React, {useCallback, useState} from "react";
import * as Yup from "yup";
import {FormWrapper, SectionSettings, TextSection} from "../../../globals/formComponents/style";
import TextField from "../../../globals/formComponents/TextField";
import DropZoneField from "../../../globals/formComponents/DropzoneField";
import {Button, Wrapper} from "../../../globals/GlobalStyles";
import MaterialIcon from "../../../globals/MaterialIcons";
import Map from "../../../globals/Maps/Map";
import {ProgramFieldArray} from "./ProgramFieldArray";
import SwitchField from "../../../globals/formComponents/SwitchField";


export type RestaurantSettingsFormValuesTypes = {
    id: string;
    name: string;
    description: string;
    visibleOnline: any;
    phone: string;
    program: ProgramFormValueType[];
    postCode: string;
    country: string;
    email: string;
    website: string;
    facebook: string;
    instagram: string;
    twitter: string;
    logo: any,
    streetAndNumber: string,
    province: string,
    city: string,
    lng: number,
    lat: number,
}

export type ProgramFormValueType = {
    startAt: any,
    endAt: any,
    day: number,
    close: boolean,
}


type RestaurantSettingsFormProps = {
    initialValues: RestaurantSettingsFormValuesTypes;
    onSubmit: (values: RestaurantSettingsFormValuesTypes) => void;
    cancel?: () => void;
    addNewFile: (file: File) => void;
    file: File;
    removeFile: () => void;
    urlImage?: string;
    fromUrl?: boolean;
}

export const RestaurantFormSettings = ({
                                           initialValues,
                                           onSubmit,
                                           addNewFile,
                                           file,
                                           removeFile,
                                           urlImage,
                                           fromUrl,
                                           cancel,

                                       }: RestaurantSettingsFormProps) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Minim 3 litere").required("Camp obligatoriu")
    })

    return (<Formik enableReinitialize={true} initialValues={initialValues}
                    onSubmit={(values: RestaurantSettingsFormValuesTypes) => {
                        onSubmit(values)
                    }}
                    validationSchema={validationSchema}>
        {
            ({values, handleSubmit}) => {
                const [, updateState] = useState({});
                const forceUpdate = useCallback(() => updateState({}), []);
                return (
                    <FormWrapper onSubmit={handleSubmit} center>
                        <SectionSettings column firstSection>
                            <TextSection>
                                Design
                            </TextSection>
                            <TextSection description>
                                Take a seat uses your logo in all emails to guests.
                                Avatars are used to personalize your messages.
                            </TextSection>
                            <Field name={"logo"} component={DropZoneField} type="file" title={"Logo"} accept={"image/*"}
                                   fromUrl={fromUrl}
                                   urlImage={urlImage}
                                   icon={"attach_file"}
                                   addNewFile={addNewFile} removeFile={() => removeFile()} files={file}
                                   dropzoneText={"Select or drop image"}
                                   description={`Upload a .png with a transparent background or a .jpg with a white background.  Your logo should be perfectly sharp. \n\n Make sure the colors contrast with a white background.`}/>

                        </SectionSettings>

                        <SectionSettings column>
                            <TextSection>
                                Contact details
                            </TextSection>
                            <TextSection description>
                                Take a Seat uses your contact details in the Terms & conditions, Privacy statement
                                and emails to guests.
                            </TextSection>
                            <Field name={"name"} type={"text"} customMaxWidth={"220px"} alignRight customHeight={"30px"}
                                   component={TextField} labelText={"Restaurant name"}/>
                            <Field name={"streetAndNumber"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Street and number"}/>
                            <Field name={"postCode"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Postal code"}/>
                            <Field name={"city"} type={"text"} customMaxWidth={"220px"} alignRight customHeight={"30px"}
                                   component={TextField} labelText={"City"}/>
                            <Field name={"province"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Province / Area"}/>
                            <Field name={"country"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Country"}/>
                            <Map/>
                            <Field name={"phone"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Telephone"}/>
                            <Field name={"email"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Email"}/>
                            <Field name={"website"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"Website"}/>
                            <Field name={`visibleOnline`}
                                   component={SwitchField}
                                   labelText={"Visible online"}
                                   isSwitch={false}
                                   withoutMarginBottom={true}
                                   checked={values.visibleOnline}
                                   onChange={(check: boolean) => {
                                       values.visibleOnline = check;
                                       forceUpdate();
                                   }}
                            />
                        </SectionSettings>
                        <SectionSettings column>
                            <TextSection customMarginBottom={"15px"}>
                                Program
                            </TextSection>
                            <FieldArray name={"program"} render={fieldArrayProps => {
                                return <ProgramFieldArray name={"program"} helpers={fieldArrayProps}/>
                            }}/>


                        </SectionSettings>

                        <SectionSettings column>
                            <TextSection>
                                Social profiles
                            </TextSection>
                            <TextSection description>
                                Take a Seat uses your social links in emails to guests.
                                Paste the URLs of your profile pages here.
                            </TextSection>
                            <Field name={"description"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"description"}/>
                            <Field name={"facebook"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"facebook"}/>
                            <Field name={"instagram"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"instagram"}/>
                            <Field name={"twitter"} type={"text"} customMaxWidth={"220px"} alignRight
                                   customHeight={"30px"} component={TextField} labelText={"twitter"}/>
                        </SectionSettings>
                        <Wrapper>
                            {cancel && <Button
                                onClick={() => {
                                    cancel()
                                }} cancelButton>
                                <MaterialIcon iconName={"cancel"}/>
                                Cancel
                            </Button>}
                            <Button alignedLeft onClick={() => onSubmit(values)} blueButton>
                                <MaterialIcon iconName={"save"}/>
                                {initialValues.id == "" ? "Create settings" : "Save changes"}</Button>
                        </Wrapper>

                    </FormWrapper>)
            }
        }

    </Formik>)
}

