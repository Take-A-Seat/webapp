import styled from 'styled-components'
import {Button, Input} from 'reactstrap';
import {
  BIG_FONT_SIZE,
  BORDER_INPUT,
  BORDER_SWITCH, INPUT_PLACEHOLDER,
  NORMAL_FONT_SIZE,
  ORANGE_COLOR,
  RED_COLOR,
  VERY_DARK_GREY_COLOR,
  WHITE_COLOR
} from "../../../constants/styleConstants";

export const FormWrapper = styled.form<any>`
  width: 35%;
  height: 100%;
  display: flex;
  ${({isSwitch}) => isSwitch && `
       width:20%;
       margin-left:6%;
    `}
  ${({isCounter}) => isCounter && `
       width:50%;
       margin-left:5%;
    `}
  flex-direction: column;
  ${({inRow}) => inRow && `
        flex-direction:row;
    `}
  ${({big}) => big && `
        width:100%;
    `}
  ${({customWidth}) => customWidth && `
        width:${customWidth};
    `}
`;

export const FieldsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-right: 20px;
`;

export const CounterField = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid ${BORDER_INPUT};
  border-radius: 4px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #32325d;
  margin-bottom: 20px;
`;


export const FieldWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
  ${({fitContentWidth}) => fitContentWidth && `
        width:fit-content;
        margin-right:15px;
    `}
  ${({customWidth}) => customWidth && `
        width:${customWidth};
        margin-right:15px;
    `}
  ${({checkBoxMargin}) => checkBoxMargin && `
    margin-bottom:5px;
    `}
  ${({withoutMarginBottom}) => withoutMarginBottom && `
        margin-bottom:0;
    `}
  ${({isSwitch}) => isSwitch && `
        margin-top:5px;
        margin-bottom:25px;
    `}
  ${({error}) => error && `
        flex-direction:column;
    `}
  ${({column}) => column && `
        flex-direction:column;
    `}
  ${({alignCenter}) => alignCenter && `
        align-item:center;
    `}
  ${({smallFields}) => smallFields && `
        width:35%!important;
    `}
  ${({flexStart}) => flexStart && `
        align-items:flex-start;
    `}
`;


export const PageContent = styled.div<any>`
  display: flex;
  flex-direction: row;
  ${({wrap}) => wrap && `
        flex-wrap:wrap;
    `}
  ${({column}) => column && `
        flex-direction:column;
    `}

`


export const SwitchStyle = styled.div`
  border: 1px solid ${BORDER_SWITCH};
  border-radius: 20px;
  height: fit-content;
  display: flex;
  align-items: center;
`


export const FieldText = styled.div<any>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${({flexColumn}) => flexColumn && `
            flex-direction:column;
        `}
`

export const FieldLabel = styled.p<any>`
  font-size: 16px;
  color: ${VERY_DARK_GREY_COLOR};
  line-height: 1.9;
  text-align: left;
  margin: 0;
  align-items: center;
  ${({error}) => error && `
        color:${RED_COLOR};
    `}
  ${({marginBottom}) => marginBottom && `
    margin-bottom:${marginBottom};
    `}
`;

export const FieldError = styled.p<any>`
  margin-top: 5px;
  font-size: 12px;
  color: red;
  font-weight: bold;
  align-self: flex-end;
  ${({alignLeft}) => alignLeft && `
        align-self:flex-start;
    `}
`;

export const FormButtonsWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  ${({customWidth}) => customWidth && `
        width:${customWidth};
    `}
  margin-top: auto;
  ${({customMarginTop}) => customMarginTop && `
        margin-top:${customMarginTop};
    `}
`;

export const FormIconButton = styled.div`
  margin-left: 10px;
  cursor: pointer;

  & i {
    font-size: 20px;
  }

  ${({color}) => color && `
        color:${color};
    `}
`

export const FormSubmitButton = styled(Button)`
  background: #4caf50;
  border-color: #4caf50;
  color: white;
  margin-left: auto !important;

  :hover {
    background-color: #218838;
    border-color: #1e7e34;
    color: white;
  }
`;

export const FormBackButton = styled(Button)`
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;

  :hover {
    background-color: #5a6268;
    border-color: #545b62;
    color: white;
  }
`;
export const InputsWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  display: flex;
  align-items: center;
`;
export const CustomStyledInput = styled.input<any>`
  color: ${VERY_DARK_GREY_COLOR} !important;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  height: 44px;
  width: 60%;
  border: 1px solid ${BORDER_INPUT};
  border-radius: 4px;
  padding: 15px;
  margin-left: auto;
  font-weight: bold;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${INPUT_PLACEHOLDER};
    font-style: italic;
  }

  :-ms-input-placeholder {
    color: ${BORDER_INPUT};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  ${({error}) => error && `
        border:1px solid red!important;
    `}

  ${({customWidth}) => customWidth && `
        width:${customWidth};
    `}
  ${({customInputWidth}) => customInputWidth && `
        width:${customInputWidth};
    `}

  ${({customMarginLeft}) => customMarginLeft && `
        margin-left:${customMarginLeft};
    `}
  ${({customMarginBottom}) => customMarginBottom && `
        
    `}
  ${({biggerInput}) => biggerInput && `
        width:90%;
    `}
  ${({disabled}) => disabled && `
        background-color: hsl(0,0%,95%);
        border-color: hsl(0,0%,90%);
    `}
`;


export const CustomStyledDiv = styled.div<any>`
  color: ${VERY_DARK_GREY_COLOR} !important;
  font-size: 16px;
  line-height: 1.6;
  text-align: left;
  width: 60%;
  margin-left: auto;


  ${({error}) => error && `
        border:1px solid red!important;
    `}
`;

