import React, {RefObject, useEffect, useRef, useState} from "react"
import {ActionsWrapper} from "./styles";
import MaterialIcon from "../MaterialIcons";
import Dropdown, {DropdownElement} from "./Dropdown";
import {History} from "history"

type ContextualMenuProps = {
    id: string;
    dropdownElements: DropdownElement[];
    history: History;
    icon: string;
    alignToRight?: boolean;
}

const ContextualMenu = ({
                            id,
                            dropdownElements,
                            history,
                            icon,
                            alignToRight
                        }
                            :
                            ContextualMenuProps
) => {
    const useOutsideFunction = (ref: RefObject<HTMLDivElement>) => {
        useEffect(() => {
            function handleClickOutside(this: Document, ev: MouseEvent) {
                const target = ev.target as HTMLDivElement;
                if (ref.current && !ref.current.contains(target)) {
                    setShowDropdown(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    };
    const wrapperRef = useRef(null);
    useOutsideFunction(wrapperRef);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <ActionsWrapper
            greyColor={icon == "keyboard_arrow_down"}
            ref={wrapperRef}
            onClick={() => setShowDropdown(!showDropdown)}
            id={id}
            alignToRight={alignToRight}
        >
            <MaterialIcon iconName={icon ? icon : "more_vert"} id={id}/>
            {
                showDropdown &&
                <Dropdown
                    elements={dropdownElements}
                    id={id}
                    history={history}
                />
            }
        </ActionsWrapper>
    )
};

export default ContextualMenu