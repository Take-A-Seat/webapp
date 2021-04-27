import React from "react";
import * as Yup from "yup";
import {Dispatch} from "../../../constants/globalTypes";
import {useLoginDispatch, useLoginState} from "../AuthContext";
import {logInAction} from "../AuthActions";
import {History} from 'history'
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
import {useHistory} from "react-router-dom";

interface InviteProps {
    isInvite: boolean,
    inviteId: string,
    userId: string
}

interface SubmitProps {
    dispatch: Dispatch,
    values: {
        email: string,
        password: string
    },
    history: History,
    invite: InviteProps
}

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalid").required("Câmp obligatoriu"),
    password: Yup.string().required("Câmp obligatoriu"),
});

const onSubmit = (
    {
        values,
        dispatch,
        history,
        invite
    }: SubmitProps) => {
    logInAction({
        dispatch,
        values,
        history,
        invite
    })
};

type LoginFormProps = {
    history: History;
    onSubmit: (values: { email: string, password: string }) => void;
    hasError: boolean;
}

const LoginForm = ({
                       history,
                       onSubmit,
                       hasError
                   }
                       : LoginFormProps
) => {
    return (
        <AuthFormContainer>
            <AuthFormContainerTitle>Autentificare</AuthFormContainerTitle>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values: { email: string, password: string }) => {
                    onSubmit(values)
                }}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleSubmit}) => {
                        return (
                            <FormWrapper big onSubmit={handleSubmit}>
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
                                <AuthFormButton type={"submit"}>
                                    Intră în cont
                                </AuthFormButton>
                                {
                                    hasError &&
                                    <AuthErrorText>
                                        Credențiale greșite!
                                    </AuthErrorText>
                                }
                                <AuthFormQuickLinksWrapper>
                                    <AuthFormQuickLinkText
                                        onClick={() => history.push('/auth/login')}
                                    >
                                        Ai uitat parola? <Span blue>Resetează</Span>
                                    </AuthFormQuickLinkText>
                                    <AuthFormQuickLinkText
                                        alignedRight
                                        onClick={() => history.push('/auth/register')}

                                    >
                                        Nu ai cont? <Span orange>Înregistrează-te</Span>
                                    </AuthFormQuickLinkText>
                                </AuthFormQuickLinksWrapper>
                            </FormWrapper>
                        )
                    }
                }
            </Formik>
        </AuthFormContainer>
    )
};

function Login() {
    const history = useHistory();
    let invite = {inviteId: "", isInvite: false, userId: ""};

    const dispatch = useLoginDispatch();
    const loginState = useLoginState();
    const {error} = loginState;
    return (
        <AuthPageWrapper>
            <AuthWrapper>
                <AuthHeader/>
                <AuthMainPageWrapper>
                    <LoginForm
                        history={history}
                        onSubmit={(values: { email: string, password: string }) => onSubmit({
                            values,
                            dispatch,
                            history,
                            invite
                        })}
                        hasError={error.message !== ""}
                    />
                </AuthMainPageWrapper>
            </AuthWrapper>
            <AuthFooter/>
        </AuthPageWrapper>
    );
}

export default Login;
