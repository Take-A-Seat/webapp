import React from "react";
import "../../globals/header/style"
import {History} from "history";
import {withRouter} from "react-router-dom";
import {HeaderElement, HeaderElementSettings, HeaderElementText, HeaderLinks, HeaderWrapper} from "../../globals/header/style";

const HeaderSettings = ({history}: { history: History }) => {
    const linkElements = [
        {
            name: "Restaurant",
            link: "/settings/restaurant"
        }, {
            name: "Tables",
            link: "/settings/tables/plan"
        }, {
            name: "Menu",
            link: "/settings/menu"
        },{
            name: "Setup",
            link: "/settings/setup"
        },
         {
            name: "Email",
            link: "/settings/email"
        }]
    return (
        <HeaderWrapper settings>
            <HeaderLinks>
                {linkElements.map((item, index) => {
                    return <HeaderElementSettings to={item.link} key={index}  >
                        <HeaderElementText settings>
                            {item.name}
                        </HeaderElementText>
                    </HeaderElementSettings>
                })}
            </HeaderLinks>

        </HeaderWrapper>
    )
}

export default withRouter(HeaderSettings)