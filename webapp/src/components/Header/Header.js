import React from "react";
import styled from "styled-components";
import wave from "./wave.svg";
import avatar from "./Avatar.svg";
import { HeadingL } from "../Typography/Typographies";
import { BackButton } from "../Buttons/Buttons";

const StyledImage = styled.img`
	&:hover {
		cursor: pointer;
	}
`;
const WaveIcon = styled.img`
	width: 36px;
	height: 36px;
`;
const Header = ({ title, loggedIn = false, backBtn = false }) => {
	const goHome = () => {};
	return (
		<div className="w-100">
			<div className="d-flex flex-column">
				<div className="d-flex justify-content-between align-items-center">
					{backBtn ? (
						<BackButton onClick={goHome} />
					) : (
						<WaveIcon src={wave} alt="Hello!" />
					)}
					{loggedIn && <StyledImage src={avatar} alt="Avatar!" />}
				</div>
				<HeadingL className="mt-4">{title}</HeadingL>
			</div>
		</div>
	);
};

export default Header;
