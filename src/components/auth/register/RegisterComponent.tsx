import React from "react";
import {useHistory} from "react-router-dom";
import {
    AuthErrorText,
    AuthFormButton,
    AuthFormContainer,
    AuthFormContainerTitle,
    AuthFormQuickLinksWrapper,
    AuthFormQuickLinkText,
    AuthMainPageWrapper,
    AuthPageWrapper,
    AuthWrapper,
    Span
} from "../authComponents/styles";
import AuthHeader from "../authComponents/AuthHeader";
import AuthFooter from "../authComponents/AuthFooter";
import {Field, Formik} from "formik";
import {FormWrapper} from "../../globals/formComponents/style";
import AuthInput from "../authComponents/AuthInput";
import * as Yup from "yup";
import {History} from 'history'
import {useLoginDispatch, useLoginState} from "../AuthContext";
import {registerAction} from "../AuthActions";
import {Dispatch} from "../../../constants/globalTypes";
import * as QueryString from "querystring";

export type RegisterInitialValuesProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

const initialValues: RegisterInitialValuesProps = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "manager",
};
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Prenumele trebuie să conțină minim 3 caractere!")
        .max(15, "Prenumele trebuie să conțină maxim 15 caractere!")
        .required("Câmp obligatoriu"),
    lastName: Yup.string()
        .min(3, "Numele trebuie să conțină minim 3 caractere!")
        .max(15, "Numele trebuie să conțină maxim 15 caractere!")
        .required("Câmp obligatoriu"),

    email: Yup.string().email("Email invalid").required("Câmp obligatoriu"),
    password: Yup.string()
        .min(3, "Parola trebuie să conțină minim 3 caractere!")
        .max(33, "Parola trebuie să conțină maxim 33 caractere!")
        .required("Câmp obligatoriu"),

    phone: Yup.string().required("Câmp obligatoriu"),
});

type RegisterFormProps = {
    history: History;
    onSubmit: (values: RegisterInitialValuesProps) => void;
    error: { message: string }
}

const RegisterForm = ({
                          history,
                          onSubmit,
                          error
                      }
                          : RegisterFormProps
) => {
    return (
        <AuthFormContainer>
            <AuthFormContainerTitle>Înregistrare</AuthFormContainerTitle>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values: RegisterInitialValuesProps) => {
                    onSubmit(values)
                }}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleSubmit}) => {
                        return (
                            <FormWrapper big onSubmit={handleSubmit}>
                                <Field
                                    name={"firstName"}
                                    placeholder={"Prenume"}
                                    component={AuthInput}
                                    inputIcon={"person"}
                                    type={"text"}
                                />
                                <Field
                                    name={"lastName"}
                                    placeholder={"Nume"}
                                    component={AuthInput}
                                    inputIcon={"person"}
                                    type={"text"}
                                />
                                <Field
                                    name={"email"}
                                    placeholder={"Email"}
                                    component={AuthInput}
                                    inputIcon={"email"}
                                    type={"text"}
                                />
                                <Field
                                    name={"password"}
                                    placeholder={"Parola"}
                                    component={AuthInput}
                                    inputIcon={"lock"}
                                    type={"password"}
                                />
                                <Field
                                    name={"phone"}
                                    placeholder={"Telefon"}
                                    component={AuthInput}
                                    inputIcon={"phone"}
                                    type={"text"}
                                />
                                <AuthFormButton type={"submit"}>
                                    Creează cont
                                </AuthFormButton>
                                {
                                    error.message !== "" &&
                                    <AuthErrorText>
                                        {error.message}
                                    </AuthErrorText>
                                }
                                <AuthFormQuickLinksWrapper>
                                    <AuthFormQuickLinkText
                                        alignedRight
                                        onClick={() => history.push('/auth/login')}

                                    >
                                        Ai deja cont? <Span orange>Conectează-te</Span>
                                    </AuthFormQuickLinkText>
                                </AuthFormQuickLinksWrapper>
                            </FormWrapper>
                        )
                    }
                }
            </Formik>
        </AuthFormContainer>
    )
}

interface submitProps {
    values: RegisterInitialValuesProps,
    dispatch: Dispatch,
    history: History,
    isInvite: boolean
    inviteId: string
}

const onSubmit = ({values, dispatch, history, isInvite, inviteId}: submitProps) => {
    registerAction({
        values,
        dispatch,
        history,
        isInvite,
        inviteId
    })
};

export default function RegisterComponent() {
    let history = useHistory();
    const params = QueryString.parse(history.location.search);
    let isInvite = false;
    let inviteId = "";
    if (params.inviteId !== undefined) {
        isInvite = true;
        inviteId = String(params.inviteId)
    }

    const dispatch = useLoginDispatch();
    const {error} = useLoginState();
    const onSubmitForm = (values: RegisterInitialValuesProps) => {
        onSubmit({values, dispatch, history, isInvite, inviteId})
    };
    return (
        <AuthPageWrapper>
            <AuthWrapper>
                <AuthHeader/>
                <AuthMainPageWrapper>
                    <RegisterForm
                        history={history}
                        onSubmit={(values: RegisterInitialValuesProps) => onSubmitForm(values)}
                        error={error}
                    />
                </AuthMainPageWrapper>
            </AuthWrapper>
            <AuthFooter/>
        </AuthPageWrapper>

    );
}
