import styled from "styled-components";

export const HeaderWrapper = styled.div`
  height:70px;
  width:100%;
  display:flex;
  justify-content: space-around;
  align-items:center;
  padding: 0 50px 0 30px;
  box-shadow: 0 15px 30px 0 rgba(0,0,0,0.1);
  z-index:10000;
  position:fixed;
  top:0;
  left:0;
  right:0;
`;

export const LogoWrapper = styled.div`
  width:fit-content;
  cursor:pointer;
  height:fit-content;
  & img {
    width:fit-content;
    height:100%;
  }
  cursor:pointer;
`;