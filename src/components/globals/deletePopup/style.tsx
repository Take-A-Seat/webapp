import styled from "styled-components";
import {
    BACKGROUND_COLOR,
    BACKGROUND_DELETE,
    RED_DELETE,
    SETTINGS_BACKGROUND_GREY, WHITE_COLOR
} from "../../../constants/styleConstants";

export const ContainerDelete = styled.div`
  width: 400px;
  background-color: ${BACKGROUND_DELETE};
`

export const PopupDeleteWrapper = styled.div`
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

export const PopupDeleteContentWrapper = styled.div`
  width: 50%;
  max-width: 450px;
  border-top: 6px solid ${RED_DELETE};
  background: ${BACKGROUND_DELETE};
  border-radius: 6px;
  padding: 5px 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const DeleteIconCircle = styled.div`
  background-color: ${RED_DELETE};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30px;
  z-index: 99999;
  right: 0;
  left: 0;
  border-radius: 50%;
  color: ${WHITE_COLOR};
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;

  & i {
    font-size: 35px;
  }
`

export const TitleDelete = styled.span`
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  font-size: 24px;
`

export const DescriptionDelete = styled.span`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
`
export const ItemLose = styled.span`
  font-size: 16px;
  margin-top: 10px;
`
export const ContainerItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding-left: 43%;
`

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px 10px 20px 10px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`