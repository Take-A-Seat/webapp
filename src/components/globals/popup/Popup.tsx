import React from 'react'
import {PopupContentWrapper, PopupHeaderWrapper, PopupName, PopupText, PopupWrapper} from "./styles";
import {ReactChildrenType} from "../../../constants/globalTypes";
import MaterialIcon from "../MaterialIcons";
import {HorizontalDelimiter} from "../GlobalStyles";

interface PopupProps extends ReactChildrenType {
    show: boolean;
    popupDetails?: {
        title: string
    };
    onClose?: () => void;
    withoutCloseIcon?: boolean;
    iconTitle?: string;
    customMaxWidth?:string;
    customWidth?:string;
}

const Popup = ({show, popupDetails, onClose, withoutCloseIcon, children, iconTitle,customMaxWidth,customWidth}: PopupProps) => {
    if (show) {
        return (
            <PopupWrapper>
                <PopupContentWrapper customMaxWidth={customMaxWidth} customWidth={customWidth}>
                    <PopupHeaderWrapper>
                        {popupDetails &&<PopupName>
                            {iconTitle && <MaterialIcon iconName={iconTitle}/>}
                            <PopupText>
                                {popupDetails.title}
                            </PopupText>
                        </PopupName>}
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
