import styled from "styled-components"
import {primary, danger} from "../Colours/Colours"
import ArrowLeft from "./ArrowLeft.svg"

export const MainButton = styled.button`
    padding-top: 24px;
    padding-bottom: 24px;
    background: ${primary};
    width: 100%;
    color: #fff;
    font-family: "BrandonTextBold";
    font-size: 20px;
    margin: 0px;
    border: none;
    border-radius: 10px;
    font-weight: 200;

      &:active{
          background: blue;
      }
`
export const ButtonText = styled.button`
font-family: "BrandonText";
font-size: 16px;
color: ${primary};
background: none;
border: none;
text-decoration: underline;
&:hover{
    box-shadow: unset;
    color: #12A165;
}

`
export const ButtonTextDanger = styled.button`
color: ${danger};
font-family: "BrandonText";
font-size: 16px;
background: none;
border: none;
text-decoration: underline;
&:hover{
    box-shadow: unset;
    color: #9B0606;
}
`
const StyledButton = styled.button`
border-radius: 30px;
padding: 8px 16px;
border: none;
background: ${primary};

`

export const BackButton = ({onClick}) => {
    return (<StyledButton onClick={onClick}>
        <img src={ArrowLeft} alt="Back"/>
    </StyledButton>)
}