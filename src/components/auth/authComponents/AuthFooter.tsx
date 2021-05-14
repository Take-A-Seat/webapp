import React from "react"
import {
    AuthFooterElement,
    AuthFooterWrapper,
    AuthHeaderLink,
    AuthHeaderLinksWrapper,
    FooterElementText
} from "./styles";

const AuthFooter = () => {
    return (
        <AuthFooterWrapper>
            <AuthFooterElement topElement>

                <AuthHeaderLinksWrapper>
                    <AuthHeaderLink firstItem>Cine suntem</AuthHeaderLink>
                    <AuthHeaderLink>Servicii oferite</AuthHeaderLink>
                    <AuthHeaderLink>Intrebări frecvente</AuthHeaderLink>
                    <AuthHeaderLink>Contact</AuthHeaderLink>

                </AuthHeaderLinksWrapper>
            </AuthFooterElement>
            <AuthFooterElement bottomElement>
                <FooterElementText>
                    © 2020 Professional Administrator Service.
                </FooterElementText>
            </AuthFooterElement>

        </AuthFooterWrapper>
    )
};

export default AuthFooter
