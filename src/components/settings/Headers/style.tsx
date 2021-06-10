import styled from "styled-components";
import {DARK_GREY2_COLOR, WHITE_COLOR} from "../../../constants/styleConstants";


export const SectionTableSettings = styled.div<any>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-left: 15%;
  padding-right: 15%;
  ${({reservations})=> reservations && `
  padding-left:5%;
   padding-right:0;
  
  `}
`

export const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${WHITE_COLOR};
`
export const TextTitleHeader = styled.span<any>`
  font-weight: 600;
  padding:17px  5px 12px;
  font-size: 20px;
  ${({noPadding})=> noPadding &&`
  padding:0 5px;
  `}
`
export const BackContainer = styled.div`
  cursor: pointer;
  padding-top: 5px;
`