import React from "react";
import {FieldLabel, FieldWrapper, SwitchStyle} from "./style";
import Switch from "react-switch";
import {ORANGE_POINT_SWITCH} from "../../../constants/styleConstants";

interface SwitchFieldProps {
    labelText: string,
    checked: boolean,
    onChange: any
}

const SwitchField = ({
                         labelText,
                         checked,
                         onChange
                     }: SwitchFieldProps) => {
    return (
        <FieldWrapper isSwitch>
            <FieldLabel
            >
                {labelText}
            </FieldLabel>
            <SwitchStyle>
                <Switch checked={checked} onChange={(checked) => onChange(checked)}
                        onColor="#FFFFFF"
                        offColor="#FFFFFF"
                        onHandleColor={ORANGE_POINT_SWITCH}
                        offHandleColor="#C7CDD4"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={25}
                        width={55}
                />
            </SwitchStyle>
        </FieldWrapper>
    )
}
export default SwitchField