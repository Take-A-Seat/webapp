import styled from "styled-components";
import {
  COLOR_INPUT_BACKGROUND,
  GREEN,
  GREEN_COLOR, PENDING_RESERVATION_STATUS,
  RED_COLOR,
  VERY_DARK_GREY_COLOR,
  WHITE_COLOR
} from "../../../constants/styleConstants";

export const ColumnContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  margin-top: 15px;
  ${({customHeight})=>customHeight && `
  height:${customHeight};
  `}
`

export const NameArea = styled.span`
  font-size: 14px;
  color: ${WHITE_COLOR};
  font-weight: 600;
  padding-bottom: 10px;
`

export const FlexContainerTables = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const TableContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 60px;
  background-color: ${COLOR_INPUT_BACKGROUND};
  align-items: center;
  justify-content: space-around;
  padding: 5px 5px;
  margin-right: 6px;
  margin-top: 6px;
  border-radius: 4px;
  border:1px solid ${VERY_DARK_GREY_COLOR};
  
  ${({selected})=>selected && `
  background-color:${PENDING_RESERVATION_STATUS};
  `}
`

export const TextTable = styled.span`
font-size: 12px;
  font-weight: 500;
  color: ${WHITE_COLOR};
`

export const Line = styled.div<any>`
width: 100%;
  height: 2px;
  ${({green})=>green && `
    background-color:${GREEN};
  `}
  ${({red})=>!red && `
    background-color:${RED_COLOR};
  `}
  
`
