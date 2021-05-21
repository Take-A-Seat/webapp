import styled from "styled-components"
import {
    BIG_FONT_SIZE,
    BLACK_COLOR,
    BLUE_COLOR,
    BLUE_WHITE_COLOR,
    DARK_GREY_COLOR,
    NORMAL_FONT_SIZE,
    ORANGE_COLOR,
    VERY_DARK_GREY_COLOR,
    WHITE_COLOR
} from "../../../constants/styleConstants";

export const AuthPadding = '0 25% 0 20%';

export const AuthPageWrapper = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
`;

export const AuthWrapper = styled.div`
    width:100%;
    min-height:100vh;
    height:100%;
    background:${WHITE_COLOR};
    display:flex;
    flex-direction:column;
    padding:${AuthPadding};
    padding-bottom:40px;
`;

export const AuthHeaderWrapper = styled.div`
    width:100%;
    padding-top:25px;
    padding-bottom:10px;
    display:flex;
    align-items:flex-end;
`;
export const AuthHeaderLogoWrapper = styled.div<any>`
    width:fit-content;
    height:60px;
    & img {
        height:100%;
        width:auto;
    }
    ${({bigger}) => bigger && `height:75px;`}
    ${({small}) => small && `height:35px;`}
`;
export const AuthHeaderLinksWrapper = styled.div`
    flex:1;
    margin-left:auto;
    display:flex;
    align-items:center;
`;
export const AuthHeaderLink = styled.div<any>`
    font-size:${BIG_FONT_SIZE};
    color:${VERY_DARK_GREY_COLOR};
    font-weight:bold;
    margin-right:25px;
    ${({firstItem}) => firstItem && `margin-left:auto;`}
`;

export const AuthFooterWrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    padding:${AuthPadding};
    padding-top:60px;
    padding-bottom:55px;
`;

export const AuthFooterElement = styled.div<any>`
    width:100%;
    display:flex;
    align-items:center;
    ${({topElement}) => topElement && `
        padding-bottom:45px;    
        border-bottom:1px solid ${BLUE_WHITE_COLOR};
        border-color:rgba(0,0,0,0.1);
    `} 
    ${({bottomElement}) => bottomElement && `
        padding-top:40px
    `}
`;
export const FooterElementText = styled.div`
    font-size:${NORMAL_FONT_SIZE};
    color:${DARK_GREY_COLOR};
`;
export const AuthMainPageWrapper = styled.div`
    width:100%;
    height:100%;
    padding-left:30px;
`;

export const AuthFormContainer = styled.div`
    width:35vw;
  min-width: 350px;
    height:fit-content;
    padding:50px 40px;
    background:${BLUE_WHITE_COLOR};
    border-radius:4px;
    box-shadow:0 15px 30px 0 rgba(0,0,0,0.1);
    display:flex;
    flex-direction:column;
    margin-top:10%;
`;

export const AuthFormContainerTitle = styled.div`
    width:100%;
    height:fit-content;
    font-size:${BIG_FONT_SIZE};
    color:${VERY_DARK_GREY_COLOR};
    margin-bottom:25px;
`;

export const AuthFieldWrapper = styled.div`
    width:100%;
    min-width: 200px;
    height:fit-content;
    display:flex;
    flex-direction:column;
`;

export const AuthInputWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    background:${WHITE_COLOR};
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(50,50,93,0.15), 0 1px 0 0 rgba(0,0,0,0.02);
    padding:15px 12px;
`;

export const AuthInputIconWrapper = styled.div<any>`
    width:30px;
    height:100%;
    margin-right:10px;
    & i {
        font-size:18px;
        color:${DARK_GREY_COLOR};
    }
    ${({error}) => error && `
        & i {
            color:red;
        }
    `}
`;
export const AuthInputField = styled.input`
    width:calc(100% - 40px);
    height:100%;
    border:none;
    outline:none;
    color:${BLACK_COLOR};
    font-size:${NORMAL_FONT_SIZE};
    font-weight:normal;
    ::placeholder {
        color:${DARK_GREY_COLOR};
    }
    :-webkit-autofill {
        -webkit-text-fill-color: ${BLACK_COLOR} !important;
    }
    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus, 
    :-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
    :-webkit-autofill::first-line {
      font-size: ${NORMAL_FONT_SIZE} !important;
    }
`;

export const AuthFormQuickLinksWrapper = styled.div`
    width:100%;
    height:fit-content;
    display:flex;
    align-items:center;
`;
export const AuthFormQuickLinkText = styled.div<any>`
    font-size:12px;
    color:${DARK_GREY_COLOR};
    line-height:14px;
    cursor:pointer;
    ${({alignedRight}) => alignedRight && `
        margin-left:auto;
    `}
`;
export const Span = styled.span<any>`
    ${({blue}) => blue && `
        color:${BLUE_COLOR};
    `}
    ${({orange}) => orange && `
        color:${ORANGE_COLOR};
    `}
`;

export const AuthErrorText = styled.div`
    font-size:12px;
    color:red;
    margin-top:5px;
    margin-bottom:15px;
`;

export const AuthFormButton = styled.button`
    border:0;
    outline:0;
    margin:0;
    border-radius: 22px;
    box-shadow: 0 4px 6px 0 rgba(50,50,93,0.11), 0 1px 3px 0 rgba(0,0,0,0.08);
    color:${WHITE_COLOR};
    display:flex;
    align-items:center;
    white-space: nowrap;
    font-size:${NORMAL_FONT_SIZE};
    font-weight:bold;
    background:${BLUE_COLOR};
    border:1px solid ${BLUE_COLOR};
    width:fit-content;
    padding:15px 70px;
    margin-bottom:20px;
`;