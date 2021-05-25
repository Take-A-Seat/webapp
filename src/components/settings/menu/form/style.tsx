import styled from "styled-components";
import {
    DARK_GREY2_COLOR,
    HEADER_SETTINGS_BACKGROUND,
    SETTINGS_BACKGROUND_GREY
} from "../../../../constants/styleConstants";

export const PageMenu = styled.div<any>`
  width: 100%;
  padding: 15px 10px;
  background-color:${HEADER_SETTINGS_BACKGROUND};
  margin-top: 15px;
  margin-bottom: 25px;
  border-radius: 10px;
`

export const SectionPage = styled.div<any>`
  padding:20px 10px 20px 20px;
  width: 100%;
  background-color: ${SETTINGS_BACKGROUND_GREY};
  border-radius: 10px;
  margin-bottom: 100px;
  border:1px solid black;
`