import React from "react";
import "./style"
import {History} from "history";
import {DropdownElement} from "../dropdown/Dropdown";
import {withRouter} from "react-router-dom";
import {HeaderAccountSection, HeaderElement, HeaderElementText, HeaderLinks, HeaderWrapper, LogoWrapper} from "./style";
import Logo from "../../../assets/Asset 5 (1).svg"

const Header = ({history}: { history: History }) => {
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
        link: "/settings"
    },]
    return (
        <HeaderWrapper>

            <LogoWrapper onClick={() => {
                history.push("/")
            }}>
                <img src={Logo} alt={"Logo"}/>
            </LogoWrapper>

            <HeaderLinks>
                {linkElements.map((item,index) => {
                    return <HeaderElement to={item.link} key={index}>
                        <HeaderElementText>
                            {item.name}
                        </HeaderElementText>
                    </HeaderElement>
                })}
            </HeaderLinks>

            <HeaderAccountSection>
                Email
                @
            </HeaderAccountSection>
        </HeaderWrapper>
    )
}

export default withRouter(Header)