import React from "react";
import {
    ContainerButtons,
    ContainerItems,
    DeleteIconCircle,
    DescriptionDelete,
    ItemLose,
    PopupDeleteContentWrapper,
    PopupDeleteWrapper,
    TitleDelete
} from "./style";
import MaterialIcon from "../MaterialIcons";
import {Button, Wrapper} from "../GlobalStyles";


type DeletePopUpProps = {
    title: string;
    textDeleteButton: string;
    deleteFunction: () => void;
    whatDelete: string[];
    cancelFunction: () => void;
    show: boolean;

}

export const DeletePopup = ({
                                title,
                                textDeleteButton,
                                deleteFunction,
                                whatDelete,
                                cancelFunction,
                                show,

                            }: DeletePopUpProps) => {

    if (show) {
        return <PopupDeleteWrapper>
            <PopupDeleteContentWrapper>
                <DeleteIconCircle> <MaterialIcon iconName={"delete"}/></DeleteIconCircle>
                <TitleDelete>{title}</TitleDelete>
                <DescriptionDelete>You'll permanently lose your:</DescriptionDelete>
                <ContainerItems>
                    {whatDelete.map((item) => {
                        return <ItemLose>-{item}</ItemLose>
                    })}</ContainerItems>
                <ContainerButtons>
                    <Button customWidth={"180px"} customMarginRight={"10px"} cancelButtonDelete alignedLeft
                            onClick={() => cancelFunction()}>Cancel</Button>
                    <Button customWidth={"180px"} customMarginRight={"0"} deleteButton alignedRight
                            onClick={() => deleteFunction()}>{textDeleteButton}</Button>
                </ContainerButtons>

            </PopupDeleteContentWrapper>
        </PopupDeleteWrapper>
    } else {
        return <></>
    }

}