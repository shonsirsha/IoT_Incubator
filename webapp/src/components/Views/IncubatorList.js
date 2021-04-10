import React, { useContext, useState, useEffect } from "react";
import { HeadingL } from "../../components/Typography/Typographies";
import { MainButton } from "../Buttons/Buttons";
import styled from "styled-components";
// import AuthContext from "../../context/auth/authContext";
import IncubatorContext from "../../context/incubator/incubatorContext";
import EggChicken from "./EggChicken.svg";
import spinner from "../../loading.gif";
import { CardDevice } from "../Cards/CardDevice";
import { timeDifference } from "../../utils/timeDifference";

const EggChickenIcon = styled.img`
	width: 72px;
	height: 32px;
	display: flex;
	margin-left: auto;
	margin-right: auto;
`;
const StyledSpinner = styled.img`
	width: 48px;
	height: 48px;
	margin: auto;
`;
const IncubatorList = ({ btnFunc }) => {
	// const authContext = useContext(AuthContext);
	const incubatorContext = useContext(IncubatorContext);

	const { incubators, getAllIncubators, incubatorLoading } = incubatorContext;
	useEffect(() => {
		getAllIncubators();
	}, []);

	return (
		<div className="d-flex flex-column my-auto ">
			<>
				{!incubatorLoading && incubators.length > 0 ? (
					<>
						{incubators.map((x) => (
							<CardDevice
								className="mb-4"
								deviceName={x.deviceName}
								hatchPreset={x.hatchPreset.name}
								isOnline={x.active}
								currentHum={x.currentHum}
								currentTemp={x.currentTemp}
								createdAt={timeDifference(Date.now(), new Date(x.createdAt))}
							/>
						))}
					</>
				) : (
					<>
						{!incubatorLoading ? (
							<div className="d-flex flex-column ">
								<EggChickenIcon alt="Chicken Icon" src={EggChicken} />
								<HeadingL className="text-center mt-4">
									Looks like you have not set up any incubator yet...
								</HeadingL>
							</div>
						) : (
							<StyledSpinner src={spinner} alt="Loading" />
						)}
					</>
				)}
				<MainButton text={"Set Up a New Incubator"} onClick={btnFunc} />
			</>
		</div>
	);
};

export default IncubatorList;
