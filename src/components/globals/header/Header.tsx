import React, {useEffect} from "react";
import {History} from "history";
import "../../home/style.css"
import {DropdownElement} from "../dropdown/Dropdown";
import {withRouter} from "react-router-dom";
import {
    HeaderAccountSection,
    HeaderElement,
    HeaderElementText,
    HeaderLinks,
    HeaderText,
    HeaderWrapper,
    LogoWrapper,
    StickyContainerHeader
} from "./style";
import Logo from "../../../assets/Asset 5 (1).svg"
import {useLoginDispatch, useLoginState} from "../../auth/AuthContext";
import {getLoggedUser} from "../../auth/AuthActions";
import {VerticalDelimitator} from "../GlobalStyles";
import {logout} from "../../../helpers/createAuthProvider";
import {slide as Menu} from "react-burger-menu";
import "./style.css"
import Collapsible from "react-collapsible";
import MaterialIcon from "../MaterialIcons";

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
        name: "Reservations",
        link: "/reservations"
    }, {
        name: "Settings",
        link: "/settings/restaurant",
        subLinks: [
            {
                name: "Restaurant",
                link: "/settings/restaurant"
            }, {
                name: "Tables",
                link: "/settings/tables/plan"
            }, {
                name: "Menu",
                link: "/settings/menu"
            }, {
                name: "Specific and Type",
                link: "/settings/specific&type"
            },
            {
                name: "Email",
                link: "/settings/email"
            }]
    },]

    return <>
        <HeaderWrapper displayNone>
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

        <StickyContainerHeader>
            <Menu width={"auto"}>
                <LogoWrapper onClick={() => {
                    history.push("/dashboard")
                }}>
                    <img src={Logo} alt={"Logo"}/>
                </LogoWrapper>
                <HeaderAccountSection>
                    <HeaderElementText
                        noHover>{loggedUser && loggedUser.Email ? loggedUser.Email : ""}</HeaderElementText>
                    <VerticalDelimitator/>
                    <HeaderText logout onClick={() => logout(
                        () => {
                            history.push("/auth/login")
                        }
                    )}>
                        Log out
                    </HeaderText>
                </HeaderAccountSection>
                <HeaderLinks>
                    {linkElements.map((item, index) => {
                        if (item.subLinks == undefined) {
                            return <HeaderElement to={item.link} key={index} exact={true}>
                                <HeaderElementText>
                                    {item.name}
                                </HeaderElementText>
                            </HeaderElement>
                        } else {
                            return <>
                                <Collapsible key={index} open={true} transitionTime={350}
                                             trigger={[`${item.name}`,
                                                 // @ts-ignore
                                                 <MaterialIcon iconName={"expand_more"}/>]}>
                                    {
                                        item.subLinks.map((subLink, indexSublink) => {
                                            return <HeaderElement to={subLink.link} key={indexSublink} exact={true}>
                                                <HeaderElementText>
                                                    {subLink.name}
                                                </HeaderElementText>
                                            </HeaderElement>
                                        })
                                    }
                                </Collapsible>
                            </>
                        }

                    })}
                </HeaderLinks>
            </Menu>
        </StickyContainerHeader>
    </>
}

export default withRouter(Header)