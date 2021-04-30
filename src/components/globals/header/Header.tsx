import React from "react";
import "./style"
import {History} from "history";
import {DropdownElement} from "../dropdown/Dropdown";
import {withRouter} from "react-router-dom";
import {HeaderWrapper, LogoWrapper} from "./style";
import Logo from "../../../assets/logoRegular.png"

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
    return (
        <HeaderWrapper>
            DashBoar
            <LogoWrapper onClick={() => {
                history.push("/")
            }}>
                <img src={Logo} alt={"Logo"}/>
            </LogoWrapper>

            Settings
        </HeaderWrapper>
    )
}

export default withRouter(Header)