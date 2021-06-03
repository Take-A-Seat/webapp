import React from "react";
import Loader from "react-loader-spinner";
import {CenterContainerLogo} from "./style";

export const LoaderComponent = () => {
    return (
        <CenterContainerLogo>
            <Loader
                type="TailSpin"
                color="#596ef7"
                height={85}
                width={85}
                timeout={4000} //3 secs
            /></CenterContainerLogo>
    )
}