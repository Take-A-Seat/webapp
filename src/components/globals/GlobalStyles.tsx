import styled from "styled-components"
import {
  BIG_FONT_SIZE,
  BLUE_COLOR,
  DARK_GREY2_COLOR,
  DARK_GREY_COLOR, GREEN,
  LIGHT_GRAY,
  LIGHT_GRAYISH_BLUE_COLOR,
  NORMAL_FONT_SIZE,
  ORANGE_COLOR, RED, RED_DELETE, SETTINGS_BACKGROUND_GREY,
  VERY_DARK_GREY_COLOR,
  WHITE_COLOR
} from "../../constants/styleConstants";

export const VerticalDelimitator = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${DARK_GREY_COLOR};
  margin: 0 10px;
`;
export const HorizontalDelimiter = styled.div<any>`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 30px;
  background-color: ${LIGHT_GRAY};
  ${({sideBar}) => sideBar && `
    margin-top:35px;
    margin-bottom:35px;
    `}
`;

export const PageWrapper = styled.div<any>`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 45px 50px 150px 50px;
  ${({centerPage}) => centerPage && `
  justify-content:center;
  align-items:center;
  margin:0 auto;
  `}

  ${({big}) => big && `
    flex:1;
  `}
  ${({smallPaddingBottom}) => smallPaddingBottom && `
  padding: 45px 50px 50px 50px;
  `}
  
  ${({noPaddingBottom}) => noPaddingBottom && `
  padding: 45px 50px 0px 50px;
  `}

  ${({justPaddingBottom}) => justPaddingBottom && `
  padding: 0px 0px 100px 0px;
  `}
  ${({noPadding}) => noPadding && `
    padding:0;
  `}
  ${({paddingRight}) => paddingRight && `
    padding-right:${paddingRight};
  `}
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div<any>`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  margin-bottom: 20px;
  margin-top: 20px;
  ${({form}) => form && `
        margin-left: 15px;
        margin-top: 5px;
    `}

  ${({customMarginTop}) => customMarginTop && `
        margin-top: ${customMarginTop};
    `}
  ${({flexStart}) => flexStart && `
  justify-content: flex-end;
    `}
`;

export const Button = styled.div<any>`
  border-radius: 6px;
  box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  background: ${ORANGE_COLOR};
  color: ${WHITE_COLOR};
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: bold;
  margin-right: 20px;
  padding: 12px 24px;
  border: 1px solid ${ORANGE_COLOR};
  cursor: pointer;

  & i {
    font-size: 18px;
    margin-right: 10px;
  }

  ${({previewButton}) => previewButton && `
     @media only screen and (max-width: 600px) {
    margin:auto;
  }
  `}
  ${({cancelButton}) => cancelButton && `
    background:transparent;
    border:1px solid ${LIGHT_GRAY}
  `}


  ${({cancelButtonDelete}) => cancelButtonDelete && `
    background:transparent;
    font-size:16px;
    color:${SETTINGS_BACKGROUND_GREY};
    border:1px solid ${SETTINGS_BACKGROUND_GREY};
  `}
  ${({deleteButton}) => deleteButton && `
    background:${RED_DELETE};
    font-size:16px;
  `}

  ${({customMarginRight}) => customMarginRight && `
        margin-right:${customMarginRight};
    `}
  ${({customMarginBottom}) => customMarginBottom && `
        margin-bottom:${customMarginBottom};
    `}
  ${({secondaryButton}) => secondaryButton && `
        color:${ORANGE_COLOR};
        background:rgba(255,255,255,0);
    `}
  ${({alignedRight}) => alignedRight && `
        margin-left:auto;
    `}
  ${({alignedLeft}) => alignedLeft && `
        margin-right:auto;
    `}
  ${({lastElement}) => lastElement && `
        margin-right:0;
    `}
  ${({blueButton}) => blueButton && `
        background:${BLUE_COLOR};
        border:1px solid ${BLUE_COLOR};
        color:${WHITE_COLOR};
    `}
  ${({authButton}) => authButton && `
        width:fit-content;
        padding:15px 70px;
        margin-bottom:20px;
    `}
  ${({alignedRight}) => alignedRight && `
        margin-left:auto;
    `}
  ${({noBorder}) => noBorder && `
        border:0;
        box-shadow: none;
    `}
  ${({marginTop}) => marginTop && `
        margin-top:25px;
    `}
  ${({customMarginLeft}) => customMarginLeft && `
        margin-left:${customMarginLeft};
    `}
  ${({customWidth}) => customWidth && `
      width:${customWidth};
    `}
  ${({customMarginTop}) => customMarginTop && `
        margin-top:${customMarginTop};
    `}
  ${({customMarginBottom}) => customMarginBottom && `
        margin-bottom:${customMarginBottom};
    `}
  ${({circle}) => circle && `
      border-radius:30px;
      padding:7px;
      text-align:center;
      height:fit-content;
       & i {
       font-size:25px;
       font-weight:400;
        margin-right:0px;
        }
    `}
`;

