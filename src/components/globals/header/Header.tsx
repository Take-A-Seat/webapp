import React, {useEffect} from "react";
import "./style"
import {History} from "history";
import {DropdownElement} from "../dropdown/Dropdown";
import {withRouter} from "react-router-dom";
import {
    HeaderAccountSection,
    HeaderElement,
    HeaderElementText,
    HeaderLinks,
    HeaderText,
    HeaderWrapper,
    LogoWrapper
} from "./style";
import Logo from "../../../assets/Asset 5 (1).svg"
import {useLoginDispatch, useLoginState} from "../../auth/AuthContext";
import {getLoggedUser} from "../../auth/AuthActions";
import {VerticalDelimitator} from "../GlobalStyles";
import {logout} from "../../../helpers/createAuthProvider";

const Header = ({history}: { history: History }) => {
    const authState = useLoginState();
    const {loggedUser, isAuthenticated} = authState;
    const authDispatch = useLoginDispatch();

    useEffect(() => {
        getLoggedUser({dispatch: authDispatch})
    }, [isAuthenticated])

    const dropdownElements: DropdownElement[] = [{
        text: "Cont",
        icon: "launch",
        onClick: () => {
            history.push("/account")
        }
    }, {
        text: "Invitații",
        icon: "group",
        onClick: () => {
            history.push("/associations/invites")
        }
    }];

    const linkElements = [{
        name: "DashBoard",
        link: "/dashboard"
    }, {
        name: "Activity",
        link: "/activity"
    }, {
        name: "Overview",
        link: "/overview"
    }, {
        name: "Campaign",
        link: "/campaign"
    }, {
        name: "Insights",
        link: "/insights"
    }, {
        name: "Products",
        link: "/products"
    }, {
        name: "Settings",
        link: "/settings/restaurant"
    },]
    return (
        <HeaderWrapper>

            <LogoWrapper onClick={() => {
                history.push("/dashboard")
            }}>
                <img src={Logo} alt={"Logo"}/>
            </LogoWrapper>

            <HeaderLinks>
                {linkElements.map((item, index) => {
                    return <HeaderElement to={item.link} key={index} exact={true}>
                        <HeaderElementText>
                            {item.name}
                        </HeaderElementText>
                    </HeaderElement>
                })}
            </HeaderLinks>

            <HeaderAccountSection>
                {loggedUser && loggedUser.Email ? loggedUser.Email : ""}
                <VerticalDelimitator/>
                <HeaderText logout onClick={() => logout(
                    () => {
                        history.push("/auth/login")
                    }
                )}>
                    Deconectare
                </HeaderText>
            </HeaderAccountSection>
        </HeaderWrapper>
    )
}

export default withRouter(Header)