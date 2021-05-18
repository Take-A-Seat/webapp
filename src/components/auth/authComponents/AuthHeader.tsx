import React from "react"
import {AuthHeaderLink, AuthHeaderLinksWrapper, AuthHeaderLogoWrapper, AuthHeaderWrapper} from "./styles";
import {Button} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import Logo from "../../../assets/Asset 5.svg"

const AuthHeader = () => {
    return (
        <AuthHeaderWrapper>
            <AuthHeaderLogoWrapper small >
                <img src={Logo} alt={"Logo footer"}/>
            </AuthHeaderLogoWrapper>
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
