import {Field, Formik} from "formik";
import React, {useCallback, useState} from "react";
import {FieldError, FormWrapper} from "../../globals/formComponents/style";
import TextField from "../../globals/formComponents/TextField";
import {AreaWithTables, useReservationsState} from "../ReservationsContext";
import {AvailableTables} from "../form/AvaialbeTables";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import * as Yup from "yup";
import {ColumnContainer} from "../form/style";
import {LoaderComponent} from "../../globals/Loading/Loader";

type AcceptReservationProps = {
    initialValues: any;
    onSubmit: (values: any) => void;
    cancel: () => void;
    listAvailableTables: AreaWithTables[];
}

const validationSchema = Yup.object().shape({
    tableId: Yup.array().min(1).required("Req")
});
export const AcceptReservation = ({onSubmit, initialValues, listAvailableTables, cancel}: AcceptReservationProps) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const {loading} = useReservationsState();
    return (<Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}>
        {
            ({values, handleSubmit}) => {
                function clickTable(tableId: string) {
                    let findIndex = values.tableId.findIndex((id: string) => id == tableId)
                    if (findIndex == -1) {
                        values.tableId.push(tableId)
                    } else {
                        values.tableId.splice(findIndex, 1)
                    }
                    forceUpdate()
                }

                return <FormWrapper
                    onSubmit={handleSubmit}>
                    {!loading ? <> <AvailableTables
                            selectedTable={values.tableId}
                            clickTable={(id) => {
                                clickTable(id)
                            }}
                            listTables={listAvailableTables}/> {values.tableId.length == 0 ?
                        <FieldError alignedLeft alignedCenter>Select a table</FieldError> : null}</> :
                        <ColumnContainer customHeight={"200px"}><LoaderComponent/></ColumnContainer>}


                    <Field name={"messageToClient"} column={true} textArea={true} customMaxWidth={"100%"}
                           customWidthInput={"100%"} alignRight
                           customHeight={"100px"} component={TextField} labelText={"Message"}/>
                    <Wrapper>
                        {cancel && <Button
                            onClick={() => {
                                cancel()
                            }} cancelButton>
                            <MaterialIcon iconName={"cancel"}/>
                            Cancel
                        </Button>}
                        <Button
                            alignedLeft
                            onClick={() => {
                                if (values.tableId.length > 0) {
                                    onSubmit(values)
                                }
                            }}
                            blueButton>
                            <MaterialIcon iconName={"save"}/>Accept reservation</Button>

                    </Wrapper>
                </FormWrapper>
            }
        }
    </Formik>)
}