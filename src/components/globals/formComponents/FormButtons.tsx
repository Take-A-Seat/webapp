import React from 'react'
import {FormButtonsWrapper} from "./style";
import {Button, SubmitButton} from "../GlobalStyles";
import MaterialIcon from "../MaterialIcons";

type FormButtonsProps = {
    showPreviousButton: boolean;
    previousStep: (() => void) | null;
    isSubmit: boolean;
    customWidth?: string;
    style?: {};
    previousButtonText?: string;
    submitText?: string;
    alignedRight?: boolean;
    isSubmitting?: boolean;
}

const FormButtons = ({
                         showPreviousButton,
                         previousStep,
                         isSubmit,
                         customWidth,
                         style,
                         previousButtonText,
                         alignedRight,
                         submitText,
                         isSubmitting
                     }:
                         FormButtonsProps
) => {
    return (
        <FormButtonsWrapper
            customWidth={customWidth}
            style={style}
        >
            <SubmitButton
                type={'submit'}
                alignedRight={alignedRight}
                disabled={isSubmit && isSubmitting}
            >
                <MaterialIcon iconName={"save"}/>
                {
                    isSubmit ?
                        submitText ?
                            submitText
                            :
                            'Salveaza'
                        :
                        'Pasul urmator'
                }
            </SubmitButton>

            {
                showPreviousButton && previousStep &&
                <Button
                    type={"button"}
                    secondaryButton
                    onClick={() => previousStep()}
                >
                    <MaterialIcon iconName={"cancel"}/>
                    {
                        previousButtonText || "Anulează"
                    }
                </Button>
            }
        </FormButtonsWrapper>
    )
};

export default FormButtons
