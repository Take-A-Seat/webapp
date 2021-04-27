import React from "react";
import "./style"
import {History} from "history";
import {DropdownElement} from "../dropdown/Dropdown";
import {withRouter} from "react-router-dom";

const Header=({history}:{history:History})=>{
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
    return(
        <>
        Mare header
        </>
    )
}

export default withRouter(Header)