import styled from "styled-components";
import { primary } from "../Colours/Colours";
import { BodyXL, HeadingXS } from "../Typography/Typographies";

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #eefff8;
	border: ${primary} 2px solid;
	color: ${primary};
	padding: 16px;
	border-radius: 8px;
	transition: all 300ms;
	justify-content: center;
	align-items: center;
`;

export const CardCurrent = () => {
	return (
		<CardContainer>
			<div className="d-flex flex-column">
				<HeadingXS className="mb-1">Temperature</HeadingXS>
				<BodyXL>39°C</BodyXL>
			</div>
		</CardContainer>
	);
};
