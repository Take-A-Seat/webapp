import React from "react"
import {AuthHeaderLink, AuthHeaderLinksWrapper, AuthHeaderWrapper} from "./styles";
import {Button} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";

const AuthHeader = () => {
    return (
        <AuthHeaderWrapper>

            <AuthHeaderLinksWrapper>
                <AuthHeaderLink firstItem>Cine suntem</AuthHeaderLink>
                <AuthHeaderLink>Servicii oferite</AuthHeaderLink>
                <AuthHeaderLink>Intrebări frecvente</AuthHeaderLink>
                <AuthHeaderLink>Contact</AuthHeaderLink>
                <Button blueButton>
                    <MaterialIcon iconName={"person"}/>
                    Contul tău
                </Button>
            </AuthHeaderLinksWrapper>
        </AuthHeaderWrapper>
    )
};

export default AuthHeader
