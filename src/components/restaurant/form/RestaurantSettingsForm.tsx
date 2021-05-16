import {Field, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import {FormWrapper, PageContent, SectionSettings, TextSection} from "../../globals/formComponents/style";
import TextField from "../../globals/formComponents/TextField";

export type RestaurantSettingsFormValuesTypes = {
    name: string;
    description: string;
    address: string;
    phone: string;
    program: string;
    postCode: string;
    country: string;
    email: string;
    website: string;
    facebook: string;
    instagram: string;
    twitter: string;
}
type RestaurantSettingsFormProps = {
    initialValues: RestaurantSettingsFormValuesTypes;
    onSubmit: (values: RestaurantSettingsFormValuesTypes) => void;
}

export const RestaurantFormSettings = ({initialValues, onSubmit}: RestaurantSettingsFormProps) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Camp obligatoriu").min(3, "Minim 3")
    })

    return (<Formik enableReinitialize={true} initialValues={initialValues}
                    onSubmit={(values: RestaurantSettingsFormValuesTypes) => {
                        onSubmit(values)
                    }}
                    validationSchema={validationSchema}>
        {
            ({values, handleSubmit}) => {
                return (
                    <FormWrapper onSubmit={handleSubmit} center>
                        <PageContent>
                            <SectionSettings column firstSection>
                                <TextSection>
                                    Design
                                </TextSection>
                                <TextSection description>
                                    Take a seat uses your logo in all emails to guests.
                                    Avatars are used to personalize your messages.
                                </TextSection>
                                <Field name={"logo"} type={"text"} component={TextField} labelText={"Logo"}
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
                                <Field name={"name"} type={"text"} component={TextField} labelText={"Restaurant name"}/>
                                <Field name={"streetAndNumber"} type={"text"} component={TextField} labelText={"Street and number"}/>
                                <Field name={"postCode"} type={"text"} component={TextField} labelText={"Postal code"}/>
                                <Field name={"city"} type={"text"} component={TextField} labelText={"City"}/>
                                <Field name={"province"} type={"text"} component={TextField} labelText={"Province / Area"}/>
                                <Field name={"country"} type={"text"} component={TextField} labelText={"Country"}/>
                                <Field name={"phone"} type={"text"} component={TextField} labelText={"Telephone"}/>
                                <Field name={"email"} type={"text"} component={TextField} labelText={"Email"}/>
                                <Field name={"website"} type={"text"} component={TextField} labelText={"Website"}/>
                            </SectionSettings>

                            <SectionSettings column>
                                <TextSection>
                                    Social profiles
                                </TextSection>
                                <TextSection description>
                                    Take a Seat uses your social links in emails to guests.
                                    Paste the URLs of your profile pages here.
                                </TextSection>

                                <Field name={"facebook"} type={"text"} component={TextField} labelText={"facebook"}/>
                                <Field name={"instagram"} type={"text"} component={TextField} labelText={"instagram"}/>
                                <Field name={"twitter"} type={"text"} component={TextField} labelText={"twitter"}/>
                            </SectionSettings>

                        </PageContent>
                    </FormWrapper>)
            }
        }

    </Formik>)
}

