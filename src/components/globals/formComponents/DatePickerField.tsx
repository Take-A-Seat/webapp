import React, {useState} from 'react'
import {FieldProps} from "formik";
import {DatePickerWrapper, FieldError, FieldLabel, FieldWrapper} from "./style";
import {SingleDatePicker} from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment'

interface DatePickerFieldProps extends FieldProps {
    labelText: string;
    minDate?: string;
    maxDate?: string;
    smallFields?: boolean;
    onChangeExtra?: (date: moment.Moment | null) => void;
    specificFormat?: boolean;
    big?: boolean;
    noBorder?: boolean;
    customWidth?: any;
    customPadding?: any;
    withoutMarginBottom?: boolean;
    customMarginRight?:any;
}

const DatePickerField = ({
                             labelText,
                             field,
                             form,
                             meta,
                             specificFormat,
                             minDate,
                             maxDate,
                             noBorder,
                             smallFields,
                             onChangeExtra,
                             big,
                             customWidth,
                             withoutMarginBottom,
                             customPadding,
                             customMarginRight
                         }:
                             DatePickerFieldProps
) => {
    const [showCalendar, setShowCalendar] = useState<boolean | null>(false);
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper smallFields={smallFields} noBorder={noBorder} customWidth={customWidth}
                      customMarginRight={customMarginRight}
                      customPadding={customPadding} withoutMarginBottom={withoutMarginBottom}>
            <FieldLabel title customPaddingRight={"10px"}
                        error={!!error}
            >
                {labelText}
            </FieldLabel>
            <DatePickerWrapper
                error={error}
                big={big}
            >
                <SingleDatePicker

                    date={moment(field.value, specificFormat ? "YYYY-MM-DD" : "")}
                    onDateChange={(date) => {
                        if (date) {
                            if (specificFormat) {
                                form.setFieldValue(field.name, date.format("YYYY-MM-DD"))
                            } else {
                                form.setFieldValue(field.name, date.utc());
                            }
                        }
                        if (onChangeExtra) {
                            if (date) {
                                if (specificFormat) {
                                    // @ts-ignore
                                    onChangeExtra(date.format("YYYY-MM-DD"))
                                } else {
                                    onChangeExtra(date.utc())
                                }
                            }
                        }
                    }}
                    // @ts-ignore
                    focused={showCalendar}
                    onFocusChange={({focused}) => setShowCalendar(focused)}
                    id={`id-datePicker-${field.name}`}
                    displayFormat={() => "DD.MM.YYYY"}
                    // @ts-ignore
                    isOutsideRange={date => minDate && date.isBefore(minDate) || maxDate && date.isAfter(maxDate)}
                    noBorder={true}
                    numberOfMonths={1}
                    vertical={true}
                />
            </DatePickerWrapper>

            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
};

export default DatePickerField
