import React, {useCallback, useState} from "react";
import {Field, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../globals/formComponents/style";
import {ProgramFormValueType} from "./RestaurantSettingsForm";
import {getDayNameByNumber} from "../../../helpers/sharedFunctions";
import TimePicker from "rc-time-picker";
// import 'rc-time-picker/assets/index.tsx';
import moment from "moment";
import {Table, TableBody, TableColumn, TableHead, TableRow, TableText} from "../../globals/TableStyles";
import SwitchField from "../../globals/formComponents/SwitchField";
import "../timePiker.css"

type ProgramFormTypes = {
    name: string,
    helpers: FieldArrayRenderProps
}


export const ProgramFieldArray = ({name, helpers}: ProgramFormTypes) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    return <FieldWrapper noBorder column alignCenter>
        <Table customWidth={"100%"}>
            <TableHead noPadding>
                <TableRow>
                    <TableColumn customFlex={"1.2"}>
                        <TableText whiteTextBold>
                            Day
                        </TableText>
                    </TableColumn>

                    <TableColumn customFlex={"1"}>
                        <TableText whiteTextBold>
                            Start At
                        </TableText>
                    </TableColumn>

                    <TableColumn customFlex={"1"}>
                        <TableText whiteTextBold>
                            End At
                        </TableText>
                    </TableColumn>

                    <TableColumn>
                        <TableText whiteTextBold>
                            Close
                        </TableText>
                    </TableColumn>
                </TableRow>
            </TableHead>
            <TableBody noBackground>
                <FieldWrapper noBorder>
                    {helpers.form.values[name] && helpers.form.values[name].map((element: ProgramFormValueType, index: number) => {

                        let momentStartDefault = helpers.form.values[name][index].startAt != "" ? moment(helpers.form.values[name][index].startAt, "LT") : undefined
                        let momentEndDefault = helpers.form.values[name][index].endAt != "" ? moment(helpers.form.values[name][index].endAt, "LT") : undefined
                        console.log("momentStartDefault", momentStartDefault)
                        let dayName = getDayNameByNumber(element.day)
                        return <TableRow key={index} withMargin>
                            <TableColumn customFlex={"1.2"}>
                                <TableText thead>
                                    {dayName}
                                </TableText>
                            </TableColumn>
                            <TableColumn customFlex={"1"}>
                                <TimePicker
                                    placeholder="Start At"
                                    use12Hours
                                    showSecond={false}
                                    focusOnOpen={true}
                                    clearText={"delete"}
                                    allowEmpty={false}
                                    minuteStep={15}
                                    disabled={helpers.form.values[name][index].close}
                                    format="hh:mm A"
                                    defaultValue={momentStartDefault && momentStartDefault}
                                    onChange={e => {
                                        console.log(e)
                                        if (e != null) {
                                            helpers.form.values[name][index].startAt = e.format("LT")
                                        }
                                    }}
                                />
                            </TableColumn>
                            <TableColumn customFlex={"1"}>
                                <TimePicker
                                    placeholder="End At"
                                    use12Hours
                                    showSecond={false}
                                    focusOnOpen={true}
                                    allowEmpty={false}
                                    minuteStep={15}
                                    clearText={"delete"}
                                    className={""}
                                    disabled={helpers.form.values[name][index].close}
                                    format="hh:mm A"
                                    defaultValue={momentEndDefault && momentEndDefault}
                                    onChange={e => {
                                        if (e != null) {
                                            helpers.form.values[name][index].endAt = e.format("LT")
                                        }
                                    }}
                                />
                            </TableColumn>

                            <TableColumn>
                                <Field name={`program[${index}].close`}
                                       component={SwitchField}
                                       noBorder={true}
                                       isSwitch={false}
                                       withoutMarginBottom={true}
                                       checked={helpers.form.values[name][index].close}
                                       onChange={(check: boolean) => {
                                           helpers.form.values[name][index].close = check;
                                           forceUpdate()
                                       }}
                                />
                            </TableColumn>

                        </TableRow>
                    })}
                </FieldWrapper>
            </TableBody>
        </Table>
    </FieldWrapper>
}
