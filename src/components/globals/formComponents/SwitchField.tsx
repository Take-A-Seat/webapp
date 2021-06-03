import React, {useState} from "react";
import {FieldLabel, FieldWrapper, SwitchStyle} from "./style";
import Switch from "react-switch";
import {ORANGE_POINT_SWITCH} from "../../../constants/styleConstants";

interface SwitchFieldProps {
    labelText?: string,
    checked: boolean,
    onChange: any,
    noBorder?: boolean,
    isSwitch?: boolean,
    withoutMarginBottom?: boolean
    customWidth?: string;
}

const SwitchField = ({
                         labelText,
                         checked,
                         onChange,
                         noBorder,
                         isSwitch,
                         withoutMarginBottom,
                         customWidth
                     }: SwitchFieldProps) => {
    const [checkState, setCheck] = useState(checked);
    return (
        <FieldWrapper isSwitch={isSwitch} noBorder={noBorder} withoutMarginBottom={withoutMarginBottom}
                      customWidth={customWidth}>
            {labelText && <FieldLabel title
            >
                {labelText}
            </FieldLabel>}
            <SwitchStyle noBorder={noBorder}>
                <Switch checked={checkState} onChange={(checked) => {
                    setCheck(checked)
                    onChange(checked)
                }}
                        onColor="#FFFFFF"
                        offColor="#FFFFFF"
                        onHandleColor={ORANGE_POINT_SWITCH}
                        offHandleColor="#C7CDD4"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={23}
                        width={55}
                />
            </SwitchStyle>
        </FieldWrapper>
    )
}
export default SwitchField