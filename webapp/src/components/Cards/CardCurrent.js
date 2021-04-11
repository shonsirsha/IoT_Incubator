import styled from "styled-components";
import { primary, darkGrey } from "../Colours/Colours";
import { BodyXL, HeadingXS } from "../Typography/Typographies";

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: ${(props) => (props.active ? `#eefff8` : `transparent`)};
	border: ${(props) => (props.active ? primary : darkGrey)} 2px solid;
	color: ${(props) => (props.active ? primary : darkGrey)};
	padding: 16px;
	border-radius: 8px;
	transition: all 300ms;
	justify-content: center;
	align-items: center;
	width: 50%;
	margin-right: 16px;
`;
// 39°C
export const CardCurrent = ({ title, reading, active }) => {
	return (
		<CardContainer active={active}>
			<div className="d-flex flex-column text-center">
				<HeadingXS className="mb-1">{title}</HeadingXS>
				<BodyXL>{active ? reading : "-"}</BodyXL>
			</div>
		</CardContainer>
	);
};
