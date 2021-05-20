import React from 'react'
import {PopupContentWrapper, PopupHeaderWrapper, PopupName, PopupWrapper} from "./styles";
import {ReactChildrenType} from "../../../constants/globalTypes";
import MaterialIcon from "../MaterialIcons";
import {HorizontalDelimiter} from "../GlobalStyles";

interface PopupProps extends ReactChildrenType {
    show: boolean;
    popupDetails: {
        title: string
    };
    onClose: () => void;
    withoutCloseIcon?: boolean;
    iconTitle?: string;
}

const Popup = ({show, popupDetails, onClose, withoutCloseIcon, children, iconTitle}: PopupProps) => {
    if (show) {
        return (
            <PopupWrapper>
                <PopupContentWrapper>
                    <PopupHeaderWrapper>
                        <PopupName>
                            {iconTitle && <MaterialIcon iconName={iconTitle}/>}
                            {popupDetails.title}
                        </PopupName>
                        {
                            !withoutCloseIcon &&
                            <PopupName
                                closeIcon
                                onClick={onClose}
                            >
                                <MaterialIcon iconName={"close"}/>
                            </PopupName>
                        }

                    </PopupHeaderWrapper>
                    {children}
                </PopupContentWrapper>
            </PopupWrapper>
        )
    } else {
        return (
            <></>
        )
    }
};

export default Popup