export const InputDivider = styled.div`
  border-left: 1px solid lightgray;
  height: 20px;
`
export const CustomDiv = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 44px;
  width: 46px;
  border: 1px solid ${BORDER_INPUT};
  border-left: none;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  ::-webkit-input-placeholder {
    color: ${BORDER_INPUT};
  }

  :-ms-input-placeholder {
    color: ${BORDER_INPUT};
  }

  ${({error}) => error && `
        border:1px solid red!important;
    `}
`
export const CustomDivText = styled.span`
  color: #CAD1D7;
  font-size: 13px;
  line-height: 1.6;
`
export const StyledInput = styled(CustomStyledInput)`
  color: ${VERY_DARK_GREY_COLOR} !important;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  height: 44px;
  width: calc(60% - 46px);
  border: 1px solid ${BORDER_INPUT};
  border-right: none;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 15px;
  margin-left: auto;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${BORDER_INPUT};
  }

  :-ms-input-placeholder {
    color: ${BORDER_INPUT};

  }

  ${({error}) => error && `
        border:1px solid red!important;
    `}
`;

export const FieldLabelCheckbox = styled.p<any>`
  font-size: 14px;
  color: black;
  margin-bottom: 2px;
  margin-right: 5px;
  ${({error}) => error && `
        color:red;
    `}
  ${({stair}) => stair && `
       margin-left:20px;
    `}
`;

export const DatePickerWrapper = styled.div<any>`
  width: 60%;
  height: fit-content;

  ${({big}) => big && `
        width:100%;
    `}
  .SingleDatePicker {
    width: 100% !important;
  }

  .SingleDatePickerInput {
    width: 100% !important;
  }

  .DateInput {
    width: 100% !important;
  }

  .DateInput_input {
    color: ${VERY_DARK_GREY_COLOR} !important;
    font-size: 14px;
    line-height: 1.6;
    text-align: left;
    height: 44px;
    width: 100%;
    border: 1px solid ${BORDER_INPUT};
    border-radius: 4px;
    padding: 15px;
    margin-left: auto;
    font-weight: bold;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${BORDER_INPUT};
    }

    :-ms-input-placeholder {
      color: ${BORDER_INPUT};
    }

    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    ${({error}) => error && `
            border:1px solid red!important;
        `}
  }

  .CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover {
    background: ${ORANGE_COLOR};
    border: 1px double ${ORANGE_COLOR};
    color: #fff;
  }

  .DayPickerKeyboardShortcuts_show__bottomRight::before {
    display: none;
  }
`;

export const FormFlex = styled.div<any>`
  display: flex;
  align-items: center;
  ${({column}) => column && `
        flex-direction:column;
        align-items:flex-end;
    `}
`;
export const DropzoneWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  font-size: 0.875rem;
  line-height: 1.5;
  color: black;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px dashed #cad1d7;
  border-radius: 0.375rem;
  box-shadow: none;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InsertedFilesWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const FilesText = styled.p<any>`
  color: black;
  font-size: 14px;
  ${({big}) => big && `
        font-size:16px;
    `}
  ${({close}) => close && `
        margin-left:auto;
        cursor:pointer;
    `}
`;
export const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid #cad1d7;
`;

export const RadioWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
`;
export const RadioElementWrapper = styled.div`
  width: fit-content;
  display: flex;
  margin-right: 15px;
  align-items: center;
  height: calc(2.75rem + 2px);
`;
export const RadioElementInput = styled.input`
  font-size: 14px;
`;
export const RadioElementLabel = styled.label<any>`
  font-size: 14px;
  margin-bottom: 0 !important;
  margin-left: 5px;
`;

export const SingleFieldForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const GroupsSelectorWrapper = styled.div<any>`
  width: 100%;
  height: fit-content;
  padding: 20px 15px 25px 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${BORDER_INPUT};
  border-radius: 4px;
  ${({error}) => error && `
        border:1px solid ${RED_COLOR};
    `}
`;

export const GroupsSelectorElement = styled.div<any>`
  display: flex;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${BORDER_INPUT};
  ${({withoutBorderBottom}) => withoutBorderBottom && `
        border-bottom:0;
        padding-bottom:0;
        padding-top:15px;
    `}
  ${({flexWrap}) => flexWrap && `
        flex-wrap:wrap;
    `}
`;

export const GroupSelectorsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  display: flex;
`;


export const SelectedGroupElement = styled.div`
  background: ${ORANGE_COLOR};
  border-radius: 22px;
  font-size: ${NORMAL_FONT_SIZE};
  padding: 10px 24px;
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${WHITE_COLOR};
  margin-right: 15px;
`;

export const SelectedGroupElementIconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: 10px;

  & i {
    font-size: ${BIG_FONT_SIZE};
    cursor: pointer;
    color: ${WHITE_COLOR};
  }
`;

export const TextArea = styled.textarea<any>`
  color: ${VERY_DARK_GREY_COLOR} !important;
  font-size: 14px;
  line-height: 1.6;
  min-height: 80px;
  width: 60%;
  border: 1px solid ${BORDER_INPUT};
  border-radius: 4px;
  padding: 15px;
  margin-left: auto;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${BORDER_INPUT};
  }

  :-ms-input-placeholder {
    color: ${BORDER_INPUT};
  }

  ${({error}) => error && `
        border:1px solid red!important;
    `}

  ${({customWidth}) => customWidth && `
        width:${customWidth};
    `}
  ${({customMarginLeft}) => customMarginLeft && `
        margin-left:${customMarginLeft};
    `}
`;