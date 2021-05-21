import React from "react"
import {DropdownElementWrapper, DropdownText, DropdownWrapper} from "./styles";
import MaterialIcon from "../MaterialIcons";
import {History} from "history"

export type DropdownElement = {
    text: string;
    icon?: string;
    topBorder?: boolean;
    customColor?: string;
    onClick: () => void;
}
type DropdownProps = {
    elements: DropdownElement[];
    id: string;
    history: History
}

const Dropdown = ({
                      elements,
                      id,
                      history
                  }
                      :
                      DropdownProps
) => {

    return (
        <DropdownWrapper id={id}>
            {
                elements.map(element =>
                    <DropdownElementWrapper
                        key={id}
                        id={id}
                        topBorder={element.topBorder}
                        onClick={element.onClick}
                    >
                        {
                            element.icon &&
                            <DropdownText id={id} customColor={element.customColor} boldText>
                                <MaterialIcon iconName={element.icon}/>
                            </DropdownText>
                        }
                        <DropdownText id={id} customColor={element.customColor} boldText>
                            {element.text}
                        </DropdownText>
                    </DropdownElementWrapper>
                )
            }
        </DropdownWrapper>
    )
};

export default Dropdown