import React, {useCallback, useState} from "react";
import {Field, FieldArrayRenderProps} from "formik";
import {FieldWrapper} from "../../../globals/formComponents/style";
import TextField from "../../../globals/formComponents/TextField";
import {Button, Wrapper} from "../../../globals/GlobalStyles";
import {Table, TableBody, TableColumn, TableHead, TableRow, TableText} from "../../../globals/TableStyles";
import MaterialIcon from "../../../globals/MaterialIcons";
import {DeletePopup} from "../../../globals/deletePopup/DeletePopUp";

export type ProductFormValuesTypes = {
    id: string;
    name: string;
    ingredients: string;
    price: number;
}

type ProductsFormProps = {
    name: string;
    indexPage: number;
    indexSection: number;
    deleteCall?: () => void;
    helpers: FieldArrayRenderProps;
}

export const ProductsFieldArray = ({helpers, indexSection, indexPage, deleteCall}: ProductsFormProps) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [showPopup, setPopup] = useState({show: false, index: -1})

    return <>
        <Table customWidth={"100%"}>
            <TableHead noPadding>
                <TableRow>
                    <TableColumn customWidth={"20%"}>
                        <TableText thead>
                            Name
                        </TableText>
                    </TableColumn>

                    <TableColumn customWidth={"50%"}>
                        <TableText thead>
                            Ingredients
                        </TableText>
                    </TableColumn>

                    <TableColumn customWidth={"10%"}>
                        <TableText thead>
                            Price
                        </TableText>
                    </TableColumn>
                    <TableColumn customWidth={"10%"}/>
                </TableRow>
            </TableHead>
            <TableBody noBackground>
                <FieldWrapper noBorder>
                    {
                        helpers.form.values &&
                        helpers.form.values.pages[indexPage].sections[indexSection].products.map((element: ProductFormValuesTypes, index: number) => {
                            return <TableRow key={element.id}>
                                <TableColumn customWidth={"20%"}>
                                    <Field name={`pages.${indexPage}.sections.${indexSection}.products.${index}.name`}
                                           type={"text"}
                                           noDescription={true}
                                           noBorder={true}
                                           component={TextField}
                                           placeholder={"Name product"}/>
                                </TableColumn>

                                <TableColumn customWidth={"50%"}>
                                    <Field
                                        name={`pages.${indexPage}.sections.${indexSection}.products.${index}.ingredients`}
                                        type={"text-area"}
                                        noDescription={true}
                                        component={TextField}
                                        customWidth={"100%"}

                                        noBorder={true}
                                        placeholder={"Ingredients"}/>
                                </TableColumn>

                                <TableColumn customWidth={"10%"}>
                                    <Field name={`pages.${indexPage}.sections.${indexSection}.products.${index}.price`}
                                           type={"number"}
                                           component={TextField}
                                           noDescription={true}
                                           customWidth={"100%"}
                                           noBorder={true}
                                           placeholder={"Price"}/>
                                </TableColumn>
                                <TableColumn customWidth={"10%"}>
                                    <Button
                                        customMarginBottom={"14px"}
                                        customMarginTop={"0px"}
                                        tertiaryButton
                                        alignedRight
                                        onClick={() => {
                                            setPopup({show: true, index: index})
                                        }}>
                                        <MaterialIcon iconName={"delete"}/>
                                        Delete
                                    </Button>
                                </TableColumn>
                            </TableRow>
                        })
                    }
                </FieldWrapper>
            </TableBody>
        </Table>

        <Wrapper customMarginTop={"50px"} flexStart wrap>
            <Button secondaryButton
                    alignedLeft
                    customMarginRight={"15px"}
                    onClick={() => {
                        helpers.form.values.pages[indexPage].sections[indexSection].products.push({
                            name: "",
                            ingredients: "",
                            price: 0

                        })
                        forceUpdate()
                    }}>
                <MaterialIcon iconName={"add"}/>
                Add product
            </Button>

            <Button
                alignedRight
                tertiaryButton
                customMarginRight={"15px"}
                onClick={() => {
                    if (deleteCall) {
                        deleteCall()
                    }
                }}><
                MaterialIcon iconName={"delete"}/>
                Delete Section
            </Button>
        </Wrapper>
        <DeletePopup
            show={showPopup.show}
            title={"Delete product?"}
            textDeleteButton={"Delete product"}
            deleteFunction={() => {
                helpers.form.values.pages[indexPage].sections[indexSection].products.splice(showPopup.index, 1)
                setPopup({show: false, index: -1})
            }}
            whatDelete={["product"]}
            cancelFunction={() => setPopup({show: false, index: -1})}/>
    </>

}