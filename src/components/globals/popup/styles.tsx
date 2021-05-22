import styled from 'styled-components'
import {
    BACKGROUND_COLOR,
    DARK_GREY_COLOR,
    SETTINGS_BACKGROUND_GREY,
    VERY_DARK_GREY_COLOR
} from "../../../constants/styleConstants";

export const PopupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const PopupContentWrapper = styled.div`
  width: 40%;
  max-width: 500px;

  background: ${SETTINGS_BACKGROUND_GREY};
  border-radius: 6px;
  padding: 5px 20px 10px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const PopupHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: fit-content;
  margin-bottom: 15px;
  border-bottom: 1px solid ${BACKGROUND_COLOR};
`;

export const PopupName = styled.p<any>`
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  color: ${DARK_GREY_COLOR};

  ${({closeIcon}) => closeIcon && `
        margin-left:auto;
        & i {
            font-size:26px;
            padding:4px;
            cursor:pointer;
            :hover {
    background-color: ${VERY_DARK_GREY_COLOR};
    border-radius:20px;
    color: white;
              }
        }
    `}
`;

export const PopupText = styled.p`
    padding-top: 6px;
  padding-left: 3px;
`



