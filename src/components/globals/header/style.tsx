import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import {
    BIG_FONT_SIZE,
    BIGGER_FONT_SIZE, BLUE_COLOR, DARK_GREY_COLOR,
    HEADER_SETTINGS_BACKGROUND, ORANGE_COLOR,
    VERY_DARK_GREY_COLOR
} from "../../../constants/styleConstants";

export const HeaderWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 30px 5px 30px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  z-index: 10000;
  position: sticky;
  border: 1px solid rgba(40, 44, 52, 0.21);

  ${({settings}) => settings && `
  padding: 0;
  background-color:${HEADER_SETTINGS_BACKGROUND};
  justify-content:center;
  `}

  ${({area}) => area && `
  background-color :#323232;
  border:1px solid black;
  `}

  ${({table}) => table && `
  padding:10px;
  `}
`;

export const LogoWrapper = styled.div`
  width: fit-content;
  cursor: pointer;
  height: fit-content;

  & img {
    width: 70%;
    height: 60%;
  }
`;

export const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  color: #fff;
`
export const HeaderAccountSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  align-items: center;
  color: #fff;
  @media only screen and (max-width: 600px) {
    width: auto;
  }
`

export const HeaderElement = styled(NavLink)`
  //width: 100%;
  //height: fit-content;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgba(239, 244, 255, 0.42);
  font-weight: 700;

  &.active, &.hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }
`

export const HeaderElementSettings = styled(NavLink)`
  //width: 100%;
  //height: fit-content;
  padding-left: 25px;
  padding-right: 25px;
  //display: flex;
  //align-items: center;
  text-decoration: none;
  color: rgba(239, 244, 255, 0.42);
  font-weight: 700;

  &.active, &.hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }
`


export const HeaderElementText = styled.p<any>`
  white-space: nowrap;

  &:hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }

  ${({settings}) => settings && `
    font-size:14px;
  `}

`
export const HeaderText = styled.p <any>`
  font-size: ${BIG_FONT_SIZE};
  color: ${VERY_DARK_GREY_COLOR};

  ${({name}) => name && `
        margin-left:auto;
        margin-right:5px;
        cursor:pointer;
    `}
  & i {
    font-size: ${BIGGER_FONT_SIZE};
    color: ${DARK_GREY_COLOR};
  }

  ${({logout}) => logout && `
        color:${ORANGE_COLOR};
        cursor:pointer;
     `}
`;

