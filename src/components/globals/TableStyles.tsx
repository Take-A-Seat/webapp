import styled from "styled-components"
import {
    BIG_FONT_SIZE, BLUE_COLOR,
    BLUE_WHITE_COLOR,
    DARK_GREY_COLOR,
    LIGHT_GRAYISH_BLUE_COLOR, SETTINGS_BACKGROUND_GREY,
    SMALL_FONT_SIZE,
    VERY_DARK_GREY_COLOR,
    WHITE_COLOR
} from "../../constants/styleConstants";

export const Table = styled.div<any>`
  width: 100%;
  height: fit-content;
  @media only screen and (max-width: 600px) {
    width: 95%;
  }
  ${({horizontalScroll}) => horizontalScroll && `
        overflow-x:auto;
        display:block;
        white-space:nowrap;
    `}
  ${({customWidth}) => customWidth && `
        width:${customWidth}
    `}
`;

export const TableHead = styled.div<any>`
  width: 100%;
  padding: 10px 30px;
  ${({noPadding}) => noPadding && `
        padding:0;
        
  `}
  
`


export const TableRow = styled.div<any>`
  width: 100%;
  display: flex;
  cursor: pointer;
 flex-wrap: wrap;
  ${({customWidth}) => customWidth && `
        width:${customWidth};
        
  `} ${({tableBody}) => tableBody && `
        // border-bottom:1px solid ${DARK_GREY_COLOR};
        padding:10px 10px 10px 30px;
        background-color:${SETTINGS_BACKGROUND_GREY};
        :hover {
            background:${VERY_DARK_GREY_COLOR};
        }
  `} ${({horizontalScroll}) => horizontalScroll && `
        min-width:100%;
        width:fit-content;
        overflow-x:auto;
  `}
  
  ${({withMargin}) => withMargin && `
        margin-bottom:15px;
  `}

  
  ${({withBorderRadius}) => withBorderRadius && `
       border-radius:10px;
       border:1px solid black;

  `}
  
`;

export const TableColumn = styled.div<any>`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 6px;
  ${({small}) => small && `
        flex:.33;
    `} ${({verySmall}) => verySmall && `
        flex:0;
        width:5%;
    `} ${({midSmall}) => midSmall && `
        flex:.05;
    `} ${({customWidth}) => customWidth && `
        flex:auto;
        width:${customWidth};
    `} ${({marginLeftAuto}) => marginLeftAuto && `
        margin-left:auto;
    `}
  ${({customFlex}) => customFlex && `
        flex:${customFlex};
    `}
`;

export const TableText = styled.p <any>`
  font-size: ${BIG_FONT_SIZE};
  color: ${VERY_DARK_GREY_COLOR};
  line-height: 19px;
  text-align: left;
  ${({thead}) => thead && `
        text-align:center;  
        font-size:${SMALL_FONT_SIZE};
        font-weight:bold;
        color:${DARK_GREY_COLOR};
    `} ${({headerCheckboxExpand}) => headerCheckboxExpand && `
        margin-left:5px;
        color:${DARK_GREY_COLOR};
        & i {
            font-size:18px;
        }
    `} 
    ${({bold}) => bold && `
        font-weight:bold;
    `} ${({firstLetterUpperCase}) => firstLetterUpperCase && `
        ::first-letter {
            text-transform:uppercase;
        }
    `} ${({wrapText}) => wrapText && `
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        width:100%;
    `}
  ${({customColor}) => customColor && `
        color:${customColor};
        & i {
            color:${customColor};
        }
    `}

  ${({customFontSize}) => customFontSize && `
        font-size:${customFontSize};
    `}
  ${({noPadding}) => noPadding && `
        padding:0;
    `}
  ${({noMargin}) => noMargin && `
        margin:0;
    `}
  ${({whiteTextBold})=>whiteTextBold && `
    color:${WHITE_COLOR};
            font-weight:bold;

  `}
  
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

export const TableCheckbox = styled.input`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid ${DARK_GREY_COLOR};
`;

export const TableCheckboxDiv = styled.div<any>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid ${DARK_GREY_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({checked}) => checked && `
        background:#808080;
        color:white;
        & i {
            font-size:14px;
        }
    `}
`;

export const TableBody = styled.div<any>`
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  background: ${WHITE_COLOR};
  display: flex;
  flex-direction: column;
  ${({noBackground}) => noBackground && `
        background:transparent;
        box-shadow:none;
    `}
`;

export const Icon = styled.div`
  margin-left: 10px;
  color: ${BLUE_COLOR};
  cursor: pointer;

  & i {
    font-size: 16px;
  }
`