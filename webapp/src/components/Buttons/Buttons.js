import styled from "styled-components"
import {primary} from "../Colours/Colours"
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
`

const StyledButton = styled.button`
border-radius: 30px;
padding: 8px 16px;
border: none;
background: ${primary};

`

export const BackButton = ({onClick}) => {
    return (<StyledButton onClick={onClick}>
        <img src={ArrowLeft}/>
    </StyledButton>)
}