import styled from "styled-components";
import { primary, danger, secondary } from "../Colours/Colours";
import ArrowLeft from "./ArrowLeft.svg";

export const StyledMainButton = styled.button`
	padding-top: 16px;
	padding-bottom: 16px;
	background: ${(props) => (props.disabled ? secondary : primary)};
	width: 100%;
	color: #fff;
	font-family: "BrandonTextBold";
	font-size: 20px;
	margin: 0px;
	border: none;
	border-radius: 16px;
	font-weight: 200;
	position: absolute;
	bottom: 24px;
	width: calc(100% - 48px);
	&:active {
		background: #36b982;
	}
	&:hover {
		cursor: ${(props) => (props.disabled ? `not-allowed` : `pointer`)};
	}
`;
export const ButtonText = styled.button`
	font-family: "BrandonText";
	font-size: 20px;
	color: ${primary};
	background: none;
	border: none;
	transition: all 300ms;

	text-decoration: underline;
	&:hover {
		box-shadow: unset;
		color: #12a165;
	}
`;
export const ButtonTextDanger = styled.button`
	color: ${danger};
	font-family: "BrandonText";
	font-size: 20px;
	background: none;
	border: none;
	text-decoration: underline;
	&:hover {
		box-shadow: unset;
		color: #9b0606;
	}
`;
const StyledButton = styled.button`
	border-radius: 30px;
	padding: 8px 16px;
	border: none;
	background: ${primary};
`;
export const MainButton = ({ text, type = "button", disabled, onClick }) => {
	return (
		<StyledMainButton type={type} disabled={disabled} onClick={onClick}>
			{text}
		</StyledMainButton>
	);
};
export const BackButton = ({ onClick }) => {
	return (
		<StyledButton onClick={onClick}>
			<img src={ArrowLeft} alt="Back" />
		</StyledButton>
	);
};
