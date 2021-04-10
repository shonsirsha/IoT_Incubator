import React, { useContext } from "react";
import { HeadingL } from "../../components/Typography/Typographies";
import { MainButton } from "../Buttons/Buttons";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import EggChicken from "./EggChicken.svg";

const EggChickenIcon = styled.img`
	width: 72px;
	height: 32px;
	display: flex;
	margin-left: auto;
	margin-right: auto;
`;
const IncubatorList = ({ btnFunc }) => {
	const authContext = useContext(AuthContext);
	const { incubators } = authContext;
	return (
		<div className="d-flex flex-column my-auto ">
			<>
				{incubators.length > 0 ? (
					<HeadingL>Wowsie</HeadingL>
				) : (
					<div className="d-flex flex-column ">
						<EggChickenIcon alt="Chicken Icon" src={EggChicken} />
						<HeadingL className="text-center mt-4">
							Looks like you have not set up any incubator yet...
						</HeadingL>

						<MainButton text={"Set Up a New Incubator"} onClick={btnFunc} />
					</div>
				)}
			</>
		</div>
	);
};

export default IncubatorList;
