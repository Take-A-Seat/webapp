import styled from "styled-components";
import {
    BORDER_INPUT, COLOR_INPUT_BACKGROUND,
    DARK_GREY2_COLOR, FINISHED_RESERVATION_STATUS,
    HEADER_SETTINGS_BACKGROUND,
    INPUT_PLACEHOLDER,
    WHITE_COLOR
} from "../../constants/styleConstants";

export const TextLegend = styled.span`
  justify-self: center;
  align-self: center;
  font-size: 15px;
  padding-left: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: ${WHITE_COLOR};
`

export const ContainerHoverChart = styled.div`
  width: 150px;
  height: fit-content;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${COLOR_INPUT_BACKGROUND};
  border:1px solid ${BORDER_INPUT};
  border-radius: 8px;
`

export const TextChart = styled.span`
  color: ${WHITE_COLOR};
  font-size: 15px;
  font-weight: 500;
  padding:5px;
`