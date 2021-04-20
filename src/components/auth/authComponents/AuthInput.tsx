import React from "react";
import {FieldProps} from "formik";
import {AuthErrorText, AuthFieldWrapper, AuthInputField, AuthInputIconWrapper, AuthInputWrapper} from "./styles";
import MaterialIcon from "../../globals/MaterialIcons";

interface AuthInputProps extends FieldProps {
    inputIcon: string;
}

const AuthInput = ({
                       field,
                       inputIcon,
                       form,
                       ...props
                   }
                       : AuthInputProps
) => {
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <AuthFieldWrapper>
            <AuthInputWrapper>
                <AuthInputIconWrapper
                    error={error}
                >
                    <MaterialIcon iconName={inputIcon}/>
                </AuthInputIconWrapper>
                <AuthInputField
                    {...field}
                    {...props}
                />
            </AuthInputWrapper>
            <AuthErrorText>
                {error}
            </AuthErrorText>
        </AuthFieldWrapper>

    )
};

export default AuthInput