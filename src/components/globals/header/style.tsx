import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const HeaderWrapper = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  padding: 0 30px 0 30px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  z-index: 10000;
  position: sticky;
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
  margin: auto;
  color: #fff;
`
export const HeaderAccountSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10%;
  align-items: center;
  color: #fff;
`

export const HeaderElement = styled(NavLink)`
  width: 100%;
  height: fit-content;
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


export const HeaderElementText = styled.p`
  white-space: nowrap;

  &:hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }

`