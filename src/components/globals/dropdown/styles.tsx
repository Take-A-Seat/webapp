import styled from "styled-components"
import {
    BACKGROUND_COLOR,
    BIG_FONT_SIZE, BLUE_COLOR,
    BLUE_WHITE_COLOR, DARK_GREY2_COLOR,
    LIGHT_GRAYISH_BLUE_COLOR,
    LIGHT_GREY_COLOR,
    ORANGE_COLOR, SETTINGS_BACKGROUND_GREY,
    VERY_DARK_GREY_COLOR,
    WHITE_COLOR
} from "../../../constants/styleConstants";

export const ActionsWrapper = styled.div<any>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  :hover {
    background: ${LIGHT_GREY_COLOR};
  }

  & i {
    font-size: 24px;
    color: ${ORANGE_COLOR};
  }

  ${({greyColor}) => greyColor && `
        & i {
        font-size: 24px;
        color:${VERY_DARK_GREY_COLOR};
    }    `}
  ${({alignToRight}) => alignToRight && `
        margin-left:auto;
    `}
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  right: 100%;
  top: 0;
  width: auto;
  height: auto;
  padding: 5px 5px;
  background-color:${SETTINGS_BACKGROUND_GREY};
  border:1px solid ${DARK_GREY2_COLOR};
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.07);
`;
export const DropdownElementWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 5px;

  :hover {
    background: ${BLUE_COLOR};
    i {
      color: white;
    }
  }

  ${({topBorder}) => topBorder && `
        border-top:1px solid ${LIGHT_GRAYISH_BLUE_COLOR};
    `}
`;
export const DropdownText = styled.div<any>`
  color: ${WHITE_COLOR};
  font-size: ${BIG_FONT_SIZE};
  line-height: 27px;
  white-space: nowrap;
  font-family:HP,sans-serif;
  
  & i {
    font-size: ${BIG_FONT_SIZE};
    margin-right: 22px;
    color: ${VERY_DARK_GREY_COLOR};
  }

  ${({customColor}) => customColor && `
        color:${customColor};
        & i {
            color:${customColor};
        }
    `}

  ${({boldText}) => boldText && `
       font-weight:500
    `}
`;