export const ActionButton = styled(Button)`
  margin-right: auto;
  margin-left: auto;
  ${({green}) => green && `
        background: #009900;
        border: #009900;
    `}
  ${({red}) => red && `
        background: #eb0000;
        border: #eb0000;
    `}
`;

export const SubmitButton = styled.button<any>`
  border-radius: 22px;
  box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  background: ${ORANGE_COLOR};
  color: ${WHITE_COLOR};
  outline: none;
  display: flex;
  align-items: center;
  white-spaces: nowrap;
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: bold;
  margin-right: 20px;
  padding: 12px 24px;
  border: 1px solid ${ORANGE_COLOR};
  cursor: pointer;

  & i {
    font-size: 18px;
    margin-right: 10px;
  }

  ${({secondaryButton}) => secondaryButton && `
        color:${ORANGE_COLOR};
        background:rgba(255,255,255,0);
    `} ${({alignedRight}) => alignedRight && `
        margin-left:auto;
    `} ${({lastElement}) => lastElement && `
        margin-right:0;
    `}
  ${({alignedRight}) => alignedRight && `
        margin-left:auto;
    `}
`;

export const Rectangle = styled.div`
  width: 100%;
  padding: 0 35px 50px 30px;
  height: fit-content;
  border-radius: 4px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  background: ${WHITE_COLOR};
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.p`
  margin-top: 30px;
  margin-block-end: 0;
  font-size: 13px;
  line-height: 24px;
  color: ${VERY_DARK_GREY_COLOR};
`;

export const DetailsCardWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background: ${WHITE_COLOR};
  border-radius: 4px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
`;

export const DetailsCardTop = styled.div<any>`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid ${LIGHT_GRAYISH_BLUE_COLOR};
  padding: 30px 30px 15px 30px;
  display: flex;
  align-items: center;
`;
export const DetailsCardTopElement = styled.div<any>`
  width: fit-content;
  height: 100%;
  ${({lastElement}) => lastElement && `
        margin-left:auto;
    `} ${({customWidth}) => customWidth && `
        width:${customWidth};
    `} ${({inLine}) => inLine && `
        display:flex;
        justify-content: space-between;
        align-items:center;
    `}
`;
export const DetailsCardContent = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 30px 55px 35px 30px;
  justify-content: space-between;
`;

export const CounterSection = styled.div`
  display: flex;
  flex-direction: column;

`

export const DetailsCardElementsWrapper = styled.div<any>`
  width: 30%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  ${({bigger}) => bigger && `
        width:40%;
    `} ${({counterLabel}) => counterLabel && `
    justify-content: space-between;
    height: auto;
        width:24%;
    `} ${({fullWidth}) => fullWidth && `
        width:100%;
    `}
`;

export const DownElement = styled.div`
  align-self: flex-end;
`

export const DetailsCardElement = styled.div<any>`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
  height: 14px;
  ${({alignFlexStart}) => alignFlexStart && `
    align-items:flex-start;
  `} ${({customHeight}) => customHeight && `
        height:${customHeight};
    `}
  ${({customPadding}) => customPadding && `
        padding:${customPadding};
    `}
`;

export const DetailsCardElementText = styled.div<any>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 50%;
  font-size: ${BIG_FONT_SIZE};
  color: ${VERY_DARK_GREY_COLOR};
  ${({label}) => label && `
        font-weight: 400;
    `} ${({contextualMenu}) => contextualMenu && `
    display:flex;
        justify-content:flex-end;
        overflow: visible;
      
    `} ${({name}) => name && `
        font-weight: 600;  
    `} ${({customWidth}) => customWidth && `
        width:${customWidth};
    `} ${({icon}) => icon && `
        color:${BLUE_COLOR};
        cursor:pointer;
        & i {
            font-size:16px;
        }
    `}
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: ${DARK_GREY2_COLOR};
`;

export const Circle = styled.div<any>`
    width: 15px;
    height: 15px;
    display: block;
  border-radius: 50px;
  ${({green})=>green &&`
    background-color: ${GREEN};
  `}
  ${({red})=>red &&`
    background-color: ${RED};
  `}
`