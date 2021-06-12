import React, {useCallback, useEffect, useState} from "react";
import {MenuFieldsValues} from "../../settings/menu/form/MenuForm";
import {
    ContainerListProducts,
    ContainerManageReservation,
    ContainerMenu,
    ContainerProduct,
    ContainerTotal,
    DescriptionProduct,
    PageMenu,
    Product,
    ProductContainerListing,
    RowContainerNoJustify,
    TitleProduct
} from "./style";
import Collapsible from "react-collapsible";
import MaterialIcon from "../../globals/MaterialIcons";
import _ from "lodash";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import {ColumnContainer} from "../../globals/formComponents/style";
import {ProductFormValuesTypes} from "../../settings/menu/form/ProductsFieldArray";
import {DeletePopup} from "../../globals/deletePopup/DeletePopUp";
import {setupWebSocket, useReservationsDispatch} from "../ReservationsContext";

type ManageReservationProps = {
    cancel: () => void;
    onSubmit: (values: any) => void;
    initialValues: any;
    menu: MenuFieldsValues;
}


const ManageReservation = ({cancel, onSubmit, initialValues, menu}: ManageReservationProps) => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [showPopupDelete, setShowPopup] = useState({show: false, index: -1, name: ""});


    function addProduct(product: ProductFormValuesTypes) {
        if (initialValues.products == undefined) {
            initialValues.products = []
        }
        initialValues.products.push({
            id: product.id,
            name: product.name,
            ingredients: product.ingredients,
            price: product.price,
            status: "New"
        })
        initialValues.totalToPay += product.price;
        forceUpdate()
    }

    function confirmReadAll() {
        initialValues.products.forEach((product: any, index: number) => {
            if (product.status === "New") {
                initialValues.products[index].status = "Read";
            }
        });
        forceUpdate()
    }

    function confirmDoneAll() {
        initialValues.products.forEach((product: any, index: number) => {
            if (product.status === "Read") {
                initialValues.products[index].status = "Done";
            }
        });
        forceUpdate()
    }


    function removeProductFromArray(index: number) {
        initialValues.totalToPay -= initialValues.products[index].price;
        initialValues.totalToPay = Number(initialValues.totalToPay.toFixed(2));
        initialValues.products.splice(index, 1)
        forceUpdate()
    }

    let findNewProductIndex = initialValues.products && !_.isEmpty(initialValues.products) ? initialValues.products.findIndex((product: any) => product.status == "New") : -1
    let findReadProductIndex = initialValues.products && !_.isEmpty(initialValues.products) ? initialValues.products.findIndex((product: any) => product.status == "Read") : -1
    return <ColumnContainer>
        <ContainerManageReservation>
            <ContainerMenu>
                {
                    menu && !_.isEmpty(menu) && menu.pages.map((page: any, indexPage: number) => {
                        return (<PageMenu key={indexPage}>
                            {
                                page.sections.map((section: any, indexSection: number) => {
                                    return <Collapsible key={indexSection} transitionTime={200}
                                                        trigger={[`${section.titleSection}`,
                                                            // @ts-ignore
                                                            <MaterialIcon iconName={"expand_more"}/>]}>
                                        {
                                            section.products.map((product: any, indexProduct: number) => {
                                                return <ContainerProduct key={indexProduct}>
                                                    <ColumnContainer>
                                                        <TitleProduct>{product.name} - {product.price} $ </TitleProduct>
                                                        <DescriptionProduct>{product.ingredients}</DescriptionProduct>
                                                    </ColumnContainer>
                                                    <Button
                                                        customMarginRight={"0"}
                                                        circle
                                                        blueButton
                                                        onClick={() => {
                                                            // console.log(product)
                                                            addProduct(product)
                                                        }}><MaterialIcon iconName={"add"}/></Button>
                                                </ContainerProduct>
                                            })
                                        }
                                    </Collapsible>
                                })
                            }
                        </PageMenu>)
                    })
                }
            </ContainerMenu>
            <ContainerListProducts>
                {initialValues.products && !_.isEmpty(initialValues.products) && initialValues.products.map((productFromList: any, index: number) => {
                    return <ProductContainerListing>
                        <Product customWidth={"250px"}>
                            {productFromList.name} - {productFromList.price}$
                        </Product>
                        {productFromList.status == "New" ? <Button
                            secondaryButton
                            noMarginIcon
                            customMarginRight={"10px"}
                            onClick={() => {
                                initialValues.products[index].status = "Read";
                                forceUpdate();
                            }}>
                            Confirm
                        </Button> : null}

                        {productFromList.status == "Read" ? <Button
                            tertiaryButton
                            noMarginIcon
                            greenBorder
                            customMarginRight={"10px"}
                            onClick={() => {
                                initialValues.products[index].status = "Done";
                                forceUpdate();
                            }}>
                            Done
                        </Button> : null}

                        <Button
                            tertiaryButton
                            noMarginIcon
                            customMarginRight={"0"}
                            onClick={() => {
                                setShowPopup({show: true, name: productFromList.name, index: index})
                            }}>
                            Delete
                        </Button>
                    </ProductContainerListing>
                })}
                <RowContainerNoJustify marginTop={"25px"}>
                    {
                        findNewProductIndex != -1 ? <Button secondaryButton
                                                            customMarginLeft={"50px"}
                                                            onClick={() => {
                                                                confirmReadAll()
                                                            }
                                                            }>
                            Confirm all
                        </Button> : null
                    }
                    {
                        findReadProductIndex != -1 ? <Button secondaryButton
                                                             greenBorder
                                                             customMarginLeft={"25px"}
                                                             alignedLeft onClick={() => {
                            confirmDoneAll()
                        }
                        }>
                            Done all
                        </Button> : null
                    }
                </RowContainerNoJustify>

            </ContainerListProducts>
        </ContainerManageReservation>
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
                    onSubmit(initialValues);
                }}
                blueButton>
                <MaterialIcon iconName={"save"}/>Save</Button>
            <ContainerTotal>Total:{initialValues.totalToPay}$</ContainerTotal>
        </Wrapper>

        <DeletePopup
            show={showPopupDelete.show}
            title={"Delete product?"}
            textDeleteButton={"Delete product"}
            deleteFunction={() => {
                setShowPopup({...showPopupDelete, show: false})
                removeProductFromArray(showPopupDelete.index)
            }}
            whatDelete={[showPopupDelete.name]}
            cancelFunction={() => setShowPopup({...showPopupDelete, show: false})}/>
    </ColumnContainer>
}

export default ManageReservation;