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
const IncubatorList = () => {
	const authContext = useContext(AuthContext);
	const { incubators } = authContext;
	return (
		<div className="d-flex flex-column">
			<>
				{incubators.length > 0 ? (
					<HeadingL>Wowsie</HeadingL>
				) : (
					<div className="d-flex flex-column">
						<EggChickenIcon alt="Chicken Icon" src={EggChicken} />
						<HeadingL className="text-center mt-3">
							Looks like you have no incubator set up yet...
						</HeadingL>
					</div>
				)}
			</>
			<MainButton text="Set Up a New Incubator" />
		</div>
	);
};

export default IncubatorList;